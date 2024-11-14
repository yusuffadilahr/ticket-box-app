import { forgotPasswordOrganizer, getUserByEvent, resetPasswordOnLogin, resetPasswordOrganizer, sendVerifyEmailUser, verifyEmailUser } from "@/controllers/eventOrganizerController";
import { tokenValidation } from "@/middlewares/verify.token";
import { Router } from "express";

const eventOrganizerRouter = Router()
// eventOrganizerRouter.get('/', tokenValidation, keepAuthUserOrganizer)
eventOrganizerRouter.patch('/reset', tokenValidation, resetPasswordOnLogin)
eventOrganizerRouter.get('/attendee', tokenValidation, getUserByEvent)
eventOrganizerRouter.post('/forgot-password', forgotPasswordOrganizer)
eventOrganizerRouter.patch('/reset-password', tokenValidation, resetPasswordOrganizer)
eventOrganizerRouter.patch('/verify-user', tokenValidation, verifyEmailUser)
eventOrganizerRouter.get('/send-email-verify', sendVerifyEmailUser)

export default eventOrganizerRouter