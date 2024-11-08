import { prisma } from "@/connection";
import fs from 'fs'
import { NextFunction, Request, Response } from "express";

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imagesUpload: any = req.files;
        const { eventName, location, description, isPaid, locationUrl, startEvent, endEvent, categoryId, userId, tickets } = req.body
        const dataArrayTikcet = JSON.parse(tickets)

        await prisma.$transaction(async (tx) => {
            const event = await tx.event.create({
                data: {
                    eventName,
                    location,
                    locationUrl,
                    description,
                    isPaid: Boolean(isPaid),
                    startEvent: new Date(startEvent),
                    endEvent: new Date(endEvent),
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

            const dataTicket = dataArrayTikcet?.map((tik: any) => {
                return {
                    price: Number(tik.price),
                    ticketName: tik.ticketName,
                    ticketType: tik.ticketType,
                    seatAvailable: Number(tik.seatAvailable),
                    eventId: Number(event.id),
                    discount: Number(tik.discount),
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
            message: `Event ${eventName} berhasil ditambahkan!`,
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
            message: "Berhasil menampilkan data event!",
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
                EventOrganizer: true,
                Reviews: true
            }
        })

        if (eventDetail.length == 0) throw { msg: "Event not found", status: 404 }

        res.status(200).json({
            error: false,
            message: "Event Detail berhasil didapatkan!",
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
            message: 'Berhasil menampilkan data event terbaru!',
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
            message: "Berhasil mendapatkan data event terlaris!",
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
            message: 'Berhasil mendapatkan data event berkategori komedi!',
            data: searchEventByCategory
        })

    } catch (error) {
        next(error)
    }
}


// simpan di eventImages Controller
export const getCarousel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataImage = await prisma.eventImages.findMany({
            take: 6,
            include: {
                Events: true
            }
        })

        res.status(200).json({
            error: false,
            message: 'Berhasil mendapatkan data carousel!',
            data: dataImage,
        })
    } catch (error) {
        next(error)
    }
}

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imagesUploaded: any = req?.files
        const { eventName, location, description, isPaid, locationUrl, startEvent, endEvent, categoryId, userId, tickets } = req.body
        const { id } = req.params
        // const dataArrayTikcet = JSON.parse(tickets)
        // const dataArrayTikcet = [tickets] /* tester */
        const dataArrayTikcet = Array.isArray(tickets) ? tickets : JSON.parse(tickets || '[]');

        console.log(dataArrayTikcet, 'datatickets')
        console.log(tickets)

        console.log(req.files)
        console.log(eventName, "<<<<<< event Name");
        console.log(location, "<<<<<< location");


        console.log('<<<<< sampe mana 1')

        await prisma.$transaction(async (tx) => {
            console.log('<<<<< sampe mana 2')
            const updatedEvent = await tx.event.update({
                data: {
                    eventName,
                    location,
                    locationUrl,
                    description,
                    isPaid: Boolean(isPaid),
                    startEvent: new Date(startEvent),
                    endEvent: new Date(endEvent),
                    categoryId: 1, // ini contoh, natni dari body
                    eventOrganizerId: userId
                },
                where: { id: Number(id) }
            })

            console.log('<<<<< sampe mana 3')
            const findEvent = await tx.event.findFirst({
                where: { id: Number(id) },
                include: {
                    EventImages: true,
                }
            })

            console.log('<<<<< sampe mana 4')
            console.log(dataArrayTikcet)
            const dataTicket = dataArrayTikcet?.map((tik: any) => {
                return {
                    price: Number(tik.price),
                    ticketName: tik.ticketName,
                    ticketType: tik.ticketType,
                    // locationUrl: tik.locationUrl,
                    seatAvailable: Number(tik.seatAvailable),
                    eventId: Number(updatedEvent.id),
                    discount: Number(tik.discount),
                    startDate: new Date(tik.startDate),
                    endDate: new Date(tik.endDate),
                }
            })

            // dataArrayTikcet?.forEach(async(tik: any)=> {
            //     await tx.tickets.updateMany({
            //         data: {
            //             price: Number(tik.price),
            //             ticketName: tik.ticketName,
            //             ticketType: tik.ticketType,
            //             // locationUrl: tik.locationUrl,
            //             seatAvailable: Number(tik.seatAvailable),
            //             eventId: Number(updatedEvent.id),
            //             discount: Number(tik.discount),
            //             startDate: new Date(tik.startDate),
            //             endDate: new Date(tik.endDate),
            //         },
            //         where: {eventId: updatedEvent.id}
            //     })
            // })

            // console.log('<<<<< sampe mana 5')
            await tx.tickets.updateMany({
                data: dataTicket,
                where: { eventId: updatedEvent.id }
            })

            console.log('<<<<< sampe mana 6')
            const imagesArr = imagesUploaded?.images?.map((item: any) => {
                return {
                    eventImageUrl: item.filename,
                    eventsId: updatedEvent.id
                }
            })

            console.log('<<<<< sampe mana 7')
            await tx.eventImages.createMany({
                data: imagesArr
            })

            console.log('<<<<< sampe mana 8')

            // findEvent?.EventImages.forEach((item)=> {
            //     fs.rmSync(`src/public/images/${item.eventImageUrl}`)
            // })
        })

        res.status(200).json({
            error: false,
            message: 'Berhasil',
            data: {}
        })

    } catch (error) {
        next(error)
    }
}






export const getOrganizerEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body
        const {
            page = '1',
            limit_data = '8',
            search = '',
        } = req.query;

        const offset = Number(limit_data) * (Number(page) - 1);

        const filters: any = {
            eventOrganizerId: userId,
        };

        if (search) {
            filters.OR = [
                { eventName: { contains: search as string } }, // Adjust field name if necessary
                { location: { contains: search as string } },
            ];
        }

        const eventList = await prisma.event.findMany({
            where: filters,
            include: {
                EventImages: true,
                tickets: true,
                category: true,
                EventOrganizer: true,
            },
            skip: offset,
            take: Number(limit_data),
        });

        const totalCount = await prisma.event.count({ where: filters });
        const totalPage = Math.ceil(totalCount / Number(limit_data));

        if (eventList.length === 0) throw { msg: 'Event not found!', status: 404 }


        res.status(200).json({
            error: false,
            message: "Event berdasarkan data event organizer berhasil ditambahkan!",
            data: { eventList, totalPage }
        })
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { userId } = req.body

        const deletedEvent = await prisma.event.delete({
            where: {
                id: Number(id),
                eventOrganizerId: userId
            },
        });

        await prisma.tickets.deleteMany({
            where: { eventId: deletedEvent.id },
        });
        await prisma.eventImages.deleteMany({
            where: { eventsId: deletedEvent.id },
        });
        
        res.status(200).json({
            error: false,
            message: "Data Berhasil Dihapus!",
            data: {}
        })
    } catch (error) {
        next(error)
    }

};
