import express, {json} from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import router from "./routes/index.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(json());

server.use(router);
server.use(errorHandler);

const PORT = process.env.PORT || 6002
server.listen(PORT ,()=>{
    console.log(`subiu a porta ${PORT} 
    `)
})  