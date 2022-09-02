import * as companyRepository from "../repositories/companyRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as cardUtils from "../utils/cardUtils.js";

export async function rechargeCard(cardId: number, password:string, amount:number) {
  const cardPayment = await paymentRepository.findByCardId(cardId)
  if(cardPayment.length === 0){
      throw { code: "not-found", message: "card was not found"}
  }
  const card = await cardRepository.findById(cardId);
  await cardUtils.isCardActivade(card.password);
  await cardUtils.isCardExpired(card.expirationDate);
  if(card.isBlocked === true){
    throw { code: "unauthorized", message: "your card is blocked"}
  }

}