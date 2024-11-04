// import { userRegister, userLogin, eventOrganizerLogin, eventOrganizerRegister, keepAuthUser, keepAuthUserOrganizer, getPointUser } from "@/controllers/authController";
import { findEvent } from "@/controllers/eventController";
import { tokenValidation } from "@/middlewares/verify.token";
import { Router } from "express";
import { forgotPassword, getPointUser, resetPassword, resetPasswordProfile, userLogin, userRegister } from "@/controllers/userController";
import { eventOrganizerLogin, eventOrganizerRegister, keepAuthUserOrganizer } from "@/controllers/eventOrganizerController";

const authRouter = Router()
authRouter.post('/register/user', userRegister)
authRouter.post('/login/user', userLogin)
authRouter.post('/register/event-organizer', eventOrganizerRegister)
authRouter.post('/login/event-organizer', eventOrganizerLogin)
authRouter.post('/forgot-password', forgotPassword)
authRouter.patch('/reset-password', tokenValidation, resetPassword)
authRouter.patch('/reset-password-profile', tokenValidation, resetPasswordProfile)

// points
authRouter.get('/points-user', tokenValidation, getPointUser) // masukin ke keeplogin
authRouter.get('/search-all-filter', findEvent) // tester untuk di event

export default authRouter