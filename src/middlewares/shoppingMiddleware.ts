import { NextFunction, Request, Response } from "express";
import { shoppingSchema } from "../schemas/shoppingShema.js";
import httpStatus from "../utils/httpStatus.js";

export async function validateShoppingInfo(req: Request, res: Response, next: NextFunction) {
    const {password,amount,businessId} : {password : number,amount:number,businessId:number} = req.body
    const cardId = req.params.id;
    
    if(amount  === 0){
        return res.status(httpStatus.UNAUTHORIZED).send("amout 0 is not allowed");
    }
    const { error } = shoppingSchema.validate({cardId,password,amount,businessId}, {abortEarly: false});
    if (error) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.details.map(detail => detail.message));
    }

    next();
}