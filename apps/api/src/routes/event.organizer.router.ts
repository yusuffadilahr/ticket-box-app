import { keepAuthUserOrganizer, resetPasswordOrganizer } from "@/controllers/eventOrganizerController";
import { tokenValidation } from "@/middlewares/verify.token";
import { Router } from "express";

const eventOrganizerRouter = Router()
eventOrganizerRouter.get('/', tokenValidation, keepAuthUserOrganizer)
eventOrganizerRouter.put('/reset', tokenValidation, resetPasswordOrganizer)

export default eventOrganizerRouter