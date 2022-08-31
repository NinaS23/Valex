import { Router } from "express";
import { createCard } from "../controllers/cardController.js";
import { validateCardInfo } from "../middlewares/cardMiddleware.js";
const cardRouter = Router()

cardRouter.post("/create-card",validateCardInfo,createCard )

export default cardRouter;