import { prisma } from "@/connection";
import { Status } from '@prisma/client'; // Import your enum
import { Request, Response, NextFunction } from "express";


export const handleMidtransNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = req.body;
        console.log(req.body, '<<<<< test notif')
        const transactionStatus = notification.transaction_status;
        const orderId = notification.order_id;

        const transactionRecord = await prisma.transactions.findUnique({
            where: { id: orderId },
            include: {
                transactionDetail:
                {
                    include: {
                        tickets: true
                    }
                }
            },
        });

        if (!transactionRecord) throw { msg: "Transaction not found" };


        let updatedStatus: Status
        if (transactionStatus === "settlement") {
            updatedStatus = "PAID";
        } else if (transactionStatus === "expire") {
            updatedStatus = "EXPIRED";
        } else if (transactionStatus === "cancel") {
            updatedStatus = "CANCELLED";
        } else {
            updatedStatus = "WAITING_FOR_PAYMENT";
        }


        await prisma.transactionStatus.create({
            data: {
                transactionsId: orderId,
                status: updatedStatus,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        });

        

        // for (const detail of transactionRecord.transactionDetail) {
        //     const ticket = detail.tickets;

        //     if (updatedStatus === "WAITING_FOR_PAYMENT") {
        //         await prisma.tickets.update({
        //             where: { id: ticket.id },
        //             data: { seatAvailable: { decrement: detail.quantity } }, // Adjust field as needed
        //         });
        //     } else if (updatedStatus === "CANCELLED" || updatedStatus === "EXPIRED") {
        //         await prisma.tickets.update({
        //             where: { id: ticket.id },
        //             data: { seatAvailable: { increment: detail.quantity } }, // Adjust field as needed
        //         });
        //     }
        // }

        res.status(200).json({
            error: false,
            message: 'Transaksi Berhasil Di-Update',
        });

    } catch (error) {
        next(error);
    }
};