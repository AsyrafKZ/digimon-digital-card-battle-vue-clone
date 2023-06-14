import { defineStore } from "pinia";
import { CONST } from "../const/const"

export const useCardsStore = defineStore('cards', {
    state: () => ({
        allCards: [],
        monsterCards: [],
        optionCards: [],
    }),
    actions: {
        async getAllCards() {
            await this.getMonsterCards()
            this.allCards.push(...this.monsterCards)
            await this.getOptionCards()
            this.allCards.push(...this.optionCards)
        },
        async getMonsterCards() {
            const res = await fetch(`http://localhost:3005/api/monsters/`)
            const data = await res.json()
            this.monsterCards = data
        },
        async getOptionCards() {
            const res = await fetch(`http://localhost:3005/api/options/`)
            const data = await res.json()
            this.optionCards = data
        },
        async getCardsGame(cards) {
            // split the cards to monsters and options
            const cardsArray = cards
            let monsterParam = ""
            let optionParam = ""
            for (let i = 0; i < cardsArray.length; i++) {
                const card = cardsArray[i]
                const cardComma = card + ","
                if (card <= CONST.FIRST_OPTION_CARD_ID) {
                    monsterParam += cardComma
                } else {
                    optionParam += cardComma
                }
            }
            // shave off the last comma
            monsterParam = monsterParam.slice(0,-1)
            optionParam = optionParam.slice(0,-1)
            // fetch the cards
            const monsterRes = await fetch(`http://localhost:3005/api/monsters/id=${monsterParam}`)
            const optionRes = await fetch(`http://localhost:3005/api/options/id=${optionParam}`)
            const monsterData = await monsterRes.json()
            const optionData = await optionRes.json()
            // store the cards
            this.monsterCards.push(...monsterData)
            this.optionCards.push(...optionData)
        },
    }
})

export const useCardDetails = defineStore('cardDetailsStore', {
    state: () => ({
        specialtyList: [
            {
                specialty: "Fire",
                topColor: "red",
                bottomColor: "#E57373", // vuetify color lighten-2
            },
            {
                specialty: "Ice",
                topColor: "blue",
                bottomColor: "#64B5F6", // vuetify color lighten-2
            },
            {
                specialty: "Nature",
                topColor: "green",
                bottomColor: "#81C784", // vuetify color lighten-2
            },
            {
                specialty: "Darkness",
                topColor: "black",
                bottomColor: "#616161", // vuetify color darken-2
            },
            {
                specialty: "Rare",
                topColor: "#ffc107", // vuetify amber base
                bottomColor: "#fff176", // vuetify color lighten-2
            },
        ]
    })
})