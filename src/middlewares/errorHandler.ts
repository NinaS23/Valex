import httpStatus from "../utils/httpStatus.js";

export default async function errorHandler(error, req, res, next) {
   if(error.code === "not-found"){
    return res.status(httpStatus.NOT_FOUND).send(error.message)
   }
   if(error.code === "unauthorized"){
    return res.status(httpStatus.UNAUTHORIZED).send(error.message)
   }
   if(error.code === "no-content"){
    return res.status(httpStatus.NO_CONTENT).send(error.message)
   }
    res.sendStatus(500)
    console.log(error)
  }