import { Request, Response } from "express";
import httpStatus from "../utils/httpStatus.js";
import * as shoppingService from "../services/shoppingService.js"

export async function shoppingCard(req: Request, res: Response) {
    const { password, amount }: { password: string, amount: number } = req.body
    const cardId = req.params.id;
    if (!cardId) {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    const num = Number(cardId)
    const shopping = await shoppingService.shopping(num, password, amount)
    res.status(httpStatus.OK).send(shopping)
}

