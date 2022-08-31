import Cryptr from "cryptr";
import dotenv from "dotenv";
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