import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-router";

const app = express()

const parserMiddleware = bodyParser({}) //Необходим что спрасить боди у реквеста
app.use(parserMiddleware)
app.use('/products', productsRouter) //Теперь когда у нас роут начинается на products мы дергаем productsRouter
app.use('/addresses', addressesRouter)

const port = 3000



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


