import {Request, Response, Router} from "express";
import {productsRepository} from "../repositoires/products-repository";

export const productsRouter = Router({})


//-------------------GET---------------//
productsRouter.get('/', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProducts(req.query?.title?.toString())
    res.send(foundProducts)
})
productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = productsRepository.getProductById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
//-------------------DELETE---------------//
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(req.params.id)
    if (isDeleted) {
        res.send(204) //No content
    } else {
        res.send(404)
    }
})
//-------------------POST---------------//
productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})
//-------------------PUT---------------//
productsRouter.put('/:id', (req: Request, res: Response) => {
    const isUpdate = productsRepository.updateProduct(req.params.id, req.body.title)
    if (isUpdate) {
        const product = productsRepository.findProducts(req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})
//