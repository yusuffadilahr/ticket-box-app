import { Router } from "express";
import { tokenValidation } from "@/middlewares/verify.token";
import { createReviewUser, getReviewUser } from "@/controllers/reviewController";

const reviewRouter = Router()

reviewRouter.post('/', tokenValidation, createReviewUser)
reviewRouter.get('/:id', tokenValidation, getReviewUser)

export default reviewRouter