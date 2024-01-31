import { createApp, startingApp } from "./app.js"

import { ThingController } from "./controllers/local/thingController.js"
import { UserController } from './controllers/local/userController.js';



export const LocalApp = () => createApp({ ThingController, UserController })
const app=LocalApp();
startingApp(app);

