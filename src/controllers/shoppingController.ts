import { Request, Response } from "express";
import httpStatus from "../utils/httpStatus.js";
import * as shoppingService from "../services/shoppingService.js"

export async function shoppingCard(req: Request, res: Response) {
    const { password, amount, businessId }: { password: string, amount: number,  businessId:number } = req.body
    const cardId = req.params.id;
    if (!cardId) {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    const num = Number(cardId)
    const shopping = await shoppingService.shopping(num, password, amount,  businessId)
    res.status(httpStatus.OK).send(shopping)
}

