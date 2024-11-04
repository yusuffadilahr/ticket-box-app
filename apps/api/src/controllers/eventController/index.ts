import { prisma } from "@/connection";
import fs from 'fs'
import { NextFunction, Request, Response } from "express";

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imagesUpload: any = req.files;
        const { eventName, location, description, isPaid, startEvent, endEvent, artist, categoryId, userId, tickets } = req.body
        const dataArrayTikcet = [tickets]

        await prisma.$transaction(async (tx) => {
            const event = await tx.event.create({
                data: {
                    eventName,
                    location,
                    description,
                    isPaid: Boolean(isPaid),
                    startEvent: new Date(startEvent),
                    endEvent: new Date(endEvent),
                    artist,
                    eventOrganizerId: userId,
                    categoryId: Number(categoryId)
                }
            })

            const imagesArr = imagesUpload?.images?.map((item: any) => {
                return {
                    eventImageUrl: item.filename,
                    eventsId: event.id
                }
            })

            await tx.eventImages.createMany({
                data: imagesArr
            })

            const dataTicket = dataArrayTikcet.map((tik: any) => {
                return {
                    price: Number(tik.price),
                    ticketName: tik.ticketName,
                    ticketType: tik.ticketType,
                    seatAvailable: Number(tik.seatAvailable),
                    eventId: Number(event.id),
                    version: tik.version,
                    discount: Number(tik.discount),
                    discountStart: new Date(tik.discountStart),
                    discountExpiry: new Date(tik.discountExpiry),
                    startDate: new Date(tik.startDate),
                    endDate: new Date(tik.endDate),
                }
            })

            await tx.tickets.createMany({
                data: dataTicket
            })
        })

        res.status(201).json({
            error: false,
            message: 'Berhasil',
            data: {}
        })

    } catch (error) {
        const imagesUpload: any = req.files

        imagesUpload?.images.forEach((itm: any) => {
            fs.rmSync(itm.path)
        })
        next(error)
    }
}

export const findEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { event,
            page = '1',
            limit_data = '8',
            category,
            minPrice,
            maxPrice,
            location,
            dateFrom,
            dateUntil,
        } = req.query;

        const offset = Number(limit_data) * (Number(page) - 1);

        const whereConditions = {
            AND: [
                event ? {
                    OR: [
                        { eventName: { contains: event as string } },
                        { artist: { contains: event as string } },
                        { location: { contains: event as string } },
                    ]
                } : {},

                category ? { categoryId: Number(category) } : {},

                (minPrice !== undefined && !isNaN(Number(minPrice))) ? {
                    tickets: {
                        some: {
                            price: { gte: Number(minPrice) }
                        }
                    }
                } : {},

                (maxPrice !== undefined && !isNaN(Number(maxPrice))) ? {
                    tickets: {
                        some: {
                            price: { lte: Number(maxPrice) }
                        }
                    }
                } : {},

                location ? { location: { contains: location as string } } : {},
                dateFrom ? { startEvent: { gte: new Date(dateFrom as string) } } : {},

                dateUntil ? { endEvent: { lte: new Date(dateUntil as string) } } : {},
            ].filter(item => Object.keys(item).length) // Remove empty conditions
        };

        const eventSearch = await prisma.event.findMany({
            where: whereConditions,
            include: {
                EventImages: true,
                tickets: true,
                category: true
            },
            take: Number(limit_data),
            skip: offset
        });

        const totalCount = await prisma.event.count({
            where: whereConditions
        });

        const totalPage = Math.ceil(Number(totalCount) / Number(limit_data));

        if (eventSearch.length === 0 && event) {
            throw { msg: 'Event tidak tersedia', status: 404 };
        }

        res.status(200).json({
            error: false,
            message: "Berhasil menampilkan data",
            data: { eventSearch, totalPage }
        });
    } catch (error) {
        next(error);
    }
};

export const findEventDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const eventDetail = await prisma.event.findMany({
            where: {
                id: Number(id)
            },
            include: {
                EventImages: true,
                tickets: true,
                category: true,
                EventOrganizer: true
            }
        })

        if (!eventDetail.length) throw { msg: "Event not found", status: 404 }

        res.status(200).json({
            error: false,
            message: "Event Detail Retrieved!",
            data: eventDetail
        })

    } catch (error) {
        next(error)
    }

}

export const getNewestEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchEventByStartEvent = await prisma.event.findMany({
            take: 10,
            orderBy: [{
                startEvent: 'asc'
            }],
            include: {
                EventImages: true,
                tickets: true
            }
        })
        if (!searchEventByStartEvent.length) throw { msg: 'Data tidak ada', status: 404 }

        res.status(200).json({
            error: false,
            message: 'Berhasil menampilkan data',
            data: searchEventByStartEvent
        })
    } catch (error) {
        next(error)
    }
}


export const getBestSellingEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bestSellingEvents = await prisma.event.findMany({
            take: 10,
            orderBy: {
                Transactions: {
                    _count: 'desc'
                }
            },
            include: {
                EventImages: true,
                tickets: true
            }
        })

        if (!bestSellingEvents.length) throw { msg: 'Data tidak tersedia', status: 404 }
        res.status(200).json({
            error: false,
            message: "Top 5 best-selling events retrieved successfully",
            data: bestSellingEvents
        })
    } catch (error) {
        next(error)
    }
}

export const getComedyEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchEventByCategory = await prisma.event.findMany({
            take: 4,
            where: { categoryId: 4 },
            include: {
                EventImages: true,
                tickets: true
            }
        })
        if (!searchEventByCategory.length) throw { msg: 'Data tidak ada', status: 404 }

        res.status(200).json({
            error: false,
            message: 'Berhasil menampilkan data',
            data: searchEventByCategory
        })

    } catch (error) {
        next(error)
    }
}