import * as businessesRepository from "../repositories/businessRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as cardUtils from "../utils/cardUtils.js";

export async function shopping(cardId: number, password: string, amount: number, businessId:number) {
    const card = await cardRepository.findById(cardId);
    const bussines = await findBussiness(businessId);
    const isBussinesRegistered = await businessesRepository.findById(bussines.id);

    await cardUtils.isCardActivade(card.password);
    await cardUtils.isCardExpired(card.expirationDate);
    await cardUtils.decryptCode(password, card.password);
    await checkBussinesInfo(isBussinesRegistered, card.type)
    await getBalance(cardId, amount);
   
    if (card.isBlocked === true) {
        throw { code: "unauthorized", message: "your card is blocked" }
    }

    await paymentRepository.insert({ cardId, businessId, amount });
    return { shopping: "shopping done" }
}

async function findBussiness(id:number) {
    const business = await businessesRepository.findById(id)
    console.log(business)
    if(!business){
        throw { code: "not-found", message: "Bussiness was not found"}
    }
    return business;
}

async function checkBussinesInfo(bussines:any, cardType:string) {
    if(!bussines){
        throw { code: "unauthorized", message: "bussines is not allowed"}
      }
        if (bussines.type !== cardType) {
            throw { code: "unauthorized", message: "type is diferent" }
        }
}

async function getBalance(id:number,amount:number) {
    const transactions = await paymentRepository.findByCardId(id);
    const recharges = await rechargeRepository.findByCardId(id);
  
    const balance = await cardUtils.calcBalance(recharges, transactions)
        if(balance < amount){
            throw { code: "unauthorized", message: "balance cant cover acount"}
        }
}

