import { prisma } from "@/connection"
import { cloudinaryUpload } from "@/utils/cloudinary"
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