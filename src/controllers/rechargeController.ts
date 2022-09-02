import { Request, Response } from "express";
import httpStatus from "../utils/httpStatus.js";
import * as rechargeService from "../services/rechargeService.js"


export async function rechargeCard(req: Request, res: Response) {
    const {amount} : {amount : number} = req.body
    const apiKey = req.header('x-api-key');
    const cardId = req.params.id;
    if (!cardId) {
        return res.sendStatus(401);
    }
    const num = Number(cardId)
    await rechargeService.rechargeCard(num,apiKey,amount)
    res.sendStatus(httpStatus.OK)
}