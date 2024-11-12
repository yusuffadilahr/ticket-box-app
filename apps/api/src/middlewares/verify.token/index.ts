import { decodeToken } from "../../utils/token.sign";
import { Request, Response, NextFunction } from "express";


export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers

        const token = authorization?.split(' ')[1]
        console.log(token, '<<< verify token');
        
        if (!token) {
            throw { msg: 'Harap melakukan login terlebih dahulu', status: 401 };
        }
        const decodedToken: any = await decodeToken(token)
        console.log(decodedToken, "<<<< decoded")
        req.body!.userId = decodedToken?.data?.id
        req.body!.authorizationRole = decodedToken?.data?.role

        // console.log(req.body)

        next()
    } catch (error) {
        next(error)
    }
}