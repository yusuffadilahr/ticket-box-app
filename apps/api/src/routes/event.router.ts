import { createEvent, findEvent, findEventDetail, getBestSellingEvent, updateEvent,getComedyEvent, getNewestEvent, getOrganizerEvent, deleteEvent } from "./../controllers/eventController";
import { Router } from "express";
import { tokenValidation } from "./../middlewares/verify.token";
import { uploader } from "./../middlewares/uploader";
import { getCarousel } from "./../controllers/eventController";

const eventRouter = Router()

eventRouter.post('/new-event', tokenValidation, uploader, createEvent)
eventRouter.get('/search', findEvent)
eventRouter.get('/detail/:id', findEventDetail)
eventRouter.get('/newest-event', getNewestEvent)
eventRouter.get('/bestseller-event', getBestSellingEvent)
eventRouter.get('/comedy-event', getComedyEvent)
eventRouter.get('/carousel-images', getCarousel)
eventRouter.get('/organizer-event', tokenValidation, getOrganizerEvent)
eventRouter.put('/updates-event/:id', tokenValidation, uploader, updateEvent)
eventRouter.delete('/delete-event/:id', tokenValidation, deleteEvent)

export default eventRouter