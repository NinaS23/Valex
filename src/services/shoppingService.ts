import * as businessesRepository from "../repositories/businessRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as cardUtils from "../utils/cardUtils.js";

export async function rechargeCard(cardId: number, password:string, amount:number) {
    const paymentBussines = await findPayment(cardId)
    const card = await cardRepository.findById(cardId);
    await cardUtils.isCardActivade(card.password);
    await cardUtils.isCardExpired(card.expirationDate);
    await cardUtils.decryptCode(password, card.password);
    if (card.isBlocked === true) {
        throw { code: "unauthorized", message: "your card is blocked"}
    }
    const isBussinesRegistered = await businessesRepository.findById(paymentBussines[0].businessId)
    await checkBussinesInfo(isBussinesRegistered, card.type)
    const businessId = isBussinesRegistered.id
    await getBalance(cardId,amount)
        await paymentRepository.insert({cardId, businessId , amount}); 
        return {shopping:"shopping done"}
}

async function findPayment(id:number) {
    const cardPayment = await paymentRepository.findByCardId(id)
    if(cardPayment.length === 0){
        throw { code: "not-found", message: "card was not found"}
    }
    return cardPayment;
}

async function checkBussinesInfo(bussines:any, cardType:string) {
    if(!bussines){
        throw { code: "unauthorized", message: "bussines is not allowed"}
      }
      console.log(bussines)
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