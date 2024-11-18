import { prisma } from "@/connection";
import { NextFunction, Request, Response } from "express";
import { createEventService, deleteEventService, findEventDetailService, findEventService, getBestSellingEventService, getComedyEventService, getNewestEventService, getOrganizerEventService, updateEventService } from "@/services/event.service";


export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imagesUpload: any = req.files;
        const { eventName, location, description, isPaid, locationUrl, startEvent, endEvent, categoryId, userId, tickets } = req.body
        const dataArrayTikcet = JSON.parse(tickets)

        await createEventService({
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
        })

        res.status(201).json({
            error: false,
            message: `Event ${eventName} berhasil ditambahkan!`,
            data: {}
        })

    } catch (error) {
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

        const dataFindEvent = await findEventService({
            event,
            page,
            limit_data,
            category,
            minPrice,
            maxPrice,
            location,
            dateFrom,
            dateUntil
        })

        res.status(200).json({
            error: false,
            message: "Berhasil menampilkan data event!",
            data: {
                totalPage: dataFindEvent?.totalPage,
                eventSearch: dataFindEvent?.eventDataWithDetails,
            }
        });

    } catch (error) {
        next(error);
    }
};

export const findEventDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const eventDetail = await findEventDetailService({ id })

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
        const dataNewest = await getNewestEventService()

        res.status(200).json({
            error: false,
            message: 'Berhasil menampilkan data event terbaru!',
            data: dataNewest?.eventDataNewest
        })
    } catch (error) {
        next(error)
    }
}


export const getBestSellingEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataBestSelling = await getBestSellingEventService()

        res.status(200).json({
            error: false,
            message: 'Berhasil mendapatkan data event terlaris!',
            data: dataBestSelling?.eventDataBestSelling,
        });
    } catch (error) {
        next(error);
    }
}

export const getComedyEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataComedyEvent = await getComedyEventService()

        res.status(200).json({
            error: false,
            message: 'Berhasil mendapatkan data event berkategori komedi!',
            data: dataComedyEvent?.eventDataComedy
        })

    } catch (error) {
        next(error)
    }
}


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
        const { eventName, location, description, isPaid, locationUrl, startEvent, endEvent, categoryId, userId } = req.body
        const { id } = req.params

        await updateEventService({
            imagesUploaded,
            eventName, location, description, isPaid, locationUrl, startEvent, endEvent, categoryId, userId,
            id
        })

        res.status(200).json({
            error: false,
            message: 'Berhasil merubah data event!',
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

        const dataUser = await getOrganizerEventService({
            page,
            limit_data,
            search,
            userId
        })

        res.status(200).json({
            error: false,
            message: "Event berdasarkan data event organizer berhasil ditambahkan!",
            data: dataUser?.eventList.length === 0 ? {} : { eventList: dataUser?.eventList, totalPage: dataUser?.totalPage }
        })
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { userId } = req.body

        await deleteEventService({
            id, userId
        })

        res.status(200).json({
            error: false,
            message: "Data Berhasil Dihapus!",
            data: {}
        })
    } catch (error) {
        next(error)
    }

};
