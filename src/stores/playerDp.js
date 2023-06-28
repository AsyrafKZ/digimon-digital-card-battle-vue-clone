import { defineStore } from "pinia";
import { usePlayerOfflineCardsStore } from './playerOfflineCards';
import anime from "animejs";

export const usePlayerDpStore = defineStore('playerDp', {
    state: () => ({
        cards: [],
        dp: 0,
        dpStack: [],
        pos: {
            x: "",
            y: "",
        }
    }),
    getters: {
        topCard() {
            return this.cards[this.cards.length - 1]
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
        flushAll: async function () {
            this.dp = 0
            this.dpStack = []
            // animate translation from dp slot to offline
            for (let i = 0; i < this.cards.length; i++) {
                const card = this.cards[this.cards.length - 1 - i];
                console.log("card", card, ". index:", this.cards.length - 1 - i)
                let el = document.querySelector(`#playerDp`);
                let elPosX = document
                    .getElementById("playerDp")
                    .getBoundingClientRect().left;
                let targetX = document
                    .getElementById(`playerOffline`)
                    .getBoundingClientRect().left;
                let elPosY = document
                    .getElementById("playerDp")
                    .getBoundingClientRect().top;
                let targetY = document
                    .getElementById(`playerOffline`)
                    .getBoundingClientRect().top;
                if (i == 0) {
                    this.pos.x = elPosX
                    this.pos.y = elPosY
                }
                let x = targetX - elPosX;
                let y = targetY - elPosY;
                let animate = anime({
                    targets: el,
                    easing: "linear",
                    translateX: x,
                    translateY: y,
                    rotate: "-90deg",
                    duration: 500,
                });
                await animate.finished.then(() => {
                    // dp slot image overwrite
                    el.style.background = `rgba(200, 200, 200, 0.1)`;
                    el.style.backgroundSize = "45px";
                    // offline stack image overwrite
                    // TODO: probably need to fix this when images are fetched from API
                    const imgSrc = `src/images/monsters/${card.toString().padStart(3, "0")}.jpg`;
                    let elOffline = document.querySelector(`#playerOffline`);
                    elOffline.style.background = `url(${imgSrc})`;
                    elOffline.style.backgroundPosition = "center";
                });
                usePlayerOfflineCardsStore().setOffline(card)
                // return the dp slot to its original position
                await anime({
                    targets: el,
                    easing: "linear",
                    translateX: 0,
                    translateY: 0,
                    duration: 0,
                    rotate: "0deg",
                }).finished;
            }
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