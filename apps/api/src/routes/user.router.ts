import { keepAuthUser, updateProfileUser } from "@/controllers/userController";
import { uploader } from "@/middlewares/uploader";
import { tokenValidation } from "@/middlewares/verify.token";
import { Router } from "express";

const userRouter = Router()
userRouter.get('/user-profile', tokenValidation, keepAuthUser)
userRouter.patch('/user-profile', tokenValidation, uploader, updateProfileUser)

export default userRouter
