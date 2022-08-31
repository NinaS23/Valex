import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";

export async function createCard(apiKey: string, employeeId: number, type: cardRepository.TransactionTypes){
    const findAPiKey =  await companyRepository.findByApiKey(apiKey)
    if(!findAPiKey){
        throw {code: "not-found", message:"api-key is not Found"}
    }
    const findEmployer = await employeeRepository.findById(employeeId)
    if(!findEmployer){
        throw {code: "not-found", message:"employer not found"}
    }
    const verifyTypeCard = await cardRepository.findByTypeAndEmployeeId(type,employeeId);
     if(verifyTypeCard !== undefined && verifyTypeCard.type === type){
         throw {code: "unauthorized", message:"you alredy have that type of card"}
     }
}
