import { Request, Response, NextFunction } from "express";
import { mysqlConnection, prisma } from "@/connection";
import { addHours, addMinutes } from "date-fns";
// import coreApi from "@/utils/midtransInstance/midtransInstance";
import snap from "@/utils/midtransInstance/midtransInstance";

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, ticketDetails, referralDiscount = 0, referralPoints = 0 } = req.body
        const { id } = req.params

        const dataUser = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })


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

            // if (item.quantity > ticket.seatAvailable) throw { msg: `Tiket yang dibeli dengan id = ${item.ticketId} melebihi kuota`, status: 400 };


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
                expiredAt: addHours(new Date(), 7)
            }
        })

        if (referralDiscount) {
            const findUserDiscount = await prisma.referalDiscounts.findFirst({
                where: {
                    userIdRefferal: userId,
                    isUsed: false,
                }
            })

            if (addHours(new Date(), 7) >= findUserDiscount?.expiredDate!) throw { msg: 'ERROR', status: 404 }

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


                }
            })

            if (addHours(new Date(), 7) >= findUserRefferal?.expiredDate!) throw { msg: 'ERROR', status: 404 }

            if (findUserRefferal) {
                const totalPoints = findUserRefferal?.point - referralPoints

                totalPembayaran = Math.max(totalPembayaran - referralPoints, 0)
                await prisma.points.update({
                    where: { id: findUserRefferal.id },
                    data: {
                        point: totalPoints,
                    }

                })
            }
        }


        if (totalPembayaran == 0) {
            const transactionId = await prisma.transactions.create({
                data: {
                    eventId: Number(id),
                    totalPrice: totalPembayaran,
                    userId: userId,
                    eventOrganizerId: dataEvent.EventOrganizer.id,
                    expiredAt: addHours(new Date(), 7),
                    transactionStatus: {
                        create: { status: "PAID" }
                    }
                }
            })

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

            for (const item of ticketDetails) {
                await prisma.tickets.update({
                    where: { id: item.ticketId },
                    data: { seatAvailable: { decrement: item.quantity } }
                });
            }

            res.status(200).json({
                error: false,
                message: 'Berhasil Melakukan Pembayaran',
                data: {}
            })

        } else {

            const transactionId = await prisma.transactions.create({
                data: {
                    eventId: Number(id),
                    totalPrice: totalPembayaran,
                    userId: userId,
                    eventOrganizerId: dataEvent.EventOrganizer.id,
                    expiredAt: addHours(new Date(), 7),
                    transactionStatus: {
                        create: { status: "WAITING_FOR_PAYMENT" }
                    }
                }
            })



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

            for (const item of ticketDetails) {
                await prisma.tickets.update({
                    where: { id: item.ticketId },
                    data: { seatAvailable: { decrement: item.quantity } }
                });
            }



            const query = await mysqlConnection()
            await query.query(`
   

            CREATE EVENT transaction_${transactionId.id}
            ON SCHEDULE AT NOW() + INTERVAL 15 MINUTE
            DO 
            BEGIN
                INSERT INTO transactionstatus (status, transactionsId, updatedAt) VALUES ('EXPIRED', '${transactionId.id}', utc_timestamp());
            END;
        `);


            const paymentToken = await snap.createTransaction({
                payment_type: 'bank_transfer',

                transaction_details: {
                    order_id: transactionId.id.toString(),
                    gross_amount: totalPembayaran,
                },
                customer_details: {
                    first_name: dataUser?.firstName,
                    email: dataUser?.email,
                    phone: dataUser?.phoneNumber,
                }
            });

            res.status(200).json({
                error: false,
                message: 'Berhasil Melakukan Pembayaran',
                data: { paymentToken }
            })
        }

    } catch (error) {
        next(error)
    }
}


export const getTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body
        const dataTransaction = await prisma.transactions.findMany({
            where: { userId: userId },
            include: {
                transactionDetail: true,
                event: {
                    include: {
                        Reviews: {
                            where: { userId: userId }
                        },
                    },
                },
                transactionStatus: true
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