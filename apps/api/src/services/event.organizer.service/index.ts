import { prisma } from "@/connection";
import { comparePassword, hashPassword } from "@/utils/passwordHash";
import { encodeToken } from "@/utils/token.sign";
import { transporter } from "@/utils/transporter";
import fs, { readFileSync } from 'fs'
import { compile } from "handlebars";

export const eventOrganizerRegisterService = async ({
    email,
    organizerName,
    ownerName,
    password,
    phoneNumber,
    identityNumber,
    verifyCodeUser
}: any) => {
    const checkedEmail = await prisma.users.findMany({
        where: { email },
    });

    const checkedEmailEventOrganize = await prisma.eventOrganizer.findMany({
        where: { email },
    });

    if (checkedEmail?.length != 0 || checkedEmailEventOrganize?.length != 0)
        throw { msg: 'Email sudah terpakai', status: 400 };
    const hashed = await hashPassword(password);

    const dataUser = await prisma.eventOrganizer.create({
        data: {
            organizerName,
            ownerName,
            email,
            password: hashed,
            role: 'EO',
            phoneNumber,
            identityNumber,
            isVerified: false,
            verifyCode: verifyCodeUser,
            profilePicture: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
        },
    });

    const sendToken = await encodeToken({ id: dataUser?.id, role: dataUser?.role })

    const dataEmail = fs.readFileSync('./src/public/emailSend/emailVerification.html', 'utf-8')
    let compiledHtml: any = compile(dataEmail)
    compiledHtml = compiledHtml({
        firstName: dataUser?.ownerName,
        email: email,
        url: `http://localhost:3000/event-organizer/verification-user/${dataUser?.verifyCode}-TBX-${sendToken}`,
        verifCode: dataUser?.verifyCode
    });

    await transporter.sendMail({
        to: email,
        subject: 'Verifikasi Email Anda untuk melanjutkan!',
        html: compiledHtml
    })
}

export const sendVerifyEmailUserService = async ({
    id
}: any) => {
    const findUser = await prisma.eventOrganizer.findFirst({
        where: { id }
    })

    if (!findUser) throw { msg: 'User tidak ditemukan', status: 404 }

    const sendToken = await encodeToken({ id: findUser?.id, role: findUser?.role })

    const dataEmail = fs.readFileSync('./src/public/emailSend/emailVerification.html', 'utf-8')

    let compiledHtml: any = compile(dataEmail)
    compiledHtml = compiledHtml({
        firstName: findUser?.ownerName,
        email: findUser?.email,
        url: `http://localhost:3000/event-organizer/verification-user/${findUser?.verifyCode}-TBX-${sendToken}`,
        verifCode: findUser?.verifyCode
    });

    await transporter.sendMail({
        to: findUser?.email,
        subject: 'Verifikasi dirimu sekarang!',
        html: compiledHtml
    })
}

export const verifyEmailUserService = async ({
    id, verifyCode
}: any) => {
    const findUser = await prisma.eventOrganizer.findFirst({
        where: {
            AND: [{ id }, { verifyCode }],
        },
    });

    if (!findUser) throw { msg: 'Data tidak valid', status: 404 };

    await prisma.eventOrganizer.update({
        data: {
            isVerified: true,
        },
        where: { id: findUser?.id },
    });

    const emailSucces = readFileSync('./src/public/emailSend/verifyEmailSucces.html', 'utf-8')
    let sendEmail: any = compile(emailSucces)
    sendEmail = sendEmail({
        firstName: findUser?.ownerName,
        url: 'http://localhost:3000/event/dashboard'
    })

    await transporter.sendMail({
        to: findUser?.email,
        subject: `Halo ${findUser?.ownerName}, Selamat datang!`,
        html: sendEmail
    })
}

export const forgotPasswordOrganizerService = async ({
    email,
}: any) => {
    const findUser = await prisma.eventOrganizer.findFirst({
        where: {
            email
        }
    })

    if (!findUser) throw { msg: 'User tidak ada', status: 404 }

    const token = await encodeToken({ id: findUser?.id, role: findUser?.role })

    await prisma.eventOrganizer.update({
        data: { forgotPasswordToken: token },
        where: { email: email }
    })

    const emailHtml = readFileSync('./src/public/emailSend/email.html', 'utf-8')
    let emailToUser: any = await compile(emailHtml)
    emailToUser = emailToUser({
        email: email,
        url: `http://localhost:3000/event-organizer/forgot-password/${token}`
    })

    await transporter.sendMail({
        to: email,
        subject: 'Lupa Password?',
        html: emailToUser
    })
}

export const resetPasswordOrganizerService = async ({
    id,
    token,
    existingPassword,
    password
}: any) => {
    const findUser = await prisma.eventOrganizer.findFirst({
        where: {
            id,
            forgotPasswordToken: token
        },
    })

    if (!findUser?.id) throw { msg: "Link sudah tidak berlaku", status: 406 }

    const match = await comparePassword(existingPassword, findUser?.password as string);
    const samePassword = await comparePassword(password, findUser?.password as string);

    if (!match) throw { msg: 'Password lama anda salah!', status: 406 };
    if (samePassword) throw { msg: 'Harap masukan password yang berbeda!', status: 406 };

    await prisma.eventOrganizer.update({
        data: {
            password: await hashPassword(password),
            forgotPasswordToken: null
        },
        where: {
            id,
        },
    });

    const emailSucces = readFileSync('./src/public/emailSend/resetPasswordSucces.html', 'utf-8')
    let sendEmail: any = compile(emailSucces)
    sendEmail = sendEmail({
        firstName: findUser?.ownerName,
        url: 'http://localhost:3000/event-organizer/login'
    })

    await transporter.sendMail({
        to: findUser?.email,
        subject: 'Berhasil mengganti password!',
        html: sendEmail
    })
}

export const resetPasswordOnLoginService = async ({
    id,
    existingPassword,
    password
}: any) => {
    const findUser = await prisma.eventOrganizer.findFirst({
        where: {
            id,
        },
    })

    if (!findUser?.id) throw { msg: "User tidak ditemukan!", status: 404 }

    const match = await comparePassword(existingPassword, findUser?.password as string);
    const samePassword = await comparePassword(password, findUser?.password as string);

    if (!match) throw { msg: 'Password lama anda salah!', status: 406 };
    if (samePassword) throw { msg: 'Harap masukan password yang berbeda!', status: 406 };

    await prisma.eventOrganizer.update({
        data: {
            password: await hashPassword(password),
            forgotPasswordToken: null
        },
        where: {
            id,
        },
    });

    const emailSucces = readFileSync('./src/public/emailSend/resetPasswordSucces.html', 'utf-8')
    let sendEmail: any = compile(emailSucces)
    sendEmail = sendEmail({
        firstName: findUser?.ownerName,
        url: 'http://localhost:3000/event-organizer/login'
    })

    await transporter.sendMail({
        to: findUser?.email,
        subject: 'Berhasil mengganti password!',
        html: sendEmail
    })
}