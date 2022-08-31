
export default async function errorHandler(error, req, res, next) {
   if(error.code === "not-found"){
    return res.status(404).send(error.message)
   }
   if(error.code === "unauthorized"){
    return res.status(401).send(error.message)
   }
    res.sendStatus(500)
    console.log(error)
  }