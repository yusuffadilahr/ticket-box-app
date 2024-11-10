import { Router } from "express";
import { tokenValidation } from "@/middlewares/verify.token";
import { createReviewUser } from "@/controllers/reviewController";

const reviewRouter = Router()

reviewRouter.post('/', tokenValidation, createReviewUser)

export default reviewRouter