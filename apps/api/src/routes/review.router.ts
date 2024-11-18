import { Router } from "express";
import { tokenValidation } from "./../middlewares/verify.token";
import { createReviewUser, getReviewUser, getReviewUserEvent } from "./../controllers/reviewController";

const reviewRouter = Router()

reviewRouter.post('/', tokenValidation, createReviewUser)
reviewRouter.get('/', tokenValidation, getReviewUser)
reviewRouter.get('/event/:id', tokenValidation, getReviewUserEvent)

export default reviewRouter