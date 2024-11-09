import { Request, Response, NextFunction } from "express";
import { prisma, mysqlConnection } from "@/connection";
import { addMinutes } from 'date-fns'

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, ticketDetails, referralDiscount, referralPoints } = req.body
        const { id } = req.params

        const dataEvent = await prisma.event.findUnique({
            where: { id: Number(id) },
            include: {
                tickets: true,
                EventOrganizer: true
            }
        })

        if (!dataEvent) throw { msg: "Event tidak ditemukan", status: 404 }

        let totalPembayaran = 0;
        const dataDetails = ticketDetails?.map((item: any, i: any) => {
            const subtotal = item.quantity * item.price
            totalPembayaran += subtotal

            return {
                ticketId: item.ticketId,
                price: subtotal,
                quantity: item.quantity,
            }
        })



        if (referralDiscount) {
            const findUserDiscount = await prisma.referalDiscounts.findFirst({
                where: {
                    userIdRefferal: userId,
                    isUsed: false,
                    expiredDate: {
                        gt: new Date()
                    }
                }
            })

            if (findUserDiscount) {
                const discountUser = findUserDiscount.discount * totalPembayaran
                totalPembayaran -= discountUser
            }
        }

        if (referralPoints) {
            const findUserRefferal = await prisma.points.findFirst({
                where: {
                    userIdRefferalMatch: userId,
                    expiredDate: {
                        gt: new Date()
                    }
                }
            })

            if (findUserRefferal) {
                const totalPoints = findUserRefferal?.point

                totalPembayaran = Math.max(totalPembayaran - totalPoints, 0)
                await prisma.points.update({
                    where: { id: findUserRefferal.id },
                    data: {
                        point: 0,
                    }

                })
            }
        }

        const transactionId = await prisma.transactions.create({
            data: {
                eventId: Number(id),
                totalPrice: totalPembayaran,
                userId: userId,
                eventOrganizerId: dataEvent.EventOrganizer.id,
                expiredAt: await addMinutes(new Date(), 15),
                transactionDetail: {
                    createMany: dataDetails
                },
                transactionStatus: {
                    create: { status: "WAITING_FOR_PAYMENT" }
                }
            }
        })

        const query = await mysqlConnection()
        await query.query(`
            CREATE EVENT transaction_${transactionId.id}
            ON SCHEDULE AT NOW() + INTERVAL 1 MINUTE
            DO 
            BEGIN
                INSERT INTO transaction_statuses (status, transactionsId) VALUES ('EXPIRED', ${transactionId.id});
            END
        `);


        // await prisma.transactionDetail.createMany({
        //     data: transactionDetailUser
        // })
        // console.log(transactionDetailUser)

    } catch (error) {
        next(error)
    }
}