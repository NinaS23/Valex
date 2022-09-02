import * as companyRepository from "../repositories/companyRepository.js";

export function mapObjectToUpdateQuery({ object, offset = 1 }) {
  const objectColumns = Object.keys(object)
    .map((key, index) => `"${key}"=$${index + offset}`)
    .join(",");
  const objectValues = Object.values(object);

  return { objectColumns, objectValues };
}


export async function validateApiKey(apiKey:string) {
  const isApiKeyValid = await companyRepository.findByApiKey(apiKey)
  if (!isApiKeyValid) {
      throw { code: "not-found", message: "api-key is not Found" }
  }

}
