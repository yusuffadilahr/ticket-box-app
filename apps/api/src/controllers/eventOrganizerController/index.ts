import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/connection';
import bcrypt from 'bcrypt';
import { hashPassword, comparePassword } from '@/utils/passwordHash';
import { nanoid } from 'nanoid';
import { decodeToken, encodeToken } from '@/utils/token.sign';
import { compile } from 'handlebars';
import fs, { readFileSync } from 'fs'
import { transporter } from '@/utils/transporter';
import { addHours, addMonths, endOfWeek, startOfWeek } from 'date-fns';
import { eventOrganizerRegisterService, forgotPasswordOrganizerService, resetPasswordOnLoginService, resetPasswordOrganizerService, sendVerifyEmailUserService, verifyEmailUserService } from '@/services/event.organizer.service';
import { cloudinaryUpload } from '@/utils/cloudinary';
import { Prisma } from '@prisma/client';

export const eventOrganizerRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verifyCodeUser = nanoid(6)
    const { organizerName, ownerName, email, password, phoneNumber, identityNumber } = req.body;
    if (!organizerName || !ownerName || !email || !password || !phoneNumber || !identityNumber) throw { msg: 'Harap diisi terlebih dahulu', status: 406 };

    await eventOrganizerRegisterService({
      email,
      organizerName,
      ownerName,
      password,
      phoneNumber,
      identityNumber,
      verifyCodeUser
    })

    res.status(201).json({
      error: false,
      message: 'Registrasi berhasil. Silakan periksa email Anda untuk verifikasi.',
      data: {
        organizerName,
        ownerName,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const sendVerifyEmailUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    const token: any = authorization?.split(' ')[1] as string

    const decodedToken = await decodeToken(token) as any
    const userId = decodedToken?.data?.id

    await sendVerifyEmailUserService({
      id: userId
    })

    res.status(200).json({
      error: false,
      message: 'Harap cek email secara berkala!',
      data: {}
    })
  } catch (error) {
    next(error)
  }
}

export const verifyEmailUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, verificationCode } = req.body;

    await verifyEmailUserService({
      id: userId,
      verifyCode: verificationCode
    })

    res.status(200).json({
      error: false,
      message: 'Email berhasil diverifikasi.',
      data: {}
    })
  } catch (error) {
    next(error);
  }
}

export const eventOrganizerLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw { msg: 'Harap diisi terlebih dahulu', status: 406 };

    const checkUser = await prisma.eventOrganizer.findMany({
      where: {
        email: email,
      },
    });

    if (checkUser.length == 0) throw { msg: 'Email belum teregistrasi', status: 400 };
    const isComparePassword = await comparePassword(password, checkUser[0]?.password);

    if (!isComparePassword) throw { msg: 'Password tidak valid!', status: 400 };
    const token = await encodeToken({ id: checkUser[0]?.id, role: checkUser[0]?.role });

    res.status(200).json({
      error: false,
      message: 'Selamat datang kembali, Anda telah berhasil login.',
      data: {
        email,
        token,
        organizerName: checkUser[0]?.organizerName,
        ownerName: checkUser[0]?.ownerName,
        profilePicture: checkUser[0]?.profilePicture,
        role: checkUser[0]?.role,
      }, // token
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordOrganizer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body

    await forgotPasswordOrganizerService({
      email
    })

    res.status(200).json({
      error: false,
      message: 'Berhasil, Harap cek email secara berkala!',
      data: {}
    })
  } catch (error) {
    next(error)
  }
}

export const resetPasswordOrganizer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, existingPassword, password } = req.body;
    const { authorization } = req.headers;

    const token = authorization?.split(' ')[1]!;

    await resetPasswordOrganizerService({
      id: userId,
      token,
      existingPassword,
      password
    })

    res.status(200).json({
      error: false,
      message: 'Berhasil merubah password, silahkan login!',
      data: {},
    })
  } catch (error) {
    next(error);
  }
};

export const resetPasswordOnLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, existingPassword, password } = req.body;

    await resetPasswordOnLoginService({
      id: userId,
      existingPassword,
      password
    })

    res.status(200).json({
      error: false,
      message: 'Berhasil merubah password!',
      data: {},
    })
  } catch (error) {
    next(error);
  }
};

export const getUserByEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body

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

    console.log(weekStart, "<<< weekStart")
    console.log(endWeek, "<<< endWeek")

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

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

    const monthlyStatistic = await prisma.transactions.groupBy({
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

    const startYear = new Date(new Date().getFullYear(), 0, 1)
    const endYear = new Date(new Date().getFullYear(), 11, 31)

    const yearlyStatistic = await prisma.transactions.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: startYear,
          lte: endYear
        },
        eventOrganizerId: userId
      },
      _sum: {
        totalPrice: true
      }
    })

    res.status(200).json({
      error: false,
      message: 'Berhasil mendapatkan data user yang terdaftar dalam event!',
      data: {
        dataAttendee,
        dataEventUser: findEvent,
        dataTotalTransaction,
        totalAmount: totalAmount?._sum?.totalPrice,
        dailyStatistic,
        weeklyStatistic,
        monthlyStatistic,
        yearlyStatistic
      }
    })

  } catch (error) {
    next(error)
  }
}


export const getFeedbackUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body

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

    res.status(200).json({
      error: false,
      message: 'Data review & feedback telah didapat',
      data: findFeedback
    })
  } catch (error) {
    next(error)
  }
}

export const updateProfileOrganizer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageUpdload: any = req?.files
    const { userId, ownerName, organizer } = req.body

    const findUser = await prisma.eventOrganizer.findFirst({
      where: {
        id: userId
      }
    })

    if (!findUser) throw { msg: 'User tidak tersedia', status: 404 }

    const imagesUploaded = await Promise.all(imageUpdload?.images?.map(async (item: any) => {
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

    res.status(200).json({
      error: false,
      message: 'Berhasil merubah data profile',
      data: {}
    })

  } catch (error) {
    next(error)
  }
}

export const getReportTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body
    const { page = '1', limit_data = '5', search } = req.query

    const offset = Number(limit_data) * (Number(page) - 1);
    const findTransaction = await prisma.transactions.findMany({
      where: {
        eventOrganizerId: userId,
        OR: [
          { id: { contains: search as string, mode: 'insensitive' as Prisma.QueryMode } },
          { userId: { contains: search as string, mode: 'insensitive' as Prisma.QueryMode } },
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

    console.log(totalPage);

    res.status(200).json({
      error: false,
      message: "Data berhasil didapatkan!",
      data: { findTransaction, totalPage }
    })
  } catch (error) {
    next(error)
  }
}