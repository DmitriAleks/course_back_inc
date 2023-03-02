"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
exports.productsRouter = (0, express_1.Router)({});
let products = [{ id: '1', title: 'tomato' }, { id: '2', title: 'orange' }, { id: '3', title: 'apple' }, { id: '4', title: 'banana' }];
//-------------------GET---------------//
exports.productsRouter.get('/', (req, res) => {
    var _a;
    if (req.query.title) {
        let searchString = (_a = req.query) === null || _a === void 0 ? void 0 : _a.title.toString();
        // const fineProducts = products.filter(p=> p.title === req.query.title)
        const fineProducts = products.filter(p => p.title.indexOf(searchString) > -1);
        res.send(fineProducts);
    }
    else {
        res.send(products);
    }
});
exports.productsRouter.get('/:id', (req, res) => {
    let id = req.params.id;
    let findProducts = products.find(p => p.id === id);
    if (findProducts) {
        res.send(findProducts);
    }
    else {
        res.send(404);
    }
});
//-------------------DELETE---------------//
exports.productsRouter.delete('/:id', (req, res) => {
    if (products.find(p => p.id === req.params.id)) {
        products = products.filter(p => p.id !== req.params.id);
        res.send(204); //No content
    }
    else {
        res.send(404);
    }
});
//-------------------POST---------------//
exports.productsRouter.post('/', (req, res) => {
    const newProduct = { id: (+(new Date())).toString(),
        title: req.body.title };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
//-------------------PUT---------------//
exports.productsRouter.put('/:id', (req, res) => {
    let id = req.params.id;
    let product = products.find(p => p.id === id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
    }
    else {
        res.send(404);
    }
});
//
