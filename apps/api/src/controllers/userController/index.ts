import { Request, Response, NextFunction } from 'express';
import { prisma } from './../../connection';
import { hashPassword, comparePassword } from './../../utils/passwordHash';
import { nanoid } from 'nanoid';
import { decodeToken, encodeToken } from './../../utils/token.sign';
import { addHours } from 'date-fns';
import { cloudinaryUpload } from './../../utils/cloudinary';
import { forgotPasswordService, resetPasswordProfileService, resetPasswordService, sendVerifyEmailUserService, updateProfileUserService, userRegisterService, verifyUserService } from './../../services/user.service';

export const userRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = nanoid(8);
    const dateNow = addHours(new Date(), 7);
    const verificationCode = nanoid(6);

    const date = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
    const refferal = `TBX-${id}-${date}`;

    const { firstName, lastName, email, password, phoneNumber, identityNumber, referralBody /* REFERRAL BOLEH NULL */ } = req.body;
    if (!firstName || !lastName || !email || !password || !phoneNumber || !identityNumber) throw { msg: 'Harap diisi terlebih dahulu', status: 406 };

    await userRegisterService({
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
    })

    res.status(201).json({
      error: false,
      message: 'Berhasil membuat data, silahkan cek email untuk verifikasi.',
      data: { firstName, lastName, email, phoneNumber },
    });
  } catch (error) {
    next(error);
  }
};

export const signInWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = nanoid(8);
    const verificationCode = nanoid(6);

    const date = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
    const refferal = `TBX-${id}-${date}`;

    const { firstName, lastName, email, profilePicture } = req.body;

    const findEmailInEventOrganizer = await prisma.eventOrganizer.findFirst({
      where: { email: email }
    })

    if (findEmailInEventOrganizer) throw { msg: 'Email sudah terpakai', status: 400 }

    const findEmail = await prisma.users.findFirst({
      where: { email: email }
    })

    const token = await encodeToken({ id: findEmail?.id as string, role: findEmail?.role as string })

    if (findEmail) {
      res.status(200).json({
        error: false,
        message: 'Login menggunakan Google berhasil!',
        data: { token }
      })
    } else {
      const newUser = await prisma.users.create({
        data: {
          firstName,
          lastName,
          email: email,
          password: await hashPassword('@googlesign123'),
          role: 'user',
          isVerified: Boolean(true),
          verifyCode: verificationCode,
          phoneNumber: 'Belum terisi',
          identityNumber: 'Belum terisi',
          profilePicture: profilePicture,
          referralCode: refferal,
          isGoogleRegister: true
        }
      })
      const token = await encodeToken({ id: newUser?.id as string, role: newUser?.role as string })

      res.status(201).json({
        error: false,
        message: 'Register menggunakan Google berhasil!',
        data: {
          token,
          email,
          firstName: newUser?.firstName,
          lastName: newUser?.lastName,
          role: newUser?.role,
          phoneNumber: newUser?.phoneNumber,
          profilePicture: newUser?.profilePicture,
          identityNumber: newUser?.identityNumber,
          refferalCode: newUser?.referralCode,
        }
      })
    }

  } catch (error) {
    next(error)
  }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw { msg: 'Harap diisi terlebih dahulu', status: 406 };

    const checkUser = await prisma.users.findMany({ where: { email: email } });

    if (checkUser.length == 0) throw { msg: 'email belum teregistrasi', status: 400 };
    const isComparePassword = await comparePassword(password, checkUser[0]?.password)

    if (!isComparePassword) throw { msg: 'Password anda Salah!', status: 400 };

    const token = await encodeToken({
      id: checkUser[0]?.id,
      role: checkUser[0]?.role,
    });

    res.status(200).json({
      error: false,
      message: 'Berhasil login',
      data: {
        token,
        email,
        firstName: checkUser[0]?.firstName,
        lastName: checkUser[0]?.lastName,
        role: checkUser[0]?.role,
        phoneNumber: checkUser[0]?.phoneNumber,
        profilePicture: checkUser[0]?.profilePicture,
        identityNumber: checkUser[0]?.identityNumber,
        refferalCode: checkUser[0]?.referralCode,
      }, // token
    });
  } catch (error) {
    next(error);
  }
};

