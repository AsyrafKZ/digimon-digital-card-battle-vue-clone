import { defineStore } from "pinia";
import { usePlayerCardsStore } from './Player'

export const useEffectStore = defineStore('effects', {
    state: () => ({
        reduceHp: "",
    }),
    actions: {
        activateEffect(id) {
            if (id == "227") {
                reduceHp("Player", 10)
            }
        }
    }
})

const reduceHp = (who, amount) => {
    if (who == "Player") {
        const playerCards = usePlayerCardsStore();
        let hp = playerCards.activeMonsterCard.hp
        hp -= amount
        return hp
    }
}