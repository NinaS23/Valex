import { Request, Response } from "express";
import httpStatus from "../utils/httpStatus.js";

export async function createCard(req:Request,res: Response){
    res.sendStatus(httpStatus.OK)
}