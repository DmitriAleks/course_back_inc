import {Request, Response, Router} from "express";

export const addressesRouter = Router({})

const addresses = [{id: '1', value: 'Nezalejnasti 12'}, {id: '2', value: 'Selickaga 12'}]


//-------------------GET---------------//
addressesRouter.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})

addressesRouter.get('/', (req:Request, res:Response) => {
    res.send(addresses)
})
addressesRouter.get('/:id', (req:Request, res:Response) => {
    let id = req.params.id
    let findAddress = addresses.find(a=> a.id === id)
    if(findAddress){
        res.send(findAddress)
    } else {
        res.send(404)
    }
})