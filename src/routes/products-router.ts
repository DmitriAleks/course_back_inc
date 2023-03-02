import {Request, Response, Router} from "express";

export const productsRouter = Router({})

let products = [{id: '1',title: 'tomato'}, {id: '2',title: 'orange'}, {id: '3',title: 'apple'}, {id: '4',title: 'banana'}]

//-------------------GET---------------//
productsRouter.get('/', (req:Request, res:Response) => {
    if(req.query.title){
        let searchString = req.query?.title.toString();
        // const fineProducts = products.filter(p=> p.title === req.query.title)
        const fineProducts = products.filter(p=> p.title.indexOf(searchString) > -1)
        res.send(fineProducts)
    } else {
        res.send(products)
    }
})
productsRouter.get('/:id', (req:Request, res:Response) => {
    let id = req.params.id
    let findProducts = products.find(p=> p.id === id)
    if(findProducts){
        res.send(findProducts)
    } else {
        res.send(404)
    }
})
//-------------------DELETE---------------//
productsRouter.delete('/:id', (req:Request, res:Response) => {
    if(products.find(p=> p.id ===  req.params.id)){
        products = products.filter(p=> p.id !== req.params.id)
        res.send(204) //No content
    } else {
        res.send(404)
    }
})
//-------------------POST---------------//
productsRouter.post('/', (req:Request, res:Response) => {
    const newProduct = {id: (+(new Date())).toString(), //генерация ид, дату в число, число в строку
        title: req.body.title}
    products.push(newProduct)

    res.status(201).send(newProduct)
})
//-------------------PUT---------------//
productsRouter.put('/:id', (req:Request, res:Response) => {
    let id = req.params.id
    let product = products.find(p=> p.id === id)
    if(product){
        product.title = req.body.title
        res.send(product)
    } else {
        res.send(404)
    }
})
//