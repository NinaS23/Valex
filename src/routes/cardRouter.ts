import { Router } from "express";
import { createCard } from "../controllers/cardController.js";
const cardRouter = Router()

cardRouter.get("/create-card",createCard )

export default cardRouter;