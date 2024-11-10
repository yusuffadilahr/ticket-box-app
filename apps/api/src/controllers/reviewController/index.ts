import express, {Request, Response, NextFunction} from 'express'
import {prisma} from '@/connection/index' 

export const createReviewUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {reviewComments, feedback, rating, userId, eventId} = req.body
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
    }catch(error) {
        next(error)
    }
}