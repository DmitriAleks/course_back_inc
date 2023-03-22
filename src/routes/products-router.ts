import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {productsService} from "../domain/porducts.sever";

export const productsRouter = Router({})

//Валидатор добавляем как мидлвеер, дальнейшая проверка происходит в след колбеке
const titleValidation = body('title').trim().isLength({min: 3, max: 30}).withMessage('Custom error')

//-------------------GET---------------//
productsRouter.get('/', async (req: Request, res: Response) => {
    const foundProducts = await productsService.findProducts(req.query?.title?.toString())
    res.send(foundProducts)
})
productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product = await productsService.getProductById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
//-------------------DELETE---------------//
productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await productsService.deleteProduct(req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
//-------------------POST---------------//
productsRouter.post('/', titleValidation, inputValidationMiddleware,
   async (req: Request, res: Response) => {
        const newProduct = await productsService.createProduct(req.body.title)
        res.status(201).send(newProduct)
    })
//-------------------PUT---------------//
productsRouter.put('/:id', titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isUpdate = await productsService.updateProduct(req.params.id, req.body.title)
    if (isUpdate) {
        const product = await productsService.findProducts(req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})
//20-48