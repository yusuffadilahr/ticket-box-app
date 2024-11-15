import { prisma } from "@/connection";
import { comparePassword, hashPassword } from "@/utils/passwordHash";
import { encodeToken } from "@/utils/token.sign";
import { transporter } from "@/utils/transporter";
import { addHours, addMonths } from "date-fns";
import { compile } from "handlebars";
import fs, { readFileSync } from 'fs'

export const userRegisterService = async ({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    identityNumber,
    refferal,
    verificationCode,
    dateNow,
    referralBody
}: any) => {
    await prisma.$transaction(async (tx) => {
        const checkedEmail = await tx.users.findMany({
            where: { email },
        });

        if (checkedEmail.length != 0) throw { msg: 'Email sudah terpakai', status: 400 };
        const hashed = await hashPassword(password);

        const dataRegisterUser = await tx.users.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashed,
                role: 'user',
                isVerified: Boolean(false),
                verifyCode: verificationCode,
                phoneNumber,
                identityNumber,
                profilePicture: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                referralCode: refferal,
            },
        });

        const setTokenUser = await encodeToken({ id: dataRegisterUser.id, role: dataRegisterUser.role });

        const emailHTML = fs.readFileSync('./src/public/emailSend/emailVerification.html', 'utf-8');
        let compiledHtml: any = await compile(emailHTML);
        compiledHtml = compiledHtml({
            firstName: firstName,
            email: email,
            url: `http://localhost:3000/user/verification-user/${verificationCode}-TBX-${setTokenUser}`,
            verifCode: verificationCode
        });

        await transporter.sendMail({
            to: email,
            subject: 'Verifikasi Email Anda untuk Ber-Transaksi',
            html: compiledHtml,
        });

        const checkedRefferal = await tx.users.findUnique({
            where: { referralCode: referralBody },
        });

        if (checkedRefferal) {
            const pointsRecord = await tx.points.findFirst({
                where: {
                    userIdRefferalMatch: checkedRefferal?.id,
                },
            });

            await tx.referalDiscounts.create({
                data: {
                    userIdRefferal: dataRegisterUser.id,
                    discount: 0.1,
                    isUsed: false,
                    expiredDate: addHours(addMonths(dateNow, 3), 7),
                },
            });

            if (!pointsRecord) {
                await tx.points.create({
                    data: {
                        userIdRefferalMatch: checkedRefferal?.id,
                        point: 10000,
                        expiredDate: addHours(addMonths(dateNow, 3), 7),
                    },
                });
            } else {
                await tx.points.update({
                    where: { id: pointsRecord?.id },
                    data: {
                        point: pointsRecord?.point + 10000,
                        expiredDate: addHours(addMonths(dateNow, 3), 7),
                    },
                });
            }
        }
    })
}

export const verifyUserService = async ({ userId, verificationCode }: any) => {
    const findUser = await prisma.users.findFirst({
        where: {
            AND: [{ id: userId }, { verifyCode: verificationCode }],
        },
    });

    if (!findUser) throw { msg: 'Data tidak valid', status: 404 };

    await prisma.users.update({
        data: {
            isVerified: true,
        },
        where: { id: findUser?.id },
    });

    const emailSucces = readFileSync('./src/public/emailSend/verifyEmailSucces.html', 'utf-8')
    let sendEmail: any = compile(emailSucces)
    sendEmail = sendEmail({
        firstName: findUser?.firstName,
        url: 'http://localhost:3000/'
    })

    await transporter.sendMail({
        to: findUser?.email,
        subject: 'Kamu berhasil verifikasi!',
        html: sendEmail
    })
}

export const updateProfileUserService = async ({
    profilePicture,
    firstName,
    lastName,
    phoneNumber,
    identityNumber,
    id
}: any) => {
    await prisma.users.update({
        data: {
            profilePicture,
            firstName,
            lastName,
            phoneNumber,
            identityNumber,
        },
        where: {
            id: id,
        },
    });
}

export const sendVerifyEmailUserService = async ({
    id, token
}: any) => {
    const findUser = await prisma.users.findFirst({
        where: { id }
    })

    if (!findUser) throw { msg: 'User tidak ditemukan', status: 404 }

    const emailHTML = fs.readFileSync('./src/public/emailSend/emailVerification.html', 'utf-8');
    let compiledHtml: any = compile(emailHTML);

    compiledHtml = compiledHtml({
        firstName: findUser?.firstName,
        email: findUser?.email,
        url: `http://localhost:3000/user/verification-user/${findUser?.verifyCode}-TBX-${token}`,
        verifCode: findUser?.verifyCode
    });

    await transporter.sendMail({
        to: findUser?.email,
        subject: 'Verifikasi dirimu sekarang!',
        html: compiledHtml
    })
}

export const forgotPasswordService = async ({
    email
}: any) => {
    const findUser = await prisma.users.findMany({
        where: { email },
    });

    if (findUser.length == 0) throw { msg: 'Email belum terdaftar!', status: 404 };

    const token = await encodeToken({
        id: findUser[0]?.id,
        role: findUser[0]?.role,
    });

    await prisma.users.update({
        data: { forgotPasswordToken: token },
        where: { email },
    });

    const emailHtml = fs.readFileSync(
        './src/public/emailSend/email.html',
        'utf-8',
    );

    let compiledHtml: any = compile(emailHtml);
    compiledHtml = compiledHtml({
        email: email,
        url: `http://localhost:3000/user/forgot-password/${token}`,
    });

    await transporter.sendMail({
        to: email,
        subject: 'Lupa Password?',
        html: compiledHtml,
    });
}

export const resetPasswordService = async ({
    id,
    password,
    forgotPasswordToken
}: any) => {
    const findUser = await prisma.users.findFirst({
        where: {
            id,
            forgotPasswordToken,
        },
    });

    if (!findUser?.id) throw { msg: 'Link sudah tidak berlaku', status: 406 };

    const checkUserPassword = await comparePassword(findUser?.password, password);
    if (checkUserPassword) throw { msg: 'Masukan password yang berbeda!', status: 400 };

    await prisma.users.update({
        data: {
            password: await hashPassword(password),
            forgotPasswordToken: null,
        },
        where: {
            id,
        },
    });

    const emailSucces = readFileSync('./src/public/emailSend/resetPasswordSucces.html', 'utf-8')
    let sendEmail: any = compile(emailSucces)
    sendEmail = sendEmail({
        firstName: findUser?.firstName,
        url: 'http://localhost:3000/user/login'
    })

    await transporter.sendMail({
        to: findUser?.email,
        html: sendEmail
    })
}

export const resetPasswordProfileService = async ({
    id,
    existingPassword,
    password
}: any) => {
    const findUser = await prisma.users.findFirst({
        where: {
            id,
        },
    });

    const match = await comparePassword(
        existingPassword,
        findUser?.password as string,
    );
    const samePassword = await comparePassword(
        password,
        findUser?.password as string,
    );

    if (!match) throw { msg: 'Password existing anda salah', status: 406 };
    if (samePassword) throw { msg: 'Harap masukan password yang berbeda', status: 406 };

    await prisma.users.update({
        data: {
            password: await hashPassword(password),
        },
        where: {
            id,
        },
    });
}