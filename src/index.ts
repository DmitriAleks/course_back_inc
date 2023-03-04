import express, {NextFunction, Request, Response} from 'express'
import bodyParser from "body-parser";
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-router";

const app = express()

const parserMiddleware = bodyParser({}) //Необходим что спрасить боди у реквеста
app.use(parserMiddleware)
app.use('/products', productsRouter) //Теперь когда у нас роут начинается на products мы дергаем productsRouter
app.use('/addresses', addressesRouter)

const port = 3000

//___________________________________ Про midlleweare ________________________//
// app.get('/products', (req: Request, res: Response, next: NextFunction) => { //2 параметр можно использовать как миддлвеер.
// //@ts-ignore
//     req.blabla = 'Privet'// тут мы обработаем и создадем новое поле, но мы не покинем этот колбек если ниже не вызовем функцию next()
//     next()// эта функция позволит пройти по цепочке ниже
// }, (req: Request, res: Response) => {
//     //@ts-ignore
// const blala = req.blabla;
//     res.send({value: blala})//ничего не вернет т.к. req.blabla не существует, но мы можем указать во 2 колбеке
//     //мидллвеер который создаст нам такое поле
// }) // Красивый пример ниже

let customMidleware =  (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    req.bananaColor = 'yellow'
    next()
}
app.get('/banana', customMidleware, (req: Request, res: Response) => {
    //@ts-ignore
 res.send({colorBanana: req.bananaColor})
})
//Если хотим что бы customMidleware был виден глобально(ко всем запросам), то указываем
app.use(customMidleware)
//ЕЩе пример мидлевеера для защиты
const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.token === '123') { // Если токен совпадает я пропущу вниз по цепочку, если нет то прекращу работу и верну ошибку
        next()
    } else {
        res.send(401)
    }

}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


