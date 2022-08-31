import * as employeeRepository from "../repositories/employeeRepository.js";

export async function getFullName(employeeId: number) {
  const findEmployerName = await employeeRepository.findById(employeeId)
  const strListName = findEmployerName.fullName.trim().split(" ")

  for (let i = 1; i < strListName.length - 1; i++) {
    if (strListName[i].length >= 3) {
      strListName[i] = strListName[i][0]
    } else {
      strListName.splice(i, 1);
    }

  }

  const name = strListName.join(" ");
  console.log(name)

}