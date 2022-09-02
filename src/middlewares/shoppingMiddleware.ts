import { NextFunction, Request, Response } from "express";
import { shoppingSchema } from "../schemas/shoppingShema.js";

export async function validateShoppingInfo(req: Request, res: Response, next: NextFunction) {
    const {password,amount} : {password : number,amount:number} = req.body
    const cardId = req.params.id;
    
    if(amount  === 0){
        return res.status(401).send("0 não é permitido");
    }
    const { error } = shoppingSchema.validate({cardId,password,amount}, {abortEarly: false});
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}