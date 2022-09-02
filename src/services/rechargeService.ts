import * as companyRepository from "../repositories/companyRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as cardUtils from "../utils/cardUtils.js";
import * as sqlUtils from "../utils/sqlUtils.js";

export async function rechargeCard(cardId: number, apiKey:string, amount:number) {
    await sqlUtils.validateApiKey(apiKey)    
    const card = await cardRepository.findById(cardId);
    await cardUtils.isCardActivade(card.password)
    await cardUtils.isCardExpired(card.expirationDate)

    await rechargeRepository.insert({cardId,amount})

    return {rechage: "your card is recharged"}

}