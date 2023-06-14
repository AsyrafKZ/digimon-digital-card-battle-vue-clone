import { defineStore } from "pinia";
import { useGameStateStore } from './gameState'

export const usePlayerStore = defineStore('player', {
    state: () => ({
        userId: "", // TODO: delete this. seems like a bad idea to put user id on client side
        deck: {
            id: "",
            cards: [],
        },
        onlineCards: [],
        offlineCards: [],
        handCards: {
            hand1: {},
            hand2: {},
            hand3: {},
            hand4: {},
        },
        activeMonsterCard: {},
        activeOptionCard: {},
        dp: {
            total: 0,
            cards: [],
        },
    }),
    getters: {
    },
    actions: {
        async setUserCards(userId, deckId) {
            const res = await fetch(`http://localhost:3005/api/users/${userId}`)
            const data = await res.json()
            // get user id
            this.userId = data.user_id
            // get deck for play
            const decks = data.decks
            for (let i = 0; i < decks.length; i++) {
                const deck = decks[i];
                if (deck.deck_id === deckId) {
                    this.deck = {
                        id: deck.deck_id,
                        cards: deck.cards,
                    }
                    break
                }
            }
            // randomize and set starting online cards
            this.setOnlineCards(this.deck.cards)
            // update game state
            const gameState = useGameStateStore()
            gameState.setPlayerOnlineCards(this.onlineCards)
        },
    }
})