import { Router } from "express";
import cardRouter from "./cardRouter.js";
import rechargeRoute from "./rechargeRouter.js";
import shoppingRouter from "./shoppingRouter.js";

const router = Router()

router.use(cardRouter);
router.use(rechargeRoute);
router.use(shoppingRouter);

export default router;