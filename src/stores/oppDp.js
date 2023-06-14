import { defineStore } from "pinia";
import { useOppOfflineCardsStore } from './oppOfflineCards';

export const useOppDpStore = defineStore('oppDp', {
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
            useOppOfflineCardsStore().setOffline(...this.cards)
            this.cards = []
        },
        flushOne: function () {
            this.dp -= parseInt(this.topDp)
            this.dpStack.shift()
            useOppOfflineCardsStore().setOffline(this.topCard)
            this.cards.shift()
        }
    }
})