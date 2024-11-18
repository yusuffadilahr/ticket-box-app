import { prisma } from "./../../connection"

export const createReviewUserService = async ({
    feedback,
    rating,
    userId,
    eventId,
    reviewComments
}: any) => {
    await prisma.$transaction(async (tx) => {
        const transaction = await tx.transactions.findFirst({
            where: {
                eventId,
                userId
            }
        })

        if (!transaction) throw { msg: "user belum membeli tiket" }

        const statusTransaction = await tx.transactionStatus.findFirst({
            where: {
                transactionsId: transaction.id,
                status: "PAID"
            }
        })

        if (!statusTransaction) throw { msg: "user belum melakukan pembayaran" }

        const existingReview = await tx.reviews.findFirst({
            where: {
                eventId,
                userId,
            },
        });

        if (existingReview) throw { msg: "Anda telah memberikan review" }

        await tx.reviews.create({
            data: {
                reviewText: reviewComments,
                feedback,
                rating,
                userId,
                eventId
            }
        })
    }, { timeout: 30000 })
}

export const getReviewUserService = async ({ userId }: any) => {
    const dataReview = await prisma.reviews.findMany({
        where: {
            userId: userId

        },
        include: {
            event: true,
            users: true
        },
    })

    return { dataReview }
}

export const getReviewUserEventService = async ({ id }: any) => {
    const dataReview = await prisma.reviews.findMany({
        where: {
            eventId: Number(id)
        },
        include: {
            event: true,
            users: true
        },
    })
    return { dataReview }
}