import { forgotPasswordOrganizer, getFeedbackUser, getReportTransaction, getUserByEvent, resetPasswordOnLogin, resetPasswordOrganizer, sendVerifyEmailUser, updateProfileOrganizer, verifyEmailUser } from "./../controllers/eventOrganizerController";
import { uploader } from "./../middlewares/uploader";
import { tokenValidation } from "./../middlewares/verify.token";
import { Router } from "express";

const eventOrganizerRouter = Router()
eventOrganizerRouter.patch('/reset', tokenValidation, resetPasswordOnLogin)
eventOrganizerRouter.get('/attendee', tokenValidation, getUserByEvent)
eventOrganizerRouter.post('/forgot-password', forgotPasswordOrganizer)
eventOrganizerRouter.patch('/reset-password', tokenValidation, resetPasswordOrganizer)
eventOrganizerRouter.patch('/verify-user', tokenValidation, verifyEmailUser)
eventOrganizerRouter.get('/send-email-verify', sendVerifyEmailUser)
eventOrganizerRouter.get('/feedback', tokenValidation, getFeedbackUser)
eventOrganizerRouter.patch('/u', tokenValidation, uploader, updateProfileOrganizer)
eventOrganizerRouter.get('/report', tokenValidation, getReportTransaction)

export default eventOrganizerRouter