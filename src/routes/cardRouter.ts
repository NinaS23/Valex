import { Router } from "express";
import {
     createCard,
     activateCard,
     viewCard
    } from "../controllers/cardController.js";
import { validateCardInfo } from "../middlewares/cardMiddleware.js";
const cardRouter = Router()

cardRouter.post("/create-card",validateCardInfo,createCard );
cardRouter.post("/activate-card",activateCard );
cardRouter.post("/view-card",viewCard );

export default cardRouter;