import { Request, Response, NextFunction } from "express";
import { mysqlConnection, prisma } from "@/connection";
import { addHours, addMinutes } from "date-fns";


export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, ticketDetails, referralDiscount = 0 , referralPoints = 0 } = req.body
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
            const totalDiscount = item.quantity * item.discount
            totalPembayaran += subtotal
            totalPembayaran -= totalDiscount

            return {
                ticketId: item.ticketId,
                price: subtotal,
                quantity: item.quantity,
                // discount: item.discount,
                discount: totalDiscount,
                expiredAt: addMinutes(new Date(), 1)
            }
        })

        if (referralDiscount) {
            const findUserDiscount = await prisma.referalDiscounts.findFirst({
                where: {
                    userIdRefferal: userId,
                    isUsed: false,
                    // expiredDate: {
                    //     gt: new Date()
                    // }
                }
            })

            if (new Date() >= findUserDiscount?.expiredDate!) throw { msg: 'ERROR', status: 404 }

            if (findUserDiscount) {
                const discountUser = findUserDiscount.discount * totalPembayaran
                totalPembayaran -= discountUser

                await prisma.referalDiscounts.update({
                    where: { id: findUserDiscount.id },
                    data: {
                        isUsed: true,
                        discount: 0
                    }
                })
            }
        }

        if (referralPoints) {
            const findUserRefferal = await prisma.points.findFirst({
                where: {
                    userIdRefferalMatch: userId,
                    // expiredDate: {
                    //     gt: new Date()
                    // }
                }
            })

            if (new Date() >= findUserRefferal?.expiredDate!) throw { msg: 'ERROR', status: 404 }

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
        console.log(dataDetails, "<<< data details")

        const transactionId = await prisma.transactions.create({
            data: {
                eventId: Number(id),
                totalPrice: totalPembayaran,
                userId: userId,
                eventOrganizerId: dataEvent.EventOrganizer.id,
                expiredAt: addMinutes(new Date(), 1),
                // transactionDetail: {
                //     createMany: {
                //         data: dataDetails
                //     }
                // },
                transactionStatus: {
                    create: { status: "WAITING_FOR_PAYMENT" }
                }
            }
        })

        console.log(transactionId, '<<<< id tf')

        const dataArrTransacDetail = dataDetails.map((item: any, i: any) => {
            return {
                transactionsId: transactionId.id,
                ticketId: item.ticketId,
                price: item.price,
                discount: item.discount,
                quantity: item.quantity,
            }
        })
        await prisma.transactionDetail.createMany({
            data: dataArrTransacDetail
        })

        const query = await mysqlConnection()
        await query.query(`
            CREATE EVENT transaction_${transactionId.id}
            ON SCHEDULE AT NOW() + INTERVAL 1 MINUTE
            DO 
            BEGIN
                INSERT INTO transactionstatus (status, transactionsId) VALUES ('EXPIRED', ${transactionId.id});
            END
        `);

        res.status(200).json({
            error: false,
            message: 'Berhasil',
            data: []
        })

    } catch (error) {
        next(error)
    }
}


export const getTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body
        const dataTransaction = await prisma.transactions.findMany({
            where: { userId : userId },
            include: {
                transactionDetail: true,
                event: true,
                transactionStatus:true
            }
        })

        res.status(200).json({
            error: false,
            message: 'Berhasil Mendapatkan Data Transaksi',
            data: dataTransaction
        })

    } catch (err) {
        next(err)
    }
}