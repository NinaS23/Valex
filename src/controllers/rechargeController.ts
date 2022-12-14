import { Request, Response } from "express";
import httpStatus from "../utils/httpStatus.js";
import * as rechargeService from "../services/rechargeService.js"

export async function rechargeCard(req: Request, res: Response) {
    const {amount} : {amount : number} = req.body
    const apiKey = req.header('x-api-key');
    const cardId = req.params.id;
    if (!cardId) {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    const num = Number(cardId)
    const isCardRecharge = await rechargeService.rechargeCard(num,apiKey,amount)
    res.status(httpStatus.OK).send(isCardRecharge)
}