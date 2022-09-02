import * as businessesRepository from "../repositories/businessRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as cardUtils from "../utils/cardUtils.js";

export async function rechargeCard(cardId: number, password:string, amount:number) {
  const cardPayment = await paymentRepository.findByCardId(cardId)
  if(cardPayment.length === 0){
      throw { code: "not-found", message: "card was not found"}
  }
  const card = await cardRepository.findById(cardId);
  await cardUtils.isCardActivade(card.password);
  await cardUtils.isCardExpired(card.expirationDate);
  await cardUtils.decryptCode(password,card.password);
  if(card.isBlocked === true){
    throw { code: "unauthorized", message: "your card is blocked"}
  }
  const isBussinesRegistered = await businessesRepository.findById(cardPayment[0].businessId)
  if(!isBussinesRegistered){
    throw { code: "unauthorized", message: "bussines is not allowed"}
  }
  console.log(isBussinesRegistered)
    if (isBussinesRegistered.type !== card.type) {
        throw { code: "unauthorized", message: "type is diferent" }
    }
    const businessId = isBussinesRegistered.id
    const transactions = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);
    const balance = await cardUtils.calcBalance(recharges,transactions)
   
        if(balance < amount){
            throw { code: "unauthorized", message: "balance cant cover acount"}
        }
        await paymentRepository.insert({cardId, businessId , amount}); 
        return {shopping:"shopping done"}
}