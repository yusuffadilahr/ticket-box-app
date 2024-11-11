import { prisma } from "@/connection";
import { Status } from '@prisma/client'; // Import your enum
import { Request, Response, NextFunction } from "express";


export const handleMidtransNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = req.body;
        console.log(req.body,'<<<<<')
        // Get transaction status and order ID from the notification
        const transactionStatus = notification.transaction_status;
        const orderId = notification.order_id;

        // Find the transaction in your database using Prisma
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

        // Find the transaction status record in your database
        const transactionStatusRecord = await prisma.transactionStatus.findFirst({
            where: {
                transactionsId: orderId
            },
        });

        if (!transactionStatusRecord) throw { msg: "Transaction status not found" };

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

        await prisma.transactionStatus.update({
            where: { id: transactionStatusRecord.id },
            data: { status: updatedStatus },
        });

        for (const detail of transactionRecord.transactionDetail) {
            const ticket = detail.tickets;

            if (updatedStatus === "PAID" || updatedStatus === "WAITING_FOR_PAYMENT") {
                await prisma.tickets.update({
                    where: { id: ticket.id },
                    data: { seatAvailable: { decrement: detail.quantity } }, // Adjust field as needed
                });
            } else if (updatedStatus === "CANCELLED" || updatedStatus === "EXPIRED") {
                await prisma.tickets.update({
                    where: { id: ticket.id },
                    data: { seatAvailable: { increment: detail.quantity } }, // Adjust field as needed
                });
            }
        }

        res.status(200).json({
            error: false,
            message: 'Transaction status updated successfully',
        });

    } catch (error) {
        next(error);
    }
};