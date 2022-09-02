import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeController.js";
const rechargeRoute = Router()

rechargeRoute.post("/recharge-card/:id", rechargeCard)

export default rechargeRoute;