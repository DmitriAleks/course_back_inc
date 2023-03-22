import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";


export const userRouter = Router({})


userRouter.get('/', async (req: Request, res: Response) => {

})