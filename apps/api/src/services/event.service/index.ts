import { prisma } from "@/connection"
import { cloudinaryUpload } from "@/utils/cloudinary"
import { Prisma } from "@prisma/client"
import { addHours } from "date-fns"

export const createEventService = async ({
    eventName,
    location,
    locationUrl,
    description,
    isPaid,
    startEvent,
    endEvent,
    userId,
    categoryId,
    imagesUpload,
    dataArrayTikcet
}: any) => {
    await prisma.$transaction(async (tx: any) => {
        const event = await tx.event.create({
            data: {
                eventName,
                location,
                locationUrl,
                description,
                isPaid: Boolean(isPaid),
                startEvent: addHours(new Date(startEvent), 7),
                endEvent: addHours(new Date(endEvent), 7),
                eventOrganizerId: userId,
                categoryId: Number(categoryId)
            }
        })

        const imagesArr = await Promise.all(imagesUpload?.images?.map(async (item: any) => {
            const result: any = await cloudinaryUpload(item?.buffer)

            return {
                eventImageUrl: result?.res,
                eventsId: event?.id
            }
        }))

        await tx.eventImages.createMany({
            data: imagesArr
        })

        if (dataArrayTikcet.length == 0) throw { msg: 'tiket wajib diisi', status: 400 }
        const dataTicket = dataArrayTikcet?.map((tik: any) => {
            return {
                price: Number(tik?.price),
                ticketName: tik?.ticketName,
                ticketType: tik?.ticketType,
                totalSeat: Number(tik?.seatAvailable),
                seatAvailable: Number(tik?.seatAvailable),
                eventId: Number(event?.id),
                discount: Number(tik?.discount),
                startDate: addHours(new Date(tik?.startDate), 7),
                endDate: addHours(new Date(tik?.endDate), 7),
            }
        })

        await tx.tickets.createMany({
            data: dataTicket
        })
    })
}

export const findEventDetailService = async ({ id }: any) => {
    return await prisma.event.findMany({
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
}

export const findEventService = async ({
    event,
    page,
    limit_data,
    category,
    minPrice,
    maxPrice,
    location,
    dateFrom,
    dateUntil
}: any) => {
    const offset = Number(limit_data) * (Number(page) - 1);
    const whereConditions = {
        AND: [
            event ? {
                OR: [
                    { eventName: { contains: event as string, mode: 'insensitive' as Prisma.QueryMode } },
                    { location: { contains: event as string, mode: 'insensitive' as Prisma.QueryMode } },
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
        ].filter(item => Object.keys(item).length)
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


    const eventDataWithDetails = eventSearch.map(event => {
        let minPriceForEvent: number | null = null;
        event.tickets.forEach(ticket => {
            if (minPriceForEvent === null || ticket.price < minPriceForEvent) {
                minPriceForEvent = ticket.price;
            }
        });

        let totalSeatsAvailable = 0;
        event.tickets.forEach(ticket => {
            totalSeatsAvailable += ticket.seatAvailable;
        });

        return {
            ...event,
            minimumPrice: minPriceForEvent,
            seatAvailability: totalSeatsAvailable,
        };
    });



    const totalCount = await prisma.event.count({
        where: whereConditions
    });

    const totalPage = Math.ceil(Number(totalCount) / Number(limit_data));

    // if (eventSearch.length === 0 && event) {
    //     throw { msg: 'Event tidak tersedia', status: 404 };
    // }

    if (eventDataWithDetails.length === 0 && event) {
        throw { msg: 'Event tidak tersedia', status: 404 };
    }

    return {
        totalPage,
        eventDataWithDetails
    }
}