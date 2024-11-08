import { createCategory, getCategoryEvents } from "@/controllers/categoryController";
import { Router } from "express";

const categoryRouter = Router()
categoryRouter.post('/', createCategory)
categoryRouter.get('/', getCategoryEvents)

export default categoryRouter