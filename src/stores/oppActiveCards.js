import { defineStore } from "pinia";

export const useOppActiveCardsStore = defineStore('oppActiveCards', {
    state: () => ({
        battleCard: {},
        optionCard: {},
        digivolveStack: [],
    }),
    getters: {
        battleId() {
            return this.battleCard.id
        },
        optionId() {
            return this.optionCard.id
        },
        cPow() {
            return this.battleCard.cPow
        },
        tPow() {
            return this.battleCard.tPow
        },
        xPow() {
            return this.battleCard.xPow
        },
        hp() {
            return this.battleCard.hp
        },
        specialty() {
            return this.battleCard.specialty
        },
        lvl() {
            return this.battleCard.level
        },
        xEffectSpeed() {
            return this.battleCard.xEffectSpeed
        },
        supportSpeed() {
            if (this.optionCard.id < CONST.FIRST_OPTION_CARD_ID) {
                return this.optionCard.supportSpeed
            } else {
                return this.optionCard.speed
            }
        }
    },
    actions: {
        setBattleCard(card) {
            this.battleCard = card
        },
        setOptionCard(card) {
            const activeOptionCard = {
                ...card,
                isActive: true,
            }
            this.optionCard = activeOptionCard
        },
        setHp(val) {
            this.battleCard.hp = val
        },
        addHp(val) {
            this.battleCard.hp = parseInt(this.battleCard.hp) + val
        },
        setAllPow(val) {
            this.battleCard.cPow = val
            this.battleCard.tPow = val
            this.battleCard.xPow = val
        },
        addAllPow(val) {
            this.battleCard.cPow = parseInt(this.battleCard.cPow) + val
            this.battleCard.tPow = parseInt(this.battleCard.tPow) + val
            this.battleCard.xPow = parseInt(this.battleCard.xPow) + val
        },
        setCpow(val) {
            this.battleCard.cPow = val
        },
        setTpow(val) {
            this.battleCard.tPow = val
        },
        setXpow(val) {
            this.battleCard.xPow = val
        },
        setSpecialty(val) {
            this.battleCard.specialty = val
        }
    }
})