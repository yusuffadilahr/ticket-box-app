import { uploadMulter } from "@/utils/multer";
import { NextFunction, Request, Response } from "express";

export const uploader = (req: Request, res: Response, next: NextFunction) => {
    const uploads = uploadMulter.fields([{ name: 'images', maxCount: 3 }])
    const { userId, authorizationRole } = req.body


    uploads(req, res, (err) => {
        try {
            if (err) throw { msg: err.message, status: 400 }
            console.log('>>>>>><<<<< line 12')
            if (!Array.isArray(req?.files) && !req?.files?.images?.length) throw { msg: 'file tidak ditemukan', status: 404 }

            if (userId && authorizationRole) {
                req.body.userId = userId
                req.body.authorizationRole = authorizationRole
            }

            next()
        } catch (error) {
            next(error)
        }
    })
}

