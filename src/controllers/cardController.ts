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
    const cardView = await cardService.viewCard(employeeId,password);
    res.status(httpStatus.OK).send(cardView)
}

export async function viewTransectionAndBalance(req:Request,res: Response) {
    const cardId = req.params.id;
    if (!cardId ) {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    const num = Number(cardId)
    const balanceAndTransections = await cardService.viewTransectionAndBalance(num)

    res.status(httpStatus.OK).send(balanceAndTransections)
}

export async function blockCard(req: Request, res: Response) {
    const { password, cardId }: { password: string, cardId: number } = req.body;
    const isBlocked = await cardService.blockCard(cardId, password);

    res.status(httpStatus.OK).send(isBlocked)
}

export async function unlockCard(req: Request, res: Response) {
    const { password, cardId }: { password: string, cardId: number } = req.body;
    const isBlocked = await cardService.unlockCard(cardId, password);

    res.status(httpStatus.OK).send(isBlocked)
}
