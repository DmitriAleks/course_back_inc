"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_router_1 = require("./routes/products-router");
const addresses_router_1 = require("./routes/addresses-router");
const app = (0, express_1.default)();
const parserMiddleware = (0, body_parser_1.default)({}); //Необходим что спрасить боди у реквеста
app.use(parserMiddleware);
app.use('/products', products_router_1.productsRouter); //Теперь когда у нас роут начинается на products мы дергаем productsRouter
app.use('/addresses', addresses_router_1.addressesRouter);
const port = 3000;
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
let customMidleware = (req, res, next) => {
    //@ts-ignore
    req.bananaColor = 'yellow';
    next();
};
app.get('/banana', customMidleware, (req, res) => {
    //@ts-ignore
    res.send({ colorBanana: req.bananaColor });
});
//Если хотим что бы customMidleware был виден глобально(ко всем запросам), то указываем
app.use(customMidleware);
//ЕЩе пример мидлевеера для защиты
const authGuardMiddleware = (req, res, next) => {
    if (req.query.token === '123') { // Если токен совпадает я пропущу вниз по цепочку, если нет то прекращу работу и верну ошибку
        next();
    }
    else {
        res.send(401);
    }
};
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
