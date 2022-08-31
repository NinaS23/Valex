import { Request, Response } from "express";
import httpStatus from "../utils/httpStatus.js";
import * as cardService from "../services/cardService.js";
import * as cardRepository from "../repositories/cardRepository.js";

export async function createCard(req:Request,res: Response){
    const apiKey = req.header('x-api-key');
    const {employeeId, type} : {employeeId:number, type: cardRepository.TransactionTypes} = req.body;

    const card = await cardService.createCard(apiKey,employeeId,type);

    res.status(httpStatus.CREATED).send(card)
}

export async function activateCard(req:Request,res: Response) {
    const {cardId,password,CVC } : {cardId : number, password: string, CVC: number} = req.body;
    await cardService.activateCard(cardId,password,CVC);

    res.sendStatus(httpStatus.OK)
}


export async function viewCard(req:Request,res: Response) {
    const {password,employeeId} : {password : string,employeeId:number} = req.body;
    await cardService.viewCard(employeeId,password);
    res.sendStatus(httpStatus.OK)
}