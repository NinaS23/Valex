import { NextFunction, Request, Response } from "express";
import { cardSchema } from "../schemas/cardSchema.js";

export async function validateCardInfo(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header('x-api-key');
    
    const { error } = cardSchema.validate({apiKey}, {abortEarly: false});

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}