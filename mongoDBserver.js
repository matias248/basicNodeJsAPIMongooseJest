import { createApp, startingApp } from "./app.js"

import { ThingController } from "./controllers/mongodb/thingController.js"
import { connectionDB } from "./mongooseinitDB.js"

import { UserController } from './controllers/mongodb/userController.js';

const app=createApp({ ThingController, UserController })
startingApp(app);
connectionDB();

