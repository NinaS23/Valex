import { Request, Response } from "express";
import httpStatus from "../utils/httpStatus.js";
import * as cardService from "../services/cardService.js";
import * as cardRepository from "../repositories/cardRepository.js";

export async function createCard(req:Request,res: Response){
    const apiKey = req.header('x-api-key');
    const {employeeId, type} : {employeeId:number, type: cardRepository.TransactionTypes} = req.body;

    const card = await cardService.createCard(apiKey,employeeId,type);
  console.log(card)

    res.status(httpStatus.OK).send(card)
}