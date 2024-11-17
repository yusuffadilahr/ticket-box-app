import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/connection';
import { comparePassword } from '@/utils/passwordHash';
import { nanoid } from 'nanoid';
import { decodeToken, encodeToken } from '@/utils/token.sign';
import { eventOrganizerRegisterService, forgotPasswordOrganizerService, getFeedbackUserService, getReportTransactionService, getUserByEventService, resetPasswordOnLoginService, resetPasswordOrganizerService, sendVerifyEmailUserService, updateProfileOrganizerService, verifyEmailUserService } from '@/services/event.organizer.service';

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

    const dataUser = await getUserByEventService({
      userId
    })

    res.status(200).json({
      error: false,
      message: 'Berhasil mendapatkan data user yang terdaftar dalam event!',
      data: {
        dataAttendee: dataUser?.dataAttendee,
        dataEventUser: dataUser?.findEvent,
        dataTotalTransaction: dataUser?.dataTotalTransaction,
        totalAmount: dataUser?.totalAmount?._sum?.totalPrice,
        dailyStatistic: dataUser?.dailyStatistic,
        weeklyStatistic: dataUser?.weeklyStatistic,
        monthlyStatistic: dataUser?.monthlyStatistic,
        yearlyStatistic: dataUser?.yearlyStatistic
      }
    })

  } catch (error) {
    next(error)
  }
}


export const getFeedbackUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body

    const dataUser = await getFeedbackUserService({
      userId
    })

    res.status(200).json({
      error: false,
      message: 'Data review & feedback telah didapat',
      data: dataUser?.findFeedback
    })
  } catch (error) {
    next(error)
  }
}

export const updateProfileOrganizer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageUpload: any = req?.files
    const { userId, ownerName, organizer } = req.body

    await updateProfileOrganizerService({
      userId,
      imageUpload,
      ownerName,
      organizer
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
    const { page = '1', limit_data = '5', search = '' } = req.query

    const dataUser = await getReportTransactionService({
      limit_data,
      page,
      userId,
      search
    })

    res.status(200).json({
      error: false,
      message: "Data berhasil didapatkan!",
      data: { findTransaction: dataUser?.findTransaction, totalPage: dataUser?.totalPage }
    })
  } catch (error) {
    next(error)
  }
}