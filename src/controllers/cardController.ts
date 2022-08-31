import { Request, Response } from "express";
import httpStatus from "../utils/httpStatus.js";
import * as cardService from "../services/cardService.js"

export async function createCard(req:Request,res: Response){
    const apiKey = req.header('x-api-key');
    const {employeeId} : {employeeId:number} = req.body;

    await cardService.createCard(apiKey,employeeId);

    res.sendStatus(httpStatus.OK)
}