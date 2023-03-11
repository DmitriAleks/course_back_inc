import {Request, Response, Router} from "express";
import {productsInMemoryRepository} from "../repositoires/products-db-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";

export const productsRouter = Router({})

//Валидатор добавляем как мидлвеер, дальнейшая проверка происходит в след колбеке
const titleValidation = body('title').trim().isLength({min: 3, max: 30}).withMessage('Custom error')

//-------------------GET---------------//
productsRouter.get('/', async (req: Request, res: Response) => {
    const foundProducts = await productsInMemoryRepository.findProducts(req.query?.title?.toString())
    res.send(foundProducts)
})
productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product = await productsInMemoryRepository.getProductById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
//-------------------DELETE---------------//
productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await productsInMemoryRepository.deleteProduct(req.params.id)
    if (isDeleted) {
        res.send(204) //No content
    } else {
        res.send(404)
    }
})
//-------------------POST---------------//
productsRouter.post('/', titleValidation, inputValidationMiddleware,
   async (req: Request, res: Response) => {
        // проверка работы после валидатора

        const newProduct = await productsInMemoryRepository.createProduct(req.body.title)
        res.status(201).send(newProduct)
    })
//-------------------PUT---------------//
productsRouter.put('/:id', titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isUpdate = await productsInMemoryRepository.updateProduct(req.params.id, req.body.title)
    if (isUpdate) {
        const product = await productsInMemoryRepository.findProducts(req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})
//20-48