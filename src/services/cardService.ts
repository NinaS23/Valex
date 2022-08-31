import * as companyRepository from "../repositories/companyRepository.js";

export async function createCard(apiKey: string){
    const findAPiKey =  await companyRepository.findByApiKey(apiKey)

    if(!findAPiKey){
        throw {code: "not-found", message:"api-key is not Found"}
    }
  
  
}
