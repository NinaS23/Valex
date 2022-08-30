import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js"


dotenv.config();

const server = express();
server.use(json());
server.use(cors());

server.use(router);

const PORT = process.env.PORT || 6002
server.listen(PORT ,()=>{
    console.log(`subiu a porta ${PORT} 
    `)
})  