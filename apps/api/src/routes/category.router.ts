import { createCategory } from "@/controllers/categoryController";
import { Router } from "express";

const categoryRouter = Router()
categoryRouter.post('/', createCategory)

export default categoryRouter