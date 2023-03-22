import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";

export const feedbacksRouter = Router({})

feedbacksRouter.post('/', authMiddleware, async (req, res) => {
    const newProduct = await feedbackService.sendFeedback(req.body.comment, req.user!._id)
    res.status(201).send(newProduct)
})
feedbacksRouter.get('/', async (req,res) => {
    const users = await  feedbackService.allFeedbacks()
    res.send(users)
})