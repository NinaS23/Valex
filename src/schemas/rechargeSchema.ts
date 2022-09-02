import joi from "joi";

export const rechargeSchema = joi.object({
    apiKey: joi.string().required(),
    cardId: joi.number().integer().required(),
    amount: joi.number().required()
});