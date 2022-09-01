import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as cardUtils from "../utils/cardUtils.js";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import { faker } from '@faker-js/faker';

export async function createCard(apiKey: string, employeeId: number, type: cardRepository.TransactionTypes) {
    const findAPiKey = await companyRepository.findByApiKey(apiKey)
    if (!findAPiKey) {
        throw { code: "not-found", message: "api-key is not Found" }
    }
    const findEmployer = await employeeRepository.findById(employeeId)
    if (!findEmployer) {
        throw { code: "not-found", message: "employer not found" }
    }
    const verifyTypeCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if (verifyTypeCard) {
        throw { code: "unauthorized", message: "you alredy have that type of card" }
    }

    const employerName = await cardUtils.getFullName(findEmployer.fullName);
    const cardNumber = faker.finance.creditCardNumber();
    const expirationDate = dayjs().add(5, 'year').format("MM-YYYY");
    const code = faker.random.numeric(3);
    const cryptCode = await cardUtils.encryptCardCVC(code)

    const card: cardRepository.CardInsertData = {
        employeeId: employeeId,
        number: cardNumber,
        cardholderName: employerName,
        securityCode: cryptCode,
        expirationDate: expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type
    }//mudar na ativação
    await cardRepository.insert(card);

    return card;
}


export async function activateCard(cardId: number, password: string, CVC: number) {
    const card = await cardRepository.findById(cardId);
    if (!card) {
        throw { code: "not-found", message: "card was not found" }
    }
    if (card.password !== null) {
        throw { code: "unauthorized", message: "password alredy exist" }
    }
    await cardUtils.isCardExpired(card.expirationDate);
    await cardUtils.decryptCode(CVC, card.securityCode);
    await cardUtils.verifyPassword(password, cardId)

}

export async function viewCard(employeeId: number, password: string) {
    const cryptr = new Cryptr(process.env.CRYPTR_KEY);
    const cardArr = []
    const result = await cardRepository.findByEmployeeId(employeeId)

    if (!result || !password) {
        throw { code: "not-found", message: "not found" }
    }
    if (password.length !== 4) {
        throw { code: "unauthorized", message: "verify your password" }
    }
    result.filter(card => {
        if (card.password !== null && cryptr.decrypt(card.password) === password) {
            const cvc = cryptr.decrypt(card.securityCode)
            const actualDate = dayjs().format("MM-YYYY").toString();

            if (actualDate > card.expirationDate) {
                throw { code: "unauthorized", message: "card is expired" }

            }
            const cards = {
                number: card.number,
                cardholderName: card.cardholderName,
                expirationDate: card.expirationDate,
                securityCode: cvc
            }
            cardArr.push(cards)
        }

    });

    return { cards: cardArr };
}


export async function viewTransectionAndBalance(cardId: number) {
    const card = await cardRepository.findById(cardId);
    if (!card) {
        throw { code: "not-found", message: "card was not found" }
    }
    const shopping = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);

    if (shopping.length === 0 || recharges.length === 0) {
        throw { code: "no-content", message: "no recharges or transections found" }
    }
    const balance = await cardUtils.calcBalance(recharges, shopping)
    return {
        balance,
        shopping,
        recharges
    }
}