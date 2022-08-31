import { NextFunction, Request, Response } from "express";
export default function schemaValidator(schema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
         throw {code: 'bad-request', message: "verify your informations"}
      }
  
      next();
    };
  }