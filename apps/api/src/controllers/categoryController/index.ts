import { prisma } from "@/connection";
import { createCategoryService } from "@/services/category.service";
import { NextFunction, Request, Response } from "express";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category } = req.body

        await createCategoryService({ category })

        res.status(200).json({
            error: false,
            message: 'Berhasil menambahkan kategori!',
            data: { category }
        })

    } catch (error) {
        next(error)
    }
}

export const getCategoryEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const findCategory = await prisma.category.findMany()
        if (findCategory.length == 0) throw { msg: 'Data tidak tersedia, mohon periksa kembali!', status: 404 }

        res.status(200).json({
            error: false,
            message: 'Berhasil menampilkan data kategori!',
            data: findCategory
        })

    } catch (error) {
        next(error)
    }
}