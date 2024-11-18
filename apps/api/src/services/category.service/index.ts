import { prisma } from "./../../connection"

export const createCategoryService = async ({ category }: any) => {
    await prisma.category.create({
        data: {
            Category: category
        }
    })

}