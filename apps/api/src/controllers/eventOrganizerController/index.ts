import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/connection';
import bcrypt from 'bcrypt';
import { hashPassword, comparePassword } from '@/utils/passwordHash';
import { nanoid } from 'nanoid';
import { encodeToken } from '@/utils/token.sign';

// EO CONTROLLER
export const keepAuthUserOrganizer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body
    const searchData = await prisma.eventOrganizer.findMany({
      where: { id: userId }
    })

    if (searchData.length == 0) throw { msg: 'Data tidak tersedia', status: 404 }

    res.status(200).json({
      error: false,
      message: 'Data berhasil didapatkan!',
      data: {
        organizerName: searchData[0].organizerName,
        ownerName: searchData[0].ownerName,
        email: searchData[0].email,
        role: searchData[0].role,
        profilePicture: searchData[0].profilePicture
      }
    })
    
  } catch (error) {
    next(error)
  }
}

export const eventOrganizerRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organizerName, ownerName, email, password, phoneNumber, identityNumber } = req.body;
    if (!organizerName || !ownerName || !email || !password || !phoneNumber || !identityNumber) throw { msg: 'Harap diisi terlebih dahulu', status: 406 }
    const checkedEmail = await prisma.users.findMany({
      where: { email }
    })

    const checkedEmailEventOrganize = await prisma.eventOrganizer.findMany({
      where: { email }
    })

    if (checkedEmail.length != 0 || checkedEmailEventOrganize.length != 0) throw { msg: 'Email sudah terpakai', status: 400 }
    const hashed = await hashPassword(password)

    await prisma.eventOrganizer.create({
      data: { organizerName, ownerName, email, password: hashed, role: 'EO', phoneNumber, identityNumber, profilePicture: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' },
    });

    res.status(201).json({
      error: false,
      message: 'Berhasil membuat data',
      data: {
        organizerName,
        ownerName,
        email
      }
    })
  } catch (error) {
    next(error);
  }
}

export const eventOrganizerLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    if (!email || !password) throw { msg: 'Harap diisi terlebih dahulu', status: 406 }
    const checkUser = await prisma.eventOrganizer.findMany({
      where:
      {
        email: email
      }
    })
    if (checkUser.length == 0) throw { msg: "email belum teregistrasi", status: 400 }
    const isComparePassword = await comparePassword(password, checkUser[0].password)
    if (!isComparePassword) throw { msg: "Password tidak valid!", status: 400 }

    const token = await encodeToken({
      id: checkUser[0].id,
      role: checkUser[0].role,
    })

    res.status(200).json({
      error: false,
      message: 'Berhasil login',
      data: {
        email,
        token,
        organizerName: checkUser[0].organizerName,
        ownerName: checkUser[0].ownerName,
        profilePicture: checkUser[0].profilePicture,
        role: checkUser[0].role
      } // token
    })

  } catch (error) {
    next(error)
  }
}