"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_repository_1 = require("../repositoires/products-repository");
exports.productsRouter = (0, express_1.Router)({});
//-------------------GET---------------//
exports.productsRouter.get('/', (req, res) => {
    var _a, _b;
    const foundProducts = products_repository_1.productsRepository.findProducts((_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.title) === null || _b === void 0 ? void 0 : _b.toString());
    res.send(foundProducts);
});
exports.productsRouter.get('/:id', (req, res) => {
    const product = products_repository_1.productsRepository.getProductById(req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
//-------------------DELETE---------------//
exports.productsRouter.delete('/:id', (req, res) => {
    const isDeleted = products_repository_1.productsRepository.deleteProduct(req.params.id);
    if (isDeleted) {
        res.send(204); //No content
    }
    else {
        res.send(404);
    }
});
//-------------------POST---------------//
exports.productsRouter.post('/', (req, res) => {
    const newProduct = products_repository_1.productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
});
//-------------------PUT---------------//
exports.productsRouter.put('/:id', (req, res) => {
    const isUpdate = products_repository_1.productsRepository.updateProduct(req.params.id, req.body.title);
    if (isUpdate) {
        const product = products_repository_1.productsRepository.findProducts(req.params.id);
        res.send(product);
    }
    else {
        res.send(404);
    }
});
//
