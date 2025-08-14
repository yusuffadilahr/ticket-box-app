import { decodeToken } from "../../utils/token.sign";
import { Request, Response, NextFunction } from "express";


export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers

        const token = authorization?.split(' ')[1]
        
        if (!token) {
            throw { msg: 'Harap melakukan login terlebih dahulu', status: 401 };
        }
        const decodedToken: any = await decodeToken(token)
        req.body!.userId = decodedToken?.data?.id
        req.body!.authorizationRole = decodedToken?.data?.role


        next()
    } catch (error) {
        next(error)
    }
}