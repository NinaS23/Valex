import { Request, Response } from "express";
import httpStatus from "../utils/httpStatus.js";
import * as rechargeService from "../services/rechargeService.js"

export async function shoppingCard(req: Request, res: Response) {
    const {password,amount} : {password : number,amount:number} = req.body
    const cardId = req.params.id;
    if (!cardId) {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    const num = Number(cardId)

    res.sendStatus(httpStatus.OK)
}