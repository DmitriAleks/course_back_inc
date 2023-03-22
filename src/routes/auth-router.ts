import {Request, Response, Router} from "express";
import {jwtService} from "../jwt-service";


export const authRouter = Router({})

authRouter.post('/login', async (req: Request, res: Response) => {
    const user = await UserService.checUser()
    if(user){
        const token = await jwtService.createJWT(user)
        res.status(200).send(token)
    }else{
        res.sendStatus(401)
    }
})