import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req) // проверка работы после валидатора
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    else {
        next()
    }
}