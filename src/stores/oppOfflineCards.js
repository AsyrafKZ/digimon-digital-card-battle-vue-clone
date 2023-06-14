import { defineStore } from "pinia";
import { useOppOnlineCardsStore } from "./oppOnlineCards";

export const useOppOfflineCardsStore = defineStore('oppOfflineCards', {
    state: () => ({
        cards: []
    }),
    getters: {
        count() {
            return this.cards.length
        },
        topCard() {
            return this.cards[0]
        }
    },
    actions: {
        setOffline(cards) {
            this.cards.push(cards)
        },
        moveToOnlineCards() {
            const onlineStore = useOppOnlineCardsStore()
            const cardId = this.topCard
            onlineStore.addCard(cardId)
        },
    }
})