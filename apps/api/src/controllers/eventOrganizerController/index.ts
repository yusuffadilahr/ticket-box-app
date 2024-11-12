import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/connection';
import bcrypt from 'bcrypt';
import { hashPassword, comparePassword } from '@/utils/passwordHash';
import { nanoid } from 'nanoid';
import { encodeToken } from '@/utils/token.sign';
import { compile } from 'handlebars';
import fs, { readFileSync } from 'fs'
import { transporter } from '@/utils/transporter';

export const eventOrganizerRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organizerName, ownerName, email, password, phoneNumber, identityNumber } = req.body;
    if (!organizerName || !ownerName || !email || !password || !phoneNumber || !identityNumber) throw { msg: 'Harap diisi terlebih dahulu', status: 406 };

    const checkedEmail = await prisma.users.findMany({
      where: { email },
    });

    const checkedEmailEventOrganize = await prisma.eventOrganizer.findMany({
      where: { email },
    });

    if (checkedEmail.length != 0 || checkedEmailEventOrganize.length != 0)
      throw { msg: 'Email sudah terpakai', status: 400 };
    const hashed = await hashPassword(password);

    await prisma.eventOrganizer.create({
      data: {
        organizerName,
        ownerName,
        email,
        password: hashed,
        role: 'EO',
        phoneNumber,
        identityNumber,
        profilePicture:
          'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
      },
    });

    res.status(201).json({
      error: false,
      message: 'Berhasil membuat data',
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

export const eventOrganizerLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw { msg: 'Harap diisi terlebih dahulu', status: 406 };

    const checkUser = await prisma.eventOrganizer.findMany({
      where: {
        email: email,
      },
    });

    if (checkUser.length == 0) throw { msg: 'email belum teregistrasi', status: 400 };
    const isComparePassword = await comparePassword(password, checkUser[0]?.password);

    if (!isComparePassword) throw { msg: 'Password tidak valid!', status: 400 };
    const token = await encodeToken({ id: checkUser[0]?.id, role: checkUser[0]?.role });

    res.status(200).json({
      error: false,
      message: 'Berhasil login',
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

    res.status(200).json({
      error: false,
      message: 'Berhasil, Cek email secara berkala!',
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

    const findUser = await prisma.eventOrganizer.findFirst({
      where: {
        id: userId,
        forgotPasswordToken: token
      },
    })

    if (!findUser?.id) throw { msg: "Link sudah tidak berlaku", status: 406 }

    const match = await comparePassword(existingPassword, findUser?.password as string);
    const samePassword = await comparePassword(password, findUser?.password as string);

    if (!match) throw { msg: 'Password anda salah', status: 406 };
    if (samePassword) throw { msg: 'Harap masukan password yang berbeda', status: 406 };

    await prisma.eventOrganizer.update({
      data: {
        password: await hashPassword(password),
        forgotPasswordToken: null
      },
      where: {
        id: userId,
      },
    });

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

    if (findEvent.length == 0) throw { msg: 'Belum memiliki event', status: 404 }

    const findIdEvent = findEvent.map((event) => event.id)

    const findUserTransaction = await prisma.transactions.findMany({
      where: {
        eventId: {
          in: findIdEvent,
        }
      },
      include: {
        users: true
      }
    })

    if (findUserTransaction.length == 0) throw { msg: 'Belum ada data yang harus ditampilkan', status: 404 }

    res.status(200).json({
      error: false,
      message: 'Berhasil mendapatkan data user yang terdaftar dalam event!',
      data: findUserTransaction
    })

  } catch (error) {
    next(error)
  }
}

export const getTotalAmountUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body

    const findTransaction = await prisma.transactions.aggregate({
      _sum: {
        totalPrice: true
      },
      where: { eventOrganizerId: userId }
    })

    const findEvent = await prisma.event.findMany({
      where: {
        eventOrganizerId: userId
      }
    })

    res.status(200).json({
      error: false,
      message: 'Berhasil mendapatkan',
      data: {
        totalAmount: findTransaction._sum.totalPrice,
        findEvent
      }
    })

  } catch (error) {
    next(error)
  }
}