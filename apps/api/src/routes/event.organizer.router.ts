import { forgotPasswordOrganizer, getUserByEvent, resetPasswordOrganizer } from "@/controllers/eventOrganizerController";
import { tokenValidation } from "@/middlewares/verify.token";
import { Router } from "express";

const eventOrganizerRouter = Router()
// eventOrganizerRouter.get('/', tokenValidation, keepAuthUserOrganizer)
eventOrganizerRouter.put('/reset', tokenValidation, resetPasswordOrganizer)
eventOrganizerRouter.get('/attendee', tokenValidation, getUserByEvent)
eventOrganizerRouter.post('/forgot-password', forgotPasswordOrganizer)
eventOrganizerRouter.patch('/reset-password', tokenValidation, resetPasswordOrganizer)

export default eventOrganizerRouter