import { Router } from "express";
import {
    createCard,
    activateCard,
    viewCard,
    viewTransectionAndBalance,
    blockCard,
    unlockCard
} from "../controllers/cardController.js";
import { validateCardInfo } from "../middlewares/cardMiddleware.js";
const cardRouter = Router()

cardRouter.post("/create-card", validateCardInfo, createCard);
cardRouter.post("/activate-card", activateCard);
cardRouter.post("/view-card", viewCard);
cardRouter.get("/view-transections/:id", viewTransectionAndBalance);
cardRouter.post("/block-card", blockCard);
cardRouter.post("/unlock-card", unlockCard);

export default cardRouter;