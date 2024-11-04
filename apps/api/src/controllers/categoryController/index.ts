import { prisma } from "@/connection";
import { NextFunction, Request, Response } from "express";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category } = req.body

        const contoh = await prisma.category.create({
            data: {
                Category: category
            }
        })

        console.log(contoh)

        res.status(200).json({
            error: false,
            message: 'Berhasil',
            data: { category }
        })
        
    } catch (error) {
        next(error)
    }
}