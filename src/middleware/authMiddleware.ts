import {NextFunction, Request, Response} from "express";
import {jwtService} from "../jwt-service";


export const authMiddleware  = async  (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) {
        res.send(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(token)
    if(userId){
        req.user = await usersService.findUserById(user.id) // присвваиваем в реквест юзер ид
        next()
    }
    res.send(401)
}