import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/connection';
import { hashPassword, comparePassword } from '@/utils/passwordHash';
import { nanoid } from 'nanoid';
import { decodeToken, encodeToken } from '@/utils/token.sign';
import fs, { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { transporter } from '@/utils/transporter';
import { addMonths, addHours } from 'date-fns';
import bcrypt from 'bcrypt'
import { cloudinaryUpload } from '@/utils/cloudinary';

export const userRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = nanoid(8);
    const dateNow = addHours(new Date(), 7);
    const verificationCode = nanoid(6);

    const date = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
    const refferal = `TBX-${id}-${date}`;

    const { firstName, lastName, email, password, phoneNumber, identityNumber, referralBody /* REFERRAL BOLEH NULL */ } = req.body;
    if (!firstName || !lastName || !email || !password || !phoneNumber || !identityNumber) throw { msg: 'Harap diisi terlebih dahulu', status: 406 };

    const checkedEmail = await prisma.users.findMany({
      where: { email },
    });

    if (checkedEmail.length != 0) throw { msg: 'Email sudah terpakai', status: 400 };
    const hashed = await hashPassword(password);

    const dataRegisterUser = await prisma.users.create({
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

    const checkedRefferal = await prisma.users.findUnique({
      where: { referralCode: referralBody },
    });

    if (checkedRefferal) {
      const pointsRecord = await prisma.points.findFirst({
        where: {
          userIdRefferalMatch: checkedRefferal?.id,
        },
      });

      await prisma.referalDiscounts.create({
        data: {
          userIdRefferal: dataRegisterUser.id,
          discount: 0.1,
          isUsed: false,
          expiredDate: addHours(addMonths(dateNow, 3), 7),
        },
      });

      if (!pointsRecord) {
        await prisma.points.create({
          data: {
            userIdRefferalMatch: checkedRefferal?.id,
            point: 10000,
            expiredDate: addHours(addMonths(dateNow, 3), 7),
          },
        });
      } else {
        await prisma.points.update({
          where: { id: pointsRecord?.id },
          data: {
            point: pointsRecord?.point + 10000,
            expiredDate: addHours(addMonths(dateNow, 3), 7),
          },
        });
      }
    }

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
    const isComparePassword = await comparePassword(password, checkUser[0].password)

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
    let totalAmount: any


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

      totalAmount = await prisma.transactions.aggregate({
        _sum: { totalPrice: true },
        where: { eventOrganizerId: userId }
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

    await prisma.$transaction(async (tx: any) => {
      const findUser = await tx.users.findMany({
        where: { email },
      });

      if (findUser.length == 0) throw { msg: 'User tidak ada', status: 404 };

      const token = await encodeToken({
        id: findUser[0].id,
        role: findUser[0].role,
      });

      await tx.users.update({
        data: { forgotPasswordToken: token },
        where: { email },
      });

      const emailHtml = fs.readFileSync(
        './src/public/emailSend/email.html',
        'utf-8',
      );
      let compiledHtml: any = await compile(emailHtml);
      compiledHtml = compiledHtml({
        email: email,
        url: `http://localhost:3000/user/forgot-password/${token}`,
      });

      await transporter.sendMail({
        to: email,
        subject: 'Lupa Password?',
        html: compiledHtml,
      });

      res.status(200).json({
        error: false,
        message: 'Harap cek email anda secara berkala!',
        data: {},
      });
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

    const findUser = await prisma.users.findFirst({
      where: {
        id: userId,
        forgotPasswordToken: token,
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
        id: userId,
      },
    });

    const emailSucces = readFileSync('./src/public/emailSend/resetPasswordSucces.html', 'utf-8')
    let sendEmail: any = await compile(emailSucces)
    sendEmail = sendEmail({
      firstName: findUser?.firstName,
      url: 'http://localhost:3000/user/login'
    })

    await transporter.sendMail({
      to: findUser?.email,
      html: sendEmail
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

    const findUser = await prisma.users.findFirst({
      where: {
        id: userId,
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
        id: userId,
      },
    });

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
    // if (firstName || lastName || phoneNumber || identityNumber) throw { msg: 'Harus diisi', status: 400 }

    // if(req.files) {
    //   files = Array.isArray(req.files)
    //     ? req.files
    //     : req.files['images']
    // }

    // const imagesUploaded = []
    // for (const image of imagesUpload!) {
    //   const result: any = await cloudinaryUpload(image.buffer)
    //   console.log(result)
    //   imagesUploaded.push(result.res!)
    // }


    const imagesUploaded = await Promise.all(imagesUpload?.images.map(async (item: any) => {
      const result: any = await cloudinaryUpload(item?.buffer)

      return await result?.res!
    }))

    await prisma.users.update({
      data: {
        profilePicture: imagesUploaded[0],
        firstName,
        lastName,
        phoneNumber,
        identityNumber: identityNumber,
      },
      where: {
        id: userId,
      },
    });

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
    let sendEmail: any = await compile(emailSucces)
    sendEmail = sendEmail({
      firstName: findUser?.firstName,
      url: 'http://localhost:3000/'
    })

    await transporter.sendMail({
      to: findUser?.email,
      subject: 'Kamu berhasil verifikasi!',
      html: sendEmail
    })

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

    const findUser = await prisma.users.findFirst({
      where: { id: userId }
    })

    if (!findUser) throw { msg: 'User tidak ditemukan', status: 404 }

    const emailHTML = fs.readFileSync('./src/public/emailSend/emailVerification.html', 'utf-8');
    let compiledHtml: any = await compile(emailHTML);
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

    res.status(200).json({
      error: false,
      message: 'Harap cek email secara berkala!',
      data: {}
    })
  } catch (error) {
    next(error)
  }
}