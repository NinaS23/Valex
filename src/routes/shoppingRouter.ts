import { Router } from "express";
import { shoppingCard } from "../controllers/shoppingController.js";

const shoppingRouter = Router()

shoppingRouter.post("/shopping/:id", shoppingCard )

export default shoppingRouter;