export const keepAuthUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, authorizationRole } = req.body;
    let dataUser: any;
    let dataEventOrganizer: any;

    if (authorizationRole == 'user') {
      dataUser = await prisma.users.findMany({
        where: { id: userId },
        include: {
          points: true,
          referalDiscounts: true,
          Transactions: true,
        },
      })

    } else if (authorizationRole == 'EO') {
      dataEventOrganizer = await prisma.eventOrganizer.findMany({
        where: { id: userId },
        include: {
          events: true,
          Transactions: true
        }
      })
    }

    // if (dataUser?.length == 0) throw { msg: 'Data tidak tersedia', status: 404 };
    // if (dataEventOrganizer?.length == 0) throw { msg: 'Data tidak tersedia', status: 404 };

    res.status(200).json({
      error: false,
      message: 'Get Profile berhasil',
      data: authorizationRole == 'user' ? {
        isVerified: dataUser[0]?.isVerified,
        firstName: dataUser[0]?.firstName,
        lastName: dataUser[0]?.lastName,
        role: dataUser[0]?.role,
        email: dataUser[0]?.email,
        phoneNumber: dataUser[0]?.phoneNumber,
        profilePicture: dataUser[0]?.profilePicture,
        identityNumber: dataUser[0]?.identityNumber,
        refferalCode: dataUser[0]?.referralCode,
        point: dataUser[0]?.points[0]?.point || 0,
        discount: dataUser[0]?.referalDiscounts[0]?.discount || 0

      } : authorizationRole == 'EO' ? {
        organizerName: dataEventOrganizer[0]?.organizerName,
        ownerName: dataEventOrganizer[0]?.ownerName,
        role: dataEventOrganizer[0]?.role,
        email: dataEventOrganizer[0]?.email,
        phoneNumber: dataEventOrganizer[0]?.phoneNumber,
        profilePicture: dataEventOrganizer[0]?.profilePicture,
        identityNumber: dataEventOrganizer[0]?.identityNumber,
        isVerified: dataEventOrganizer[0]?.isVerified,
        events: dataEventOrganizer[0]?.events,
        transactions: dataEventOrganizer[0]?.Transactions,
        // totalAmount: totalAmount?._sum?.totalPrice
      } : {},
    });
  } catch (error) {
    next(error);
  }
}

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    await forgotPasswordService({ email })

    res.status(200).json({
      error: false,
      message: 'Harap cek email anda secara berkala!',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, password } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1]!;

    await resetPasswordService({
      id: userId,
      password,
      forgotPasswordToken: token
    })

    res.status(200).json({
      error: false,
      message: 'Berhasil merubah password!',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, existingPassword, password } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1]!;

    await resetPasswordProfileService({
      id: userId,
      existingPassword,
      password
    })

    res.status(200).json({
      error: false,
      message: 'Berhasil merubah password!',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfileUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imagesUpload: any = req.files;
    const { userId, firstName, lastName, phoneNumber, identityNumber } = req.body;

    const imagesUploaded = await Promise.all(imagesUpload?.images.map(async (item: any) => {
      const result: any = await cloudinaryUpload(item?.buffer)

      return await result?.res!
    }))

    await updateProfileUserService({
      profilePicture: imagesUploaded[0],
      firstName,
      lastName,
      phoneNumber,
      identityNumber: identityNumber,
      id: userId
    })

    res.status(200).json({
      error: false,
      message: 'Berhasil mengubah data',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, verificationCode } = req.body;

    await verifyUserService({ userId, verificationCode })

    res.status(200).json({
      error: false,
      message: 'Berhasil konfirmasi, silahkan login!',
      data: {}
    })
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
      id: userId,
      token
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