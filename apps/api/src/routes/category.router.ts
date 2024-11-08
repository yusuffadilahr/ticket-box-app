import { createCategory, getCategory } from "@/controllers/categoryController";
import { Router } from "express";

const categoryRouter = Router()
categoryRouter.post('/', createCategory)
categoryRouter.get('/', getCategory)

export default categoryRouter