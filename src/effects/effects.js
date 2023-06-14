import { usePlayerActiveCardsStore } from "@/stores/playerActiveCards";

const reduceHp = (who, amount) => {
    if (who == "Player") {
        return amount
    }
}

const mult3 = (who, amount) => {
    if (who == "Player") {
        return amount * 3
    }
}
const setCpow = (who, amount) => {
    if (who == "Player") {
        return amount
    }
}

const all = [
    {
        id: 227,
        effect: (a, b) => {
            const store = usePlayerActiveCardsStore()
            const newHp = reduceHp(a, b)
            store.setHp(newHp)
            const cPow = store.cPow
            const tPow = store.tPow
            const xPow = store.xPow
            const newCpow = mult3(a, cPow)
            const newTpow = mult3(a, tPow)
            const newXpow = mult3(a, xPow)
            store.setCpow(newCpow)
            store.setTpow(newTpow)
            store.setXpow(newXpow)
        }
    }
]

export default all 