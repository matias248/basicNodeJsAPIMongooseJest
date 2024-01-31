import { Router } from "express";
import {authMiddleware} from "../middlewares/auth.js"


export const createThingRouter = ({ ThingController }) => {
    const thingsRouter = Router()
    const thingController = new ThingController();


    thingsRouter.get('/', authMiddleware, thingController.getAll)
    thingsRouter.post('/',authMiddleware, thingController.create)
    thingsRouter.get('/:id',authMiddleware, thingController.getById)
    thingsRouter.delete('/:id',authMiddleware, thingController.delete)
    thingsRouter.patch('/:id', authMiddleware,thingController.update)

    return thingsRouter;
}