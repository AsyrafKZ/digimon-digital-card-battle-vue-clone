import { defineStore } from "pinia";
import { useOppOnlineCardsStore } from './oppOnlineCards';
import { useOppOfflineCardsStore } from './oppOfflineCards';
import { useOppActiveCardsStore } from "./oppActiveCards";

import { createMonsterCard, createOptionCard, setPenalty } from "@/utils/createCard";
import { CONST } from '../const/const'

export const useOppHandCardsStore = defineStore('oppHandCards', {
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
        discardAll() {
            for (const hand in this.hands) {
                if (Object.hasOwnProperty.call(this.hands, hand)) {
                    if (this.hands[hand].id > -1) {
                        useOppOfflineCardsStore().setOffline(this.hands[hand].id)
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
        setAll() {
            for (const hand in this.hands) {
                if (Object.hasOwnProperty.call(this.hands, hand)) {
                    if (Object.keys(this.hands[hand]).length == 0) {
                        this.hands[hand] = this.setOne();
                    }
                }
            }
        },
        setOne() {
            for (const hand in this.hands) {
                if (Object.hasOwnProperty.call(this.hands, hand)) {
                    if (Object.keys(this.hands[hand]).length == 0) {
                        this.hands[hand] = this.getCard();
                        break
                    }
                }
            }
        },
        getCard() {
            const card = useOppOnlineCardsStore().topCard
            useOppOnlineCardsStore().drawOne()
            if (card < CONST.FIRST_OPTION_CARD_ID) {
                const monsterCard = createMonsterCard(card);
                return monsterCard;
            } else {
                const optionCard = createOptionCard(card);
                return optionCard;
            }
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
            useOppActiveCardsStore().setBattleCard(card)
        },
        setActiveOptionCard: function (id) {
            let card = createOptionCard(id)
            useOppActiveCardsStore().setOptionCard(card)
        },
    }
})