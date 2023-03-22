import jwt from 'jsonwebtoken'
import {settings} from "./settings";

export const jwtService = {


    async createJWT(user: any){
        const token = jwt.sign({userId: user.id}, settings.JWT_secret, {expiresIn: '1h'})
       return token

    },

    async getUserIdByToken(token:string) {
        try {
            const result:any = jwt.verify(token, settings.JWT_secret)
             return new Object(result.userId)
        } catch (error) {
            return null
        }
    }
}