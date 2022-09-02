import joi from "joi";

export const shoppingSchema = joi.object({
    cardId: joi.number().integer().required(),
    password: joi.string().required(),
    amount: joi.number().required()
});