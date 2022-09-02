import { NextFunction, Request, Response } from "express";
import { rechargeSchema } from "../schemas/rechargeSchema.js";
import httpStatus from "../utils/httpStatus.js";

export async function validateRechargeInfo(req: Request, res: Response, next: NextFunction) {
    const {amount} : {amount : number} = req.body
    const apiKey = req.header('x-api-key');
    const cardId = req.params.id;
    
    if(amount  === 0){
        return res.status(httpStatus.UNAUTHORIZED).send("amout 0 is not allowed");
    }
    const { error } = rechargeSchema.validate({apiKey, cardId, amount}, {abortEarly: false});
    if (error) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.details.map(detail => detail.message));
    }

    next();
}