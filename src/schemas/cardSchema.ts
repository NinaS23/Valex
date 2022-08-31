import joi from "joi";

export const cardSchema = joi.object({
    apiKey: joi.string().required(),
    employeeId: joi.number().required()
});