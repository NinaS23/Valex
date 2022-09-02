import joi from "joi";

export const shoppingSchema = joi.object({
    businessId: joi.number().integer().required(),
    cardId: joi.number().integer().required(),
    password: joi.string().required(),
    amount: joi.number().required()
});