import { NextFunction, Request, Response } from "express";
import { rechargeSchema } from "../schemas/rechargeSchema.js";

export async function validateRechargeInfo(req: Request, res: Response, next: NextFunction) {
    const {amount} : {amount : number} = req.body
    const apiKey = req.header('x-api-key');
    const cardId = req.params.id;
    
    if(amount  === 0){
        return res.status(401).send("0 não é permitido");
    }
    const { error } = rechargeSchema.validate({apiKey, cardId, amount}, {abortEarly: false});
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}