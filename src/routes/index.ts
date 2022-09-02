import { Router } from "express";
import cardRouter from "./cardRouter.js";
import rechargeRoute from "./rechargeRouter.js";

const router = Router()

router.use(cardRouter)
router.use(rechargeRoute)

export default router;