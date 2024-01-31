import { Router } from "express";


export const createUserRouter = ({ UserController }) => {
    const thingsRouter = Router()
    const thingController = new UserController();

    thingsRouter.post('/signup', thingController.signup)
    thingsRouter.post('/login', thingController.login)

    return thingsRouter;
}