import { createEvent, findEvent, findEventDetail, getBestSellingEvent, getComedyEvent, getNewestEvent } from "@/controllers/eventController";
import { Router } from "express";
import { tokenValidation } from "@/middlewares/verify.token";
import { uploader } from "@/middlewares/uploader";

const eventRouter = Router()

eventRouter.post('/new-event', tokenValidation, uploader, createEvent)
eventRouter.get('/search', findEvent)
eventRouter.get('/detail/:id', findEventDetail)
eventRouter.get('/newest-event', getNewestEvent)
eventRouter.get('/bestseller-event', getBestSellingEvent)
eventRouter.get('/comedy-event', getComedyEvent)

export default eventRouter