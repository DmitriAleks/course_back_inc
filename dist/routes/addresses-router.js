"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRouter = void 0;
const express_1 = require("express");
exports.addressesRouter = (0, express_1.Router)({});
const addresses = [{ id: '1', value: 'Nezalejnasti 12' }, { id: '2', value: 'Selickaga 12' }];
//-------------------GET---------------//
exports.addressesRouter.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.addressesRouter.get('/', (req, res) => {
    res.send(addresses);
});
exports.addressesRouter.get('/:id', (req, res) => {
    let id = req.params.id;
    let findAddress = addresses.find(a => a.id === id);
    if (findAddress) {
        res.send(findAddress);
    }
    else {
        res.send(404);
    }
});
