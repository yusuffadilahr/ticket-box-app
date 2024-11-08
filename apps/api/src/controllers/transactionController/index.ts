import {Request, Response, NextFunction } from "express";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const createTransaction = async(req:Request, res:Response, next:NextFunction){}
        const { userId, eventId, ticketDetails, usePoints, useReferralDiscount } = req.body;

        try {
            // Calculate initial total price based on tickets
            let totalPrice = 0;
            for (const ticket of ticketDetails) {
                const ticketData = await prisma.tickets.findUnique({ where: { id: ticket.ticketId } });
                totalPrice += ticketData.price * ticket.quantity;
            }

            // Retrieve user points
            let points = 0;
            if (usePoints) {
                const userPoints = await prisma.points.findFirst({
                    where: { userIdRefferalMatch: userId, expiredDate: { gte: new Date() } },
                });
                if (userPoints) points = userPoints.point;
            }

            // Retrieve referral discount
            let referralDiscount = 0;
            if (useReferralDiscount) {
                const referral = await prisma.referalDiscounts.findFirst({
                    where: {
                        userIdRefferal: userId,
                        isUsed: false,
                        expiredDate: { gte: new Date() },
                    },
                });
                if (referral) referralDiscount = referral.discount;
            }

            // Calculate final total price after applying points and discount
            const pointDiscount = points * 0.01; // assuming 1 point = 0.01 currency unit
            totalPrice = Math.max(0, totalPrice - pointDiscount - referralDiscount);

            // Create the transaction
            const transaction = await prisma.transactions.create({
                data: {
                    userId,
                    eventId,
                    totalPrice,
                    transactionDetail: {
                        create: ticketDetails.map((ticket) => ({
                            ticketId: ticket.ticketId,
                            price: ticket.price,
                            quantity: ticket.quantity,
                        })),
                    },
                },
                include: {
                    transactionDetail: true,
                    transactionStatus: true,
                },
            });

            // Deduct points if used
            if (usePoints && points > 0) {
                await prisma.points.update({
                    where: { userIdRefferalMatch: userId },
                    data: { point: 0 }, // or set the reduced point balance if partially used
                });
            }

            // Mark referral as used if applicable
            if (useReferralDiscount && referralDiscount > 0) {
                await prisma.referalDiscounts.updateMany({
                    where: { userIdRefferal: userId, isUsed: false },
                    data: { isUsed: true },
                });
            }

        } catch (error) {
            console.error(error);
        }
    }

    // Additional methods for retrieving, updating, or deleting transactions can be added here
}

