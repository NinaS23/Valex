import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js"

export async function createCard(apiKey: string, employeeId: number){
    const findAPiKey =  await companyRepository.findByApiKey(apiKey)
    if(!findAPiKey){
        throw {code: "not-found", message:"api-key is not Found"}
    }
    const findEmployer = await employeeRepository.findById(employeeId)
    if(!findEmployer){
        throw {code: "not-found", message:"employer not found"}
    }
}
