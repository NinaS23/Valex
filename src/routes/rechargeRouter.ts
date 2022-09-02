import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeController.js";
import { validateRechargeInfo } from "../middlewares/rechargeMiddleware.js";
const rechargeRoute = Router()

rechargeRoute.post("/recharge-card/:id",validateRechargeInfo, rechargeCard)

export default rechargeRoute;