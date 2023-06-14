import { defineStore } from "pinia";
import { usePlayerOfflineCardsStore } from './playerOfflineCards';

export const usePlayerDpStore = defineStore('playerDp', {
    state: () => ({
        cards: [],
        dp: 0,
        dpStack: [],
    }),
    getters: {
        topCard() {
            return this.cards[0]
        },
        topDp() {
            return this.dpStack[0]
        },
        stackCount() {
            return this.cards.length
        }
    },
    actions: {
        store: function (id, dp) {
            this.dp += parseInt(dp)
            this.dpStack.push(dp)
            this.cards.push(id)
        },
        flushAll: function () {
            this.dp = 0
            this.dpStack = []
            usePlayerOfflineCardsStore().setOffline(...this.cards)
            this.cards = []
        },
        flushOne: function () {
            this.dp -= parseInt(this.topDp)
            this.dpStack.shift()
            usePlayerOfflineCardsStore().setOffline(this.topCard)
            this.cards.shift()
        }
    }
})