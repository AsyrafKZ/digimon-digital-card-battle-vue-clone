import { defineStore } from "pinia";

export const usePlayerOfflineCardsStore = defineStore('playerOfflineCards', {
    state: () => ({
        cards: []
    }),
    getters: {
        count() {
            return this.cards.length
        },
    },
    actions: {
        setOffline(cards) {
            this.cards.push(cards)
        },

    }
})