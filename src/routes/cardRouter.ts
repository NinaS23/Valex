import { Router } from "express";
import {
     createCard,
     activateCard
    } from "../controllers/cardController.js";
import { validateCardInfo } from "../middlewares/cardMiddleware.js";
const cardRouter = Router()

cardRouter.post("/create-card",validateCardInfo,createCard );
cardRouter.post("/activate-card",activateCard )

export default cardRouter;