import { Router } from "express";
import { tokenValidation } from "@/middlewares/verify.token";
import { uploader } from "@/middlewares/uploader";
import { createTransaction } from "@/controllers/transactionController";

const transactionRouter = Router()

transactionRouter.post('/:id', tokenValidation, createTransaction)

export default transactionRouter