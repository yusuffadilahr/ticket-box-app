import express, { Request, Response, NextFunction } from 'express'
import { prisma } from '@/connection/index'

export const createReviewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reviewComments, feedback, rating, userId, eventId } = req.body
        const transaction = await prisma.transactions.findFirst({
            where: {
                eventId,
                userId
            }
        })

        if (!transaction) throw { msg: "user belum membeli tiket" }

        const statusTransaction = await prisma.transactionStatus.findFirst({
            where: {
                transactionsId: transaction.id,
                status: "PAID"
            }
        })

        if (!statusTransaction) throw { msg: "user belum melakukan pembayaran" }

        const existingReview = await prisma.reviews.findFirst({
            where: {
                eventId,
                userId,
            },
        });

        if (existingReview) throw { msg: "user telah memberikan review" }

        await prisma.reviews.create({
            data: {
                reviewText: reviewComments,
                feedback,
                rating,
                userId,
                eventId
            }
        })


        res.status(201).json({
            error: false,
            message: 'Berhasil',
            data: {}
        })
        //         id         Int    @id @default(autoincrement())
        //   rating     Int
        //   reviewText String
        //   feedback   String
        //   eventId    Int
        //   userId     String
    } catch (error) {
        next(error)
    }
}


export const getReviewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            eventId,
            page = '1',
            limit_data = '8'
        } = req.body

        const offset = Number(limit_data) * (Number(page) - 1);
        
        const dataReview = await prisma.reviews.findMany({
            where: {
                eventId
            },
            include: {
                event: true,
                users: true
            },
            take: Number(limit_data),
            skip: offset
        })


        const totalCount = await prisma.reviews.count({
            where: {
                eventId
            }
        });

        const totalPage = Math.ceil(Number(totalCount) / Number(limit_data));

        res.status(201).json({
            error: false,
            message: 'Berhasil Mendapatkan Data Review',
            data: {
                dataReview, totalPage
            }
        })

    } catch (error) {
        next(error)
    }
}