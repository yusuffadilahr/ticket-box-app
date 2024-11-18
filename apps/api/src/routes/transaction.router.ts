import { Router } from "express";
import { tokenValidation } from "@/middlewares/verify.token";
import { uploader } from "@/middlewares/uploader";
import { createTransaction, getTransaction } from "./../controllers/transactionController";

const transactionRouter = Router()

transactionRouter.post('/:id', tokenValidation, createTransaction)
transactionRouter.get('/', tokenValidation, getTransaction)

export default transactionRouter