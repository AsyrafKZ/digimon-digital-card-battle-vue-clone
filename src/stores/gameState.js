import { CONST } from "@/const/const";
import effects from "@/effects/option";
import { defineStore } from "pinia";
import { usePlayerActiveCardsStore } from "./playerActiveCards";
import { useOppActiveCardsStore } from "./oppActiveCards";

const setPow = (choice) => {
    if (choice == CONST.O) {
        if (who == CONST.PLAYER) {
            return usePlayerActiveCardsStore().cPow
        }
        else {
            return useOppActiveCardsStore().cPow
        }
    }
    else if (choice == CONST.T) {
        if (who == CONST.PLAYER) {
            return usePlayerActiveCardsStore().tPow
        }
        else {
            return useOppActiveCardsStore().tPow
        }
    }
    else if (choice == CONST.X) {
        if (who == CONST.PLAYER) {
            return usePlayerActiveCardsStore().xPow
        }
        else {
            return useOppActiveCardsStore().xPow
        }
    }
}

const executeEffects = (speeds) => {
    if (speeds.length > 0) {
        if (speeds.length > 1) {
            // activate option card first
            const options = speeds.filter(el => el.id >= CONST.FIRST_OPTION_CARD_ID)
            if (options.length > 1) {
                // activate 1st attack's option support first
                if (this.firstAttack == CONST.PLAYER) {
                    effects[playerSupport.id].effect(CONST.PLAYER)
                } else {
                    effects[oppSupport.id].effect(CONST.OPP)
                }
            } else if (options.length == 1) {
                effects[options[0].id].effect(options[0].user)
            } else {
                // activate 1st attack's monster support first
                const monsters = speeds.filter(el => el.id < CONST.FIRST_OPTION_CARD_ID)
                if (this.firstAttack == CONST.PLAYER) {
                    effects[playerSupport.id].effect(CONST.PLAYER)
                } else {
                    effects[oppSupport.id].effect(CONST.OPP)
                }
            }
        } else if (speeds.length == 1) {
            //
        }
    }
}

export const useGameStateStore = defineStore('gameState', {
    state: () => ({
        turn: "0",
        phases: "",
        playerWinCount: 0,
        oppWinCount: 0,
        firstAttack: "",
        playerAttack: "",
        oppAttack: "",
    }),
    getters: {
        playerSelectedAttack: function () {
            return this.playerAttack
        },
        oppSelectedAttack: function () {
            return this.oppAttack
        },
    },
    actions: {
        setPlayerAttack: function (selectedAttack) {
            this.playerAttack = selectedAttack
        },
        setOppAttack: function (selectedAttack) {
            this.oppAttack = selectedAttack
        },
        startBattle: function () {
            this.setEffect()
            if (this.firstAttack == CONST.PLAYER) {
                const playerDmg = setPow(CONST.PLAYER, this.playerAttack)
                useOppActiveCardsStore().addHp(-parseInt(playerDmg))
                const oppDmg = setPow(CONST.OPP, this.oppAttack)
                usePlayerActiveCardsStore().addHp(-parseInt(oppDmg))
            } else if (this.firstAttack == CONST.OPP) {
                const oppDmg = setPow(CONST.OPP, this.oppAttack)
                usePlayerActiveCardsStore().addHp(-parseInt(oppDmg))
                const playerDmg = setPow(CONST.PLAYER, this.playerAttack)
                useOppActiveCardsStore().addHp(-parseInt(playerDmg))
            }
        },
        setEffect: function () {
            const playerX = {
                id: usePlayerActiveCardsStore().battleId,
                user: CONST.PLAYER,
                speed: usePlayerActiveCardsStore().xEffectSpeed,
            }
            const oppX = {
                id: useOppActiveCardsStore().battleId,
                user: CONST.OPP,
                speed: useOppActiveCardsStore().xEffectSpeed
            }
            const playerSupport = {
                id: usePlayerActiveCardsStore().optionId,
                user: CONST.PLAYER,
                speed: usePlayerActiveCardsStore().supportSpeed,
                isSupport: true,
            }
            const oppSupport = {
                id: useOppActiveCardsStore().optionId,
                user: CONST.OPP,
                speed: useOppActiveCardsStore().supportSpeed,
                isSupport: true,
            }
            const effectsArr = [
                playerX,
                oppX,
                playerSupport,
                oppSupport
            ]
            effectsArr.sort((a, b) => {
                return parseInt(a) - parseInt(b)
            })
            const speed3s = effectsArr.filter(el => el.speed == CONST.SPEED_3)
            if (speed3s.length > 0) {
                if (speed3s.length > 1) {
                    // activate option card first
                    const options = speed3s.filter(el => el.id >= CONST.FIRST_OPTION_CARD_ID)
                    if (options.length > 1) {
                        // activate 1st attack's option support first
                        if (this.firstAttack == CONST.PLAYER) {
                            effects[playerSupport.id].effect(CONST.PLAYER)
                            effects[oppSupport.id].effect(CONST.OPP)
                        } else {
                            effects[oppSupport.id].effect(CONST.OPP)
                            effects[playerSupport.id].effect(CONST.PLAYER)
                        }
                    } else if (options.length == 1) {
                        effects[options[0].id].effect(options[0].user)
                    }
                    // then, activate support card
                    const supports = speed3s.filter(el => el.isSupport)
                    if (supports.length > 1) {
                        // activate 1st attack's monster support first
                        if (this.firstAttack == CONST.PLAYER) {
                            effects[playerSupport.id].effect(CONST.PLAYER)
                            effects[oppSupport.id].effect(CONST.OPP)
                        } else {
                            effects[oppSupport.id].effect(CONST.OPP)
                            effects[playerSupport.id].effect(CONST.PLAYER)
                        }
                    } else if (supports.length == 0) {
                        effects[supports.id].effect(supports[0].user)
                    }
                    // then, activate x effects
                    // activate 1st attack's monster x effect first
                    if (this.firstAttack == CONST.PLAYER) {
                        effects[playerX.id].effect(CONST.PLAYER)
                        effects[oppX.id].effect(CONST.OPP)
                    } else {
                        effects[oppX.id].effect(CONST.OPP)
                        effects[playerX.id].effect(CONST.PLAYER)
                    }
                } else if (speed3s.length == 1) {
                    //
                }
            }
            // Activate SPEED 2 effects
            const speed2s = effectsArr.filter(el => el.speed == CONST.SPEED_2)
            if (speed2s.length > 0) {
                if (speed2s.length > 1) {
                    //
                }
            }
            // Activate SPEED 1 effects
            const speed1s = effectsArr.filter(el => el.speed == CONST.SPEED_1)
            if (speed1s.length > 0) {
                if (speed1s.length > 1) {
                    //
                }
            }

            // Activation priority:
            // Higher activation speed first
            // If activation speed are the same, option card activate first
            // If all monster card, 1st attack card activates first
            // Effect speed > if same speed, option card, then monster card > attack turn
            // Option card in support card slot > monster card in support slot
            // Therefore, if both sides use both special attacks and support effects with the same speed, the player who attacks first will activate their effect first, so the order of activation becomes: 1st attack's support effect → 1st attack's special attack → 2nd attack's support effect → 2nd attack's special attack.
            if (playerSupport > oppSupport) {
                // run player support effect first
            } else {
                // run opp support effect first
            }
            if (playerX > oppX) {
                // run player x support effect first
            } else {
                // run opp x support effect first
            }
        }
    }
})