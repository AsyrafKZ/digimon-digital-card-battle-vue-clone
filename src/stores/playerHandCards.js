import { defineStore } from "pinia";
import { usePlayerOnlineCardsStore } from './playerOnlineCards';
import { usePlayerOfflineCardsStore } from './playerOfflineCards';
import { usePlayerActiveCardsStore } from "./playerActiveCards";

import { createMonsterCard, createOptionCard, setPenalty } from "@/utils/createCard";
import { CONST } from '../const/const'
import anime from "animejs";

export const usePlayerHandCardsStore = defineStore('playerHandCards', {
    state: () => ({
        hands: {
            hand1: {},
            hand2: {},
            hand3: {},
            hand4: {},
        }
    }),
    getters: {
        count() {
            return Object.values(this.hands).reduce((p, c) => {
                return Object.keys(c).length > 0 ? p + 1 : p
            }, 0)
        },
        randomHand() {
            let ids = []
            for (const hand in this.hands) {
                if (Object.hasOwnProperty.call(this.hands, hand)) {
                    if (this.hands[hand].id > -1) {
                        ids.push(this.hands[hand].id)
                    }
                }
            }
            return ids[Math.floor(Math.random() * ids.length)]
        },
    },
    actions: {
        async discardAll() {
            for (const hand in this.hands) {
                if (Object.hasOwnProperty.call(this.hands, hand)) {
                    let handId = this.hands[hand].id
                    if (handId > -1) {
                        // animate
                        let el = document.querySelector(`#id${handId}`)
                        let img = this.hands[hand].imgSrc
                        let elPosX = document
                            .getElementById("playerOffline")
                            .getBoundingClientRect().right;
                        let elPosY = document
                            .getElementById("playerOffline")
                            .getBoundingClientRect().bottom;
                        let currentElPosX = document
                            .getElementById(`id${handId}`)
                            .getBoundingClientRect().right;
                        let currentElPosY = document
                            .getElementById(`id${handId}`)
                            .getBoundingClientRect().top;
                        let x = Math.floor(elPosX) - Math.floor(currentElPosX);
                        let y = Math.floor(currentElPosY) - Math.floor(elPosY) + 10;
                        await anime({
                            targets: el,
                            easing: "cubicBezier(.5, .05, .1, .3)",
                            duration: 500,
                            translateX: x,
                            translateY: y,
                            rotate: "-90deg",
                            scale: 0.4,
                        }).finished;
                        // image overwrite
                        let elOffline = document.querySelector(`#playerOffline`)
                        elOffline.style.background = `url(${img})`
                        elOffline.style.backgroundPosition = "center"
                        // logically remove the card
                        usePlayerOfflineCardsStore().setOffline(this.hands[hand].id)
                        this.hands[hand] = {}
                    }
                }
            }
        },
        discardOne(id) {
            for (const hand in this.hands) {
                if (Object.hasOwnProperty.call(this.hands, hand)) {
                    if (this.hands[hand].id == id) {
                        this.hands[hand] = {}
                        break;
                    }
                }
            }
        },
        async setAll() {
            for (const hand in this.hands) {
                if (Object.hasOwnProperty.call(this.hands, hand)) {
                    if (Object.keys(this.hands[hand]).length == 0) {
                        this.hands[hand] = await this.getCard(hand);
                    }
                }
            }
        },
        async setOne() {
            for (const hand in this.hands) {
                if (Object.hasOwnProperty.call(this.hands, hand)) {
                    if (Object.keys(this.hands[hand]).length == 0) {
                        this.hands[hand] = await this.getCard();
                        break
                    }
                }
            }
        },
        async getCard() {
            const card = usePlayerOnlineCardsStore().topCard
            // animate 
            let el = document.querySelector(`#playerDeck`)
            let img = el.querySelector('#playerDeck > div > img')
            let animate1 = anime({
                targets: el,
                easing: "cubicBezier(.5, .05, .1, .3)",
                translateX: 20,
                rotateY: "90deg",
                duration: 100,
            })
            let createdCard = null;
            await animate1.finished.then(() => {
                usePlayerOnlineCardsStore().drawOne()
                if (card < CONST.FIRST_OPTION_CARD_ID) {
                    createdCard = createMonsterCard(card);
                } else {
                    createdCard = createOptionCard(card);
                }
            })
            img.src = createdCard.imgSrc
            await anime({
                targets: el,
                easing: "cubicBezier(.5, .05, .1, .3)",
                duration: 100,
                keyframes: [
                    {
                        rotateY: "0deg",
                    },
                    {
                        rotateY: "90deg",
                    },
                ]
            }).finished;
            img.src = "src/images/card-back.png"
            await anime({
                targets: el,
                easing: "cubicBezier(.5, .05, .1, .3)",
                duration: 100,
                translateX: 0,
                rotateY: "0deg",
            }).finished;
            return createdCard
        },
        setActiveMonsterCard: function (id, isDigivolvePlay = false) {
            let card = createMonsterCard(id)
            if (!isDigivolvePlay && card.level !== CONST.R) {
                card = {
                    ...card,
                    cPow: setPenalty(card.level, card.cPow),
                    tPow: setPenalty(card.level, card.tPow),
                    xPow: setPenalty(card.level, card.xPow),
                    hp: setPenalty(card.level, card.hp),
                }
            }
            // TODO: the v-tooltip should show the original value and the penalty
            // Q: also what about U that digivolved from halved C?
            // A: it seems that the U card stats are halved. so we need to add a new flag (key-value pair!)
            usePlayerActiveCardsStore().setBattleCard(card)
        },
        setActiveOptionCard: function (id) {
            let card = createOptionCard(id)
            usePlayerActiveCardsStore().setOptionCard(card)
        },
    }
})