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
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
