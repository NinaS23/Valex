import * as employeeRepository from "../repositories/employeeRepository.js";

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