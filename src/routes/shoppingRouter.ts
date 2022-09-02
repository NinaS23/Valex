import { Router } from "express";
import { shoppingCard } from "../controllers/shoppingController.js";
import { validateShoppingInfo } from "../middlewares/shoppingMiddleware.js";

const shoppingRouter = Router()

shoppingRouter.post("/shopping/:id",validateShoppingInfo, shoppingCard )

export default shoppingRouter;