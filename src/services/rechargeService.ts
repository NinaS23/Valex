import * as companyRepository from "../repositories/companyRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as cardUtils from "../utils/cardUtils.js";

export async function rechargeCard(cardId: number, apiKey:string, amount:number) {
    const isApiKeyValid = await companyRepository.findByApiKey(apiKey)
    if (!isApiKeyValid) {
        throw { code: "not-found", message: "api-key is not Found" }
    }
    const findRechargeCard = await rechargeRepository.findByCardId(cardId);
    if (!findRechargeCard) {
        throw { code: "not-found", message: "card was not found" }
    }
    const card = await cardRepository.findById(cardId);
    await cardUtils.isCardActivade(card.password)
    await cardUtils.isCardExpired(card.expirationDate)

}