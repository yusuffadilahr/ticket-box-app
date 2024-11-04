import { keepAuthUserOrganizer } from "@/controllers/eventOrganizerController";
import { tokenValidation } from "@/middlewares/verify.token";
import { Router } from "express";

const eventOrganizerRouter = Router()
eventOrganizerRouter.get('/event-organizer', tokenValidation, keepAuthUserOrganizer)

export default eventOrganizerRouter