import { findEvent } from "./../controllers/eventController";
import { tokenValidation } from "./../middlewares/verify.token";
import { Router } from "express";
import { forgotPassword, resetPassword, resetPasswordProfile, signInWithGoogle, userLogin, userRegister } from "./../controllers/userController";
import { eventOrganizerLogin, eventOrganizerRegister } from "./../controllers/eventOrganizerController";

const authRouter = Router()
authRouter.post('/register/user', userRegister)
authRouter.post('/login/user', userLogin)
authRouter.post('/login/auth-google', signInWithGoogle)
authRouter.post('/register/event-organizer', eventOrganizerRegister)
authRouter.post('/login/event-organizer', eventOrganizerLogin)
authRouter.post('/forgot-password', forgotPassword)
authRouter.patch('/reset-password', tokenValidation, resetPassword)
authRouter.patch('/reset-password-profile', tokenValidation, resetPasswordProfile)

// points
authRouter.get('/search-all-filter', findEvent) // tester untuk di event

export default authRouter