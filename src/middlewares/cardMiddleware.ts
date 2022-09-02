import { NextFunction, Request, Response } from "express";
import { cardSchema } from "../schemas/cardSchema.js";
import * as cardRepository from "../repositories/cardRepository.js";
import httpStatus from "../utils/httpStatus.js";


export async function validateCardInfo(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header('x-api-key');
    const {employeeId, type} : {employeeId:number, type: cardRepository.TransactionTypes } = req.body;
   
    const { error } = cardSchema.validate({apiKey,employeeId,type}, {abortEarly: false});
   
    if (error) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.details.map(detail => detail.message));
    }

    next();
}