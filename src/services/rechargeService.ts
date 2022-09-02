import * as companyRepository from "../repositories/companyRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";

export async function rechargeCard(cardId: number, apiKey:string, amount:number) {
    const isApiKeyValid = await companyRepository.findByApiKey(apiKey)
    if (!isApiKeyValid) {
        throw { code: "not-found", message: "api-key is not Found" }
    }
    const card = await cardRepository.findById(cardId);
    if (!card) {
        throw { code: "not-found", message: "card was not found" }
    }
}