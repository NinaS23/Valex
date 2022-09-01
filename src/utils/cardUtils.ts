import Cryptr from "cryptr";
import dotenv from "dotenv";
import dayjs from "dayjs";
import { update } from "../repositories/cardRepository.js";
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

  if(actualDate < date){
    throw{ code: "unauthorized",message: "card is expired"}
   
  }
}

export async function decryptCode(code:any, encode: string ){
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const decrypt = cryptr.decrypt(encode);

  if(decrypt !== code){
    throw { code: "unauthorized", message: "verify your key" }
  }
}

export async function verifyPassword(password: string, cardId: number) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  if (password.length === 4) {
    const encryptPass = cryptr.encrypt(password)
    await update(cardId, { password: encryptPass });
  } else {
    throw { code: "unauthorized", message: "your password must be 4 characters " }
  }
}


export async function calcBalance(rechages: any, transactions: any) {
  let amountR: number = 0
  let amountT: number = 0

  rechages.forEach(e => {
    return amountR += e.amount;
  })
  transactions.forEach(e => {
    return amountT += e.amount;
  })

  let balance: number = amountR = amountT;
  return balance
}