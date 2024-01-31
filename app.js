import express, { json } from 'express';
import { corsMiddleware } from './middlewares/corsmiddleware.js';
import { createThingRouter } from './routes/thingRoute.js';
import { createUserRouter } from './routes/userRoute.js';
import dotenv from 'dotenv';


export const createApp = ({ ThingController, UserController }) => {
    dotenv.config();
    const app = express();
    app.use(json());
    app.use(corsMiddleware(0));
    app.disable('x-powered-by');

    app.use('/things', createThingRouter({ ThingController }))
    app.use('/auth', createUserRouter({ UserController }));

    
    return app;
}

export const startingApp= (app)=>{
    const PORT = process.env.PORT ?? 3001
    app.listen(PORT, () => {
        console.log('server listening')
    })
    return app;
}