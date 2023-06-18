import { CONST } from "../const/const";
import { useCardDetails, useCardsStore } from '../stores/cards'

const renderButton = (val) => {
    const cRegex = /\{\{(button)\|[c]\}\}/g
    const tRegex = /\{\{(button)\|[t]\}\}/g
    const xRegex = /\{\{(button)\|[x]\}\}/g
    let newVal = val
    if (cRegex.test(newVal)) {
        newVal = newVal.replaceAll(cRegex, "〇")
    }
    if (tRegex.test(newVal)) {
        newVal = newVal.replaceAll(tRegex, "△")
    }
    if (xRegex.test(newVal)) {
        newVal = newVal.replaceAll(xRegex, "✕")
    }
    return newVal
}

export const createMonsterCard = (target) => {
    const cardDetails = useCardDetails()
    const cards = useCardsStore()
    let targetCard = {}
    for (let i = 0; i < cards.monsterCards.length; i++) {
        const monsterCard = cards.monsterCards[i];
        if (monsterCard.number == target) {
            targetCard = monsterCard
            break;
        }
    }
    const card = {
        id: target,
        name: targetCard.name,
        level: targetCard.level,
        hp: targetCard.hp,
        pp: targetCard.pp,
        dp: targetCard.dp,
        specialty: targetCard.specialty,
        imgSrc: "src/images/monsters/" + targetCard.number + ".jpg",
        colorTop: "",
        colorBottom: "",
        cAttack: targetCard.c_attack,
        cPow: targetCard.c_pow,
        tAttack: targetCard.t_attack,
        tPow: targetCard.t_pow,
        xAttack: targetCard.x_attack,
        xEffect: renderButton(targetCard.x_effect),
        xEffectSpeed: targetCard.x_effect_speed,
        xPow: targetCard.x_pow,
        support: renderButton(targetCard.support),
        supportSpeed: targetCard.support_speed,
        isPartner: targetCard.isPartner,
    };
    const specialtyList = cardDetails.specialtyList
    for (let index = 0; index < specialtyList.length; index++) {
        const specialty = specialtyList[index];
        if (card.specialty == specialty.specialty) {
            card.colorTop = specialty.topColor;
            card.colorBottom = specialty.bottomColor;
            break;
        }
    }
    return card;
}

export const createOptionCard = (target) => {
    const cards = useCardsStore()
    let targetCard = {}
    for (let i = 0; i < cards.optionCards.length; i++) {
        const optionCard = cards.optionCards[i];
        if (optionCard.number == target) {
            targetCard = optionCard
        }
    }
    const card = {
        ...targetCard,
        id: target,
        name: renderButton(targetCard.name),
        imgSrc: "src/images/options/" + targetCard.number + ".png",
        effect: renderButton(targetCard.effect)
    };
    return card;
}

export const setPenalty = (lvl, val) => {
    const cPen = 2
    const uPen = 4
    if (lvl == CONST.C) {
        return Math.floor(parseInt(val) / cPen)
    } else if (lvl == CONST.U) {
        return Math.floor(parseInt(val) / uPen)
    }
}