import { defineStore } from "pinia";

export const useOppOnlineCardsStore = defineStore('oppOnlineCards', {
    state: () => ({
        deckId: "",
        cards: []
    }),
    getters: {
        count() {
            return this.cards.length
        },
        // TODO: wait, [0] is top or bottom?? mana2 boleh, yg penting consistent satu sistem
        topCard() {
            return this.cards[0]
        }
    },
    actions: {
        shuffleCards(cards) {
            let shuffled = []
            let unshuffled = cards
            for (let i = 0; i < 30; i++) {
                const rand = Math.floor(Math.random() * unshuffled.length)
                const randCard = unshuffled[rand];
                shuffled.push(randCard);
                unshuffled = unshuffled.filter(card => { return card != randCard })
            }
            return shuffled
        },
        async setCards(userId, deckId) {
            const res = await fetch(`http://localhost:3005/api/users/${userId}`)
            const data = await res.json()
            // set deck for play
            const decks = data.decks
            for (let i = 0; i < decks.length; i++) {
                const deck = decks[i];
                if (deck.deck_id === deckId) {
                    this.cards = this.shuffleCards(deck.cards)
                    break
                }
            }
        },
        setDeckId(id) {
            this.deckId = id
        },
        drawOne() {
            this.cards.shift();
        },
        addCard(id) {
            this.cards.push(id)
        },
    }
})