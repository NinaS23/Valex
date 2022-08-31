import * as companyRepository from "../repositories/companyRepository.js";

export async function createCard(apiKey : string){
   const findAPiKey =  await companyRepository.findByApiKey(apiKey)
   console.log(findAPiKey)
}
