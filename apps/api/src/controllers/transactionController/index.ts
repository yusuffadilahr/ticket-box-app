import { Request, Response, NextFunction } from "express";
import { mysqlConnection, prisma } from "@/connection";
import { addHours, addMinutes } from "date-fns";


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
                expiredAt: addHours(new Date(), 1)
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
                expiredAt: await addMinutes(new Date(), 15),
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
                quantity: item.quantity,
            }
        })
        await prisma.transactionDetail.createMany({
            data: dataArrTransacDetail
        })

        const query = await mysqlConnection()
        await query.query(`
            CREATE EVENT transaction_${transactionId.id}
            ON SCHEDULE AT NOW() + INTERVAL 15 MINUTE
            DO 
            BEGIN
                INSERT INTO transaction_statuses (status, transactionsId) VALUES ('EXPIRED', ${transactionId.id});
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