import path from "path";
import { prisma } from "./../../connection";
import { cloudinaryUpload } from "./../../utils/cloudinary/index";
import { comparePassword, hashPassword } from "./../../utils/passwordHash";
import { encodeToken } from "./../../utils/token.sign";
import { transporter } from "./../../utils/transporter";
import { Prisma } from "@prisma/client";
import { endOfWeek, startOfWeek } from "date-fns";
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

    const emailFilePath = path.join(__dirname, '..', '..', '..', 'public', 'emailSend', 'emailVerification.html');
    const dataEmail = fs.readFileSync(emailFilePath, 'utf-8')

    let compiledHtml: any = compile(dataEmail)
    compiledHtml = compiledHtml({
        firstName: dataUser?.ownerName,
        email: email,
        url: `https://ticket-box-web-app.vercel.app/event-organizer/verification-user/${dataUser?.verifyCode}-TBX-${sendToken}`,
        verifCode: dataUser?.verifyCode
    });

    await transporter.sendMail({
        from: 'ticket-box@gancy.my.id',
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

    const emailFilePath = path.join(__dirname, '..', '..', '..', 'public', 'emailSend', 'emailVerification.html');
    const dataEmail = fs.readFileSync(emailFilePath, 'utf-8')

    let compiledHtml: any = compile(dataEmail)
    compiledHtml = compiledHtml({
        firstName: findUser?.ownerName,
        email: findUser?.email,
        url: `https://ticket-box-web-app.vercel.app/event-organizer/verification-user/${findUser?.verifyCode}-TBX-${sendToken}`,
        verifCode: findUser?.verifyCode
    });

    await transporter.sendMail({
        from: 'ticket-box@gancy.my.id',
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

    const emailFilePath = path.join(__dirname, '..', '..', '..', 'public', 'emailSend', 'verifyEmailSucces.html');
    const dataEmail = fs.readFileSync(emailFilePath, 'utf-8')

    let sendEmail: any = compile(dataEmail)
    sendEmail = sendEmail({
        firstName: findUser?.ownerName,
        url: 'https://ticket-box-web-app.vercel.app/event/dashboard'
    })

    await transporter.sendMail({
        from: 'ticket-box@gancy.my.id',
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

    const emailFilePath = path.join(__dirname, '..', '..', '..', 'public', 'emailSend', 'email.html');
    const dataEmail = fs.readFileSync(emailFilePath, 'utf-8')

    let emailToUser: any = compile(dataEmail)
    emailToUser = emailToUser({
        email: email,
        url: `https://ticket-box-web-app.vercel.app/event-organizer/forgot-password/${token}`
    })

    await transporter.sendMail({
        from: 'ticket-box@gancy.my.id',
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
    const emailFilePath = path.join(__dirname, '..', '..', '..', 'public', 'emailSend', 'resetPasswordSucces.html');
    const dataEmail = fs.readFileSync(emailFilePath, 'utf-8')

    let sendEmail: any = compile(dataEmail)
    sendEmail = sendEmail({
        firstName: findUser?.ownerName,
        url: 'https://ticket-box-web-app.vercel.app/event-organizer/login'
    })

    await transporter.sendMail({
        from: 'ticket-box@gancy.my.id',
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

    const emailFilePath = path.join(__dirname, '..', '..', '..', 'public', 'emailSend', 'resetPasswordSucces.html');
    const dataEmail = fs.readFileSync(emailFilePath, 'utf-8')


    let sendEmail: any = compile(dataEmail)
    sendEmail = sendEmail({
        firstName: findUser?.ownerName,
        url: 'https://ticket-box-web-app.vercel.app/event-organizer/login'
    })

    await transporter.sendMail({
        from: 'ticket-box@gancy.my.id',
        to: findUser?.email,
        subject: 'Berhasil mengganti password!',
        html: sendEmail
    })
}

export const getUserByEventService = async ({
    userId
}: any) => {
    const findEvent = await prisma.event.findMany({
        where: { eventOrganizerId: userId }
    })

    const findUserTransaction = await prisma.transactions.groupBy({
        by: ['userId'],
        where: { eventOrganizerId: userId }
    })

    const dataAttendee = findUserTransaction?.map((itm) => {
        return {
            userId: itm.userId
        }
    })

    const dataTotalTransaction = await prisma.transactions.findMany({
        where: {
            eventOrganizerId: userId
        }
    })

    const totalAmount = await prisma.transactions.aggregate({
        _sum: {
            totalPrice: true
        }, where: {
            eventOrganizerId: userId
        }
    })

    const dailyStatistic = await prisma.transactions.groupBy({
        by: ['createdAt'],
        where: { eventOrganizerId: userId },
        _sum: {
            totalPrice: true
        }
    })

    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
    const endWeek = endOfWeek(new Date(), { weekStartsOn: 1 })

    const weeklyStatistic = await prisma.transactions.groupBy({
        by: ['createdAt'],
        where: {
            createdAt: {
                gte: weekStart,
                lte: endWeek
            },
            eventOrganizerId: userId
        },
        _sum: {
            totalPrice: true
        }
    })

    const monthlyStatistic = [];
    for (let month = 0; month < 12; month++) {
        const startOfMonth = new Date(new Date().getFullYear(), month, 1);
        const endOfMonth = new Date(new Date().getFullYear(), month + 1, 0);

        const monthlyStatistics = await prisma.transactions.groupBy({
            by: ['createdAt'],
            where: {
                createdAt: {
                    gte: startOfMonth,
                    lte: endOfMonth
                },
                eventOrganizerId: userId
            },
            _sum: {
                totalPrice: true
            }
        });
        monthlyStatistic.push({ month, monthlyStatistics });
    }

    const yearlyStatistic = [];
    const currentYear = new Date().getFullYear();

    for (let yearOffset = 0; yearOffset < 5; yearOffset++) {
        const year = currentYear - yearOffset;
        const startOfYear = new Date(year, 0, 1); // Awal tahun, 1 Januari
        const endOfYear = new Date(year + 1, 0, 0); // Akhir tahun, 31 Desember

        const yearlyStatistics = await prisma.transactions.groupBy({
            by: ['createdAt'],
            where: {
                createdAt: {
                    gte: startOfYear,
                    lte: endOfYear
                },
                eventOrganizerId: userId
            },
            _sum: {
                totalPrice: true
            }
        });

        yearlyStatistic.push({ year, yearlyStatistics });
    }

    return {
        dataAttendee,
        findEvent,
        dataTotalTransaction,
        totalAmount,
        dailyStatistic,
        weeklyStatistic,
        monthlyStatistic,
        yearlyStatistic
    }
}

export const getFeedbackUserService = async ({
    userId
}: any) => {
    const findUser = await prisma.event.findMany({
        where: { eventOrganizerId: userId }
    })

    const findFeedback = await prisma.reviews.findMany({
        where: {
            eventId: {
                in: findUser?.map(ev => ev?.id)
            }
        }
    })

    return {
        findFeedback
    }
}

export const updateProfileOrganizerService = async ({
    userId,
    imageUpload,
    ownerName,
    organizer,
}: any) => {
    const findUser = await prisma.eventOrganizer.findFirst({
        where: {
            id: userId
        }
    })

    if (!findUser) throw { msg: 'User tidak tersedia', status: 404 }

    const imagesUploaded = await Promise.all(imageUpload?.images?.map(async (item: any) => {
        const result: any = await cloudinaryUpload(item?.buffer)

        return result?.res!
    }))

    await prisma.eventOrganizer.update({
        data: {
            ownerName,
            organizerName: organizer,
            profilePicture: imagesUploaded[0]
        },
        where: {
            id: userId
        }
    })
}

export const getReportTransactionService = async ({
    limit_data,
    page,
    userId,
    search
}: any) => {
    const offset = Number(limit_data) * (Number(page) - 1);
    const findTransaction = await prisma.transactions.findMany({
        where: {
            eventOrganizerId: userId,
            OR: [
                { id: { contains: search as string } },
                { userId: { contains: search as string } },
            ]
        },
        include: {
            transactionDetail: true,
            transactionStatus: true
        },
        take: Number(limit_data),
        skip: offset
    })

    const totalCount = await prisma.transactions.count({
        where: {
            eventOrganizerId: userId
        }
    })

    const totalPage = Math.ceil(Number(totalCount) / Number(limit_data));

    return {
        findTransaction,
        totalPage
    }
}