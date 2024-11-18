import { Router } from "express";
import { handleMidtransNotification } from "./../controllers/midtransController";

const midtransRouter = Router()

midtransRouter.post('/midtrans', handleMidtransNotification)

export default midtransRouter