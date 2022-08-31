import Cryptr from "cryptr";
import dotenv from "dotenv";
import dayjs from "dayjs";
dotenv.config()

export async function getFullName(fullName: string) {
  const strListName = fullName.trim().split(" ")
  for (let i = 1; i < strListName.length - 1; i++) {
    if (strListName[i].length >= 3) {
      strListName[i] = strListName[i][0]
    } else {
      strListName.splice(i, 1);
    }

  }
  const name = strListName.join(" ");

  return name

}


export async function encryptCardCVC(encode:string){
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const encryptedString = cryptr.encrypt(encode);
  return encryptedString;
}

export async function isCardExpired(date:string){
  const actualDate = dayjs().format("MM-YYYY").toString();

  if(actualDate > date){
    throw{ code: "unauthorized",message: "card is expired"}
   
  }
}

export async function decryptCode(code:any, encode: string ){
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const decrypt = cryptr.decrypt(encode);

  if(decrypt !== code){
    throw{ code: "unauthorized",message: "verify your CVC"}
  }
  
  return true;
}