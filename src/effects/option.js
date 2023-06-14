import { CONST } from "@/const/const";
import { usePlayerActiveCardsStore } from "@/stores/playerActiveCards";
import { useOppActiveCardsStore } from "@/stores/oppActiveCards";
import { usePlayerHandCardsStore } from "@/stores/playerHandCards";
import { useOppHandCardsStore } from "@/stores/oppHandCards";
import { usePlayerOfflineCardsStore } from "@/stores/playerOfflineCards";
import { useOppOfflineCardsStore } from "@/stores/oppOfflineCards";
import { usePlayerOnlineCardsStore } from "@/stores/playerOnlineCards";
import { useOppOnlineCardsStore } from "@/stores/oppOnlineCards";
import { useOppDpStore } from "@/stores/oppDp";
import { usePlayerDpStore } from "@/stores/playerDp";

const getBothActiveStore = (who) => {
    if (who == "player") {
        return {
            myActiveStore: usePlayerActiveCardsStore(),
            hisActiveStore: useOppActiveCardsStore(),
        };
    } else {
        return {
            myActiveStore: useOppActiveCardsStore(),
            hisActiveStore: usePlayerActiveCardsStore(),
        };
    }
};

const getMyActiveCardsStore = (who) => {
    if (who == "player") {
        return usePlayerActiveCardsStore();
    } else {
        return useOppActiveCardsStore();
    }
};

const getHisActiveCardsStore = (who) => {
    if (who == "player") {
        return useOppActiveCardsStore();
    } else {
        return usePlayerActiveCardsStore();
    }
};

const getMyHandCardsStore = (who) => {
    if (who == "player") {
        return usePlayerHandCardsStore();
    } else {
        return useOppHandCardsStore();
    }
};

const getHisHandCardsStore = (who) => {
    if (who == "player") {
        return useOppHandCardsStore();
    } else {
        return usePlayerHandCardsStore();
    }
};

const getMyOnlineCardsStore = (who) => {
    if (who == "player") {
        return usePlayerOnlineCardsStore();
    } else {
        return useOppOnlineCardsStore();
    }
};

const getHisOnlineCardsStore = (who) => {
    if (who == "player") {
        return useOppOnlineCardsStore();
    } else {
        return usePlayerOnlineCardsStore();
    }
};

const getMyOfflineCardsStore = (who) => {
    if (who == "player") {
        return usePlayerOfflineCardsStore();
    } else {
        return useOppOfflineCardsStore();
    }
};

const getHisOfflineCardsStore = (who) => {
    if (who == "player") {
        return useOppOfflineCardsStore();
    } else {
        return usePlayerOfflineCardsStore();
    }
};

const getMyDpStore = (who) => {
    if (who == "player") {
        return usePlayerDpStore();
    } else {
        return useOppDpStore();
    }
};

const getHisDpStore = (who) => {
    if (who == "player") {
        return useOppDpStore();
    } else {
        return usePlayerDpStore();
    }
};

const getLevel = (lvl) => {
    if (lvl == CONST.R) {
        return 0;
    } else if (lvl == CONST.A) {
        return 1;
    } else if (lvl == CONST.C) {
        return 2;
    } else if (lvl == CONST.U) {
        return 3;
    }
};

const all = [
    {
        id: 191,
        // Own HP are halved. Counterattack. Attack second.
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            const oldHp = myActiveStore.hp;
            const halved = Math.floor(parseInt(oldHp) / 2);
            myActiveStore.setHp(halved);
            // TODO: counter attack
            // TODO: attack second
        },
    },
    {
        id: 192,
        // Discard 1 Card from own Hand. Boost both players' Attack Power +600.
        effect: (who, id) => {
            const myHandStore = getMyHandCardsStore(who);
            const myOfflineStore = getMyOfflineCardsStore(who);
            myHandStore.discardOne(id);
            myOfflineStore.setOffline(id);
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            myActiveStore.addAllPow(600);
            hisActiveStore.addAllPow(600);
        },
    },
    {
        id: 193,
        // if own level is below opponent's, opponent's attack power becomes 0
        effect: (who) => {
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            let myLvl = getLevel(myActiveStore.lvl);
            let hisLvl = getLevel(hisActiveStore.lvl);
            if (hisLvl - myLvl > 0) {
                hisActiveStore.setAllPow(0);
            } else {
                // TODO: misfire failure
            }
        },
    },
    {
        id: 194,
        effect: (who) => {
            // Discard 7 cards from online deck
            const onlineStore = getMyOnlineCardsStore(who);
            const offlineStore = getMyOfflineCardsStore(who);
            for (let i = 0; i < 7; i++) {
                offlineStore.setOffline(onlineStore.topCard);
                onlineStore.drawOne();
            }
            // own attack power is same as own hp
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setAllPow(myActiveStore.hp);
        },
    },
    {
        id: 195,
        effect: (who) => {
            // own hp are halved
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            const halved = Math.floor(parseInt(myActiveStore.hp) / 2);
            myActiveStore.setHp(halved);
            // opponent's attack power becomes 0
            hisActiveStore.setAllPow(0);
        },
    },
    {
        id: 196,
        effect: (who) => {
            // If opponent's HP are more than 1000, opponent's HP are halved
            const hisActiveStore = getHisActiveCardsStore(who);
            if (parseInt(hisActiveStore.hp) > 1000) {
                hisActiveStore.setHp(Math.floor(parseInt(hisActiveStore.hp) / 2));
            }
        },
    },
    {
        id: 197,
        effect: (who) => {
            // Discard 7 cards from online deck
            const onlineStore = getMyOnlineCardsStore(who);
            const offlineStore = getMyOfflineCardsStore(who);
            for (let i = 0; i < 7; i++) {
                offlineStore.setOffline(onlineStore.topCard);
                onlineStore.drawOne();
            }
            // recover own hp by +1000
            const myActiveStore = getMyActiveCardsStore(who);
            const addedHp = parseInt(myActiveStore.hp) + 1000;
            myActiveStore.setHp(addedHp);
        },
    },
    {
        id: 198,
        effect: (who) => {
            // Discard 7 cards from online deck
            const onlineStore = getMyOnlineCardsStore(who);
            const offlineStore = getMyOfflineCardsStore(who);
            for (let i = 0; i < 7; i++) {
                offlineStore.setOffline(onlineStore.topCard);
                onlineStore.drawOne();
            }
            // Boost own Attack Power +500.
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.addAllPow(500);
        },
    },
    {
        id: 199,
        effect: (who) => {
            // If opponent's HP is less than own, boost own Attack Power +400.
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            if (hisActiveStore.hp < myActiveStore.hp) {
                myActiveStore.addAllPow(400);
            }
        },
    },
    {
        id: 200,
        effect: () => {
            // None
            return;
        },
    },
    {
        id: 201,
        effect: () => {
            // If both players use same Attack, discard all Cards in foe's Hand.
            // TODO: game state store. both players' attack choice. new type of effect?
        },
    },
    {
        id: 202,
        effect: (who) => {
            // Discard all Cards in own Hand
            const handStore = getMyHandCardsStore(who);
            handStore.discardAll();
            const myActiveStore = getMyActiveCardsStore(who);
            // Own Attack Power is doubled
            myActiveStore.setCpow(parseInt(myActiveStore.cPow) * 2);
            myActiveStore.setTpow(parseInt(myActiveStore.tPow) * 2);
            myActiveStore.setXpow(parseInt(myActiveStore.xPow) * 2);
        },
    },
    {
        id: 203,
        effect: (who) => {
            // Both players' Attack Power becomes 0.
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            myActiveStore.setAllPow(0);
            hisActiveStore.setAllPow(0);
        },
    },
    {
        id: 204,
        effect: (who) => {
            // TODO: Attack first.

            // Boost own Attack Power +100.
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.addAllPow(100);
        },
    },
    {
        id: 205,
        effect: () => {
            // TODO: Own attack becomes \"Eat-up HP.\"
        },
    },
    {
        id: 206,
        effect: (who) => {
            // If own Specialty is Fire, boost own Attack Power +100, recover HP +200.
            const myActiveStore = getMyActiveCardsStore(who);
            if (myActiveStore.specialty == CONST.FIRE) {
                myActiveStore.addAllPow(100);
                myActiveStore.addHp(200);
            }
        },
    },
    {
        id: 207,
        effect: (who) => {
            // If own Specialty is Ice, boost own Attack Power +100, recover HP +200.
            const myActiveStore = getMyActiveCardsStore(who);
            if (myActiveStore.specialty == CONST.ICE) {
                myActiveStore.addAllPow(100);
                myActiveStore.addHp(200);
            }
        },
    },
    {
        id: 208,
        effect: (who) => {
            // If own Specialty is Nature, boost own Attack Power +100, recover HP +200.
            const myActiveStore = getMyActiveCardsStore(who);
            if (myActiveStore.specialty == CONST.NATURE) {
                myActiveStore.addAllPow(100);
                myActiveStore.addHp(200);
            }
        },
    },
    {
        id: 209,
        effect: (who) => {
            // If own Specialty is Darkness, boost own Attack Power +100, recover HP +200.
            const pStore = usePlayerActiveCardsStore();
            const myActiveStore = getMyActiveCardsStore(who);
            if (myActiveStore.specialty == CONST.DARKNESS) {
                myActiveStore.addAllPow(100);
                myActiveStore.addHp(200);
            }
        },
    },
    {
        id: 210,
        effect: (who) => {
            // If own Specialty is Rare, boost own Attack Power +100, recover HP +200.
            const myActiveStore = getMyActiveCardsStore(who);
            if (myActiveStore.specialty == CONST.RARE) {
                myActiveStore.addAllPow(100);
                myActiveStore.addHp(200);
            }
        },
    },
    {
        id: 211,
        effect: (who) => {
            // If Specialties are same, boost own Attack Power +200, recover HP +400.
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            if (myActiveStore.specialty == hisActiveStore.specialty) {
                myActiveStore.addAllPow(200);
                myActiveStore.addHp(400);
            }
        },
    },
    {
        id: 212,
        effect: (who) => {
            // Discard 7 Cards from both players' Online Decks.
            const myOnlineStore = getMyOnlineCardsStore(who);
            const myOfflineStore = getMyOfflineCardsStore(who);
            const hisOnlineStore = getHisOnlineCardsStore(who);
            const hisOfflineStore = getHisOfflineCardsStore(who);
            for (let i = 0; i < 7; i++) {
                myOfflineStore.setOffline(myOnlineStore.topCard);
                myOnlineStore.drawOne();
                hisOfflineStore.setOffline(hisOnlineStore.topCard);
                hisOnlineStore.drawOne();
            }
        },
    },
    {
        id: 213,
        effect: () => {
            // If both Attacks are same, discard 7 Cards from foe's Online Deck.
            // TODO: game state store. both players' attack choice. new type of effect?
        },
    },
    {
        id: 214,
        effect: (who) => {
            // Discard 1 Card in own DP Slot. Discard all foe's Cards in DP Slot.
            const myDpStore = getMyDpStore(who);
            const hisDpStore = getHisDpStore(who);
            myDpStore.flushOne();
            hisDpStore.flushAll();
        },
    },
    {
        id: 215,
        effect: (who) => {
            // Both players' attacks become {{button|c}}. Boost own {{button|c}} Attack Power +100.
            // TODO: game state store. both players' attack choice. new type of effect?
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setCpow(parseInt(myActiveStore.cPow) + 100);
        },
    },
    {
        id: 216,
        effect: (who) => {
            // Changes opponent's Specialty to Fire. Draw 1 Card from own Online Deck.
            const hisActiveStore = getHisActiveCardsStore(who);
            hisActiveStore.setSpecialty(CONST.FIRE);
            const myHandStore = getMyHandCardsStore(who);
            myHandStore.setOne();
        },
    },
    {
        id: 217,
        effect: (who) => {
            // Changes opponent's Specialty to Ice. Draw 1 Card from own Online Deck.
            const hisActiveStore = getHisActiveCardsStore(who);
            hisActiveStore.setSpecialty(CONST.ICE);
            const myHandStore = getMyHandCardsStore(who);
            myHandStore.setOne();
        },
    },
    {
        id: 218,
        effect: (who) => {
            // Changes opponent's Specialty to Nature. Draw 1 Card from own Online Deck.
            const hisActiveStore = getHisActiveCardsStore(who);
            hisActiveStore.setSpecialty(CONST.NATURE);
            const myHandStore = getMyHandCardsStore(who);
            myHandStore.setOne();
        },
    },
    {
        id: 219,
        effect: (who) => {
            // Changes opponent's Specialty to Darkness. Draw 1 Card from own Online Deck.
            const hisActiveStore = getHisActiveCardsStore(who);
            hisActiveStore.setSpecialty(CONST.DARKNESS);
            const myHandStore = getMyHandCardsStore(who);
            myHandStore.setOne();
        },
    },
    {
        id: 220,
        effect: (who) => {
            // Changes opponent's Specialty to Rare. Draw 1 Card from own Online Deck.
            const hisActiveStore = getHisActiveCardsStore(who);
            hisActiveStore.setSpecialty(CONST.RARE);
            const myHandStore = getMyHandCardsStore(who);
            myHandStore.setOne();
        },
    },
    {
        id: 221,
        effect: (who) => {
            // If own HP are less than foe's HP, recover own HP by +700.
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            if (myActiveStore.hp < hisActiveStore.hp) {
                myActiveStore.addHp(700);
            }
        },
    },
    {
        id: 222,
        effect: (who) => {
            // Opponent's {{button|c}} Attack Power goes to 0. Recover own HP by +100.
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            hisActiveStore.setCpow(0);
            myActiveStore.addHp(100);
        },
    },
    {
        id: 223,
        effect: (who) => {
            // Opponent's {{button|t}} Attack Power goes to 0. Recover own HP by +100.
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            hisActiveStore.setTpow(0);
            myActiveStore.addHp(100);
        },
    },
    {
        id: 224,
        effect: (who) => {
            // Opponent's {{button|x}} Attack Power goes to 0. Recover own HP by +100.
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            hisActiveStore.setXpow(0);
            myActiveStore.addHp(100);
        },
    },
    {
        id: 225,
        effect: (who, id) => {
            // Opponent discards 2 Cards from his Online Deck and 1 Card from Hand.
            const hisOnlineStore = getHisOnlineCardsStore(who);
            const hisOfflineStore = getHisOfflineCardsStore(who);
            for (let i = 0; i < 2; i++) {
                hisOfflineStore.setOffline(hisOnlineStore.topCard);
                hisOnlineStore.drawOne();
            }
            const hisHandStore = getHisHandCardsStore(who);
            hisHandStore.discardOne(id);
            hisOfflineStore.setOffline(id);
        },
    },
    {
        id: 226,
        effect: (who) => {
            // Own Attack Power becomes 0. Opponent's HP are halved.
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            myActiveStore.setAllPow(0);
            hisActiveStore.setHp(Math.floor(parseInt(hisActiveStore.hp) / 2));
        },
    },
    {
        id: 227,
        effect: (who) => {
            // Make own HP 10. Own Attack Power is tripled.
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setHp(10);
            myActiveStore.setCpow(parseInt(myActiveStore.cPow) * 3);
            myActiveStore.setTpow(parseInt(myActiveStore.tPow) * 3);
            myActiveStore.setXpow(parseInt(myActiveStore.xPow) * 3);
        },
    },
    {
        id: 228,
        effect: (who) => {
            // Discard own Hand. Multiply own Attack Power by number of discarded Cards.
            const myHandStore = getMyHandCardsStore(who);
            const handCount = myHandStore.count();
            myHandStore.discardAll();
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setCpow(parseInt(myActiveStore.cPow) * handCount);
            myActiveStore.setTpow(parseInt(myActiveStore.tPow) * handCount);
            myActiveStore.setXpow(parseInt(myActiveStore.xPow) * handCount);
        },
    },
    {
        id: 229,
        effect: (who) => {
            // Discard own DP Slot Cards. Multiply own Attack Power by number of discards.
            const myDpStore = getMyDpStore(who);
            const dpCount = myDpStore.stackCount();
            myDpStore.flushAll();
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setCpow(parseInt(myActiveStore.cPow) * dpCount);
            myActiveStore.setTpow(parseInt(myActiveStore.tPow) * dpCount);
            myActiveStore.setXpow(parseInt(myActiveStore.xPow) * dpCount);
        },
    },
    {
        id: 230,
        effect: (who) => {
            // Own Attack Power matches own HP, then own HP are halved.
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setAllPow(myActiveStore.hp);
            myActiveStore.setHp(Math.floor(parseInt(myActiveStore.hp) / 2));
        },
    },
    {
        id: 231,
        effect: (who) => {
            // If own Level is R, boost own Attack Power +400.
            const myActiveStore = getMyActiveCardsStore(who);
            if (myActiveStore.lvl == CONST.R) {
                myActiveStore.addAllPow(400);
            }
        },
    },
    {
        id: 232,
        effect: (who) => {
            // If own Level is C, boost own Attack Power +400.
            const myActiveStore = getMyActiveCardsStore(who);
            if (myActiveStore.lvl == CONST.C) {
                myActiveStore.addAllPow(400);
            }
        },
    },
    {
        id: 233,
        effect: (who) => {
            // If own Level is U, boost own Attack Power +400.
            const myActiveStore = getMyActiveCardsStore(who);
            if (myActiveStore.lvl == CONST.U) {
                myActiveStore.addAllPow(400);
            }
        },
    },
    {
        id: 234,
        effect: (who) => {
            // If opponent is Level A, his Atk Pwr becomes 0 and own Atk Pwr is doubled.
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            if (hisActiveStore.lvl == CONST.A) {
                hisActiveStore.setAllPow(0);
                myActiveStore.setCpow(parseInt(myActiveStore.cPow) * 2);
                myActiveStore.setTpow(parseInt(myActiveStore.tPow) * 2);
                myActiveStore.setXpow(parseInt(myActiveStore.xPow) * 2);
            }
        },
    },
    {
        id: 235,
        effect: (who) => {
            // If opponent is Level U, his Atk Pwr becomes 0 and own Atk Pwr is doubled.
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            if (hisActiveStore.lvl == CONST.U) {
                hisActiveStore.setAllPow(0);
                myActiveStore.setCpow(parseInt(myActiveStore.cPow) * 2);
                myActiveStore.setTpow(parseInt(myActiveStore.tPow) * 2);
                myActiveStore.setXpow(parseInt(myActiveStore.xPow) * 2);
            }
        },
    },
    {
        id: 236,
        effect: (who) => {
            // If foe's Specialty is Fire or Ice, his Attack Power goes to 0.
            const hisActiveStore = getHisActiveCardsStore(who);
            if (
                hisActiveStore.specialty == CONST.FIRE ||
                hisActiveStore.specialty == CONST.ICE
            ) {
                hisActiveStore.setAllPow(0);
            }
        },
    },
    {
        id: 237,
        effect: (who) => {
            // If foe's Specialty is Nature or Darkness, his Attack Power goes to 0.
            const hisActiveStore = getHisActiveCardsStore(who);
            if (
                hisActiveStore.specialty == CONST.NATURE ||
                hisActiveStore.specialty == CONST.DARKNESS
            ) {
                hisActiveStore.setAllPow(0);
            }
        },
    },
    {
        id: 238,
        effect: (who) => {
            // Changes both players' Specialties to Rare.
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            myActiveStore.setSpecialty(CONST.RARE);
            hisActiveStore.setSpecialty(CONST.RARE);
        },
    },
    {
        id: 239,
        effect: (who) => {
            // KO'd Digimon revives with 1000. Battle is still lost.
            // TODO: game state win count. setting when to move active card to offline card
        },
    },
    {
        id: 240,
        effect: (who) => {
            // If both Attacks are same, own Attack Power is tripled.
            // TODO: game state store. both players' attack choice. new type of effect?
        },
    },
    {
        id: "242",
        // 'If both players use same Attack, recover own HP +700.'
        // TODO
        effect: (who) => {
        },
    },
    {
        id: "243",
        // 'If both Attacks are different, recover own HP by +500.'
        // TODO
        effect: (who) => {
        },
    },
    {
        id: "244",
        // "Recover own HP by +500. Recover foe's HP by +200."
        effect: (who) => {
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            myActiveStore.addHp(500)
            hisActiveStore.addHp(200)
        },
    },
    {
        id: "245",
        // 'If both attacks are different, own Attack Power is doubled.'
        // TODO
        effect: (who) => {
        },
    },
    {
        id: "246",
        // 'Own Attack Power is halved. Recover own HP by +500.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who)
            myActiveStore.setCpow(Math.floor(parseInt(myActiveStore.cPow) / 2));
            myActiveStore.setTpow(Math.floor(parseInt(myActiveStore.tPow) / 2));
            myActiveStore.setXpow(Math.floor(parseInt(myActiveStore.xPow) / 2));
        },
    },
    {
        id: "247",
        // 'Move top 3 Cards from Offline Pile to Online Deck and shuffle.'
        effect: (who) => {
            const myOfflineStore = getMyOfflineCardsStore(who)
            for (let i = 0; i < 3; i++) {
                myOfflineStore.moveToOnlineCards()
            }
            const myOnlineStore = getMyOnlineCardsStore(who)
            myOnlineStore.shuffleCards()
        },
    },
    {
        id: "248",
        // 'Draw until there are 4 Cards in own Hand. Recover own HP by +100.'
        effect: (who) => {
            const myHandStore = getMyHandCardsStore(who)
            while (myHandStore.count <= 4) {
                myHandStore.setOne()
            }
            const myActiveStore = getMyActiveCardsStore(who)
            myActiveStore.addHp(100)
        },
    },
    {
        id: "249",
        // 'If opponent uses {{button|c}}, attack first and boost own Attack Power +500.'
        // TODO
        effect: (who) => {
        },
    },
    {
        id: "250",
        // 'If opponent uses {{button|t}}, attack first and boost own Attack Power +500.'
        // TODO
        effect: (who) => {
        },
    },
    {
        id: "251",
        // 'If opponent uses {{button|x}}, attack first and boost own Attack Power +500.'
        // TODO
        effect: (who) => {
        },
    },
    {
        id: "252",
        // 'Opponent discards 2 Cards at random from his Hand.'
        effect: (who) => {
            const hisHandStore = getHisHandCardsStore(who)
            hisHandStore.discardOne(hisHandStore.randomHand)
            hisHandStore.discardOne(hisHandStore.randomHand)
        },
    },
    {
        id: "253",
        // "Opponent's Support and Option Effects are voided."
        // TODO: new method/state to check
        effect: (who) => {
        },
    },
    {
        id: "254",
        // 'If own Level is lower, switch HP with opponent.'
        effect: (who) => {
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            let myLvl = getLevel(myActiveStore.lvl);
            let hisLvl = getLevel(hisActiveStore.lvl)
            if (hisLvl - myLvl > 0) {
                const myOldHp = myActiveStore.hp
                myActiveStore.setHp(hisActiveStore.hp)
                hisActiveStore.setHp(myOldHp)
            } else {
                // TODO: misfire failure
            }
        },
    },
    {
        id: "255",
        // 'Opponent discards 4 top Cards from Online Deck.'
        effect: (who) => {
            const hisOnlineStore = getHisOnlineCardsStore(who);
            const hisOfflineStore = getHisOfflineCardsStore(who);
            for (let i = 0; i < 4; i++) {
                hisOfflineStore.setOffline(hisOnlineStore.topCard);
                hisOnlineStore.drawOne();
            }
        },
    },
    {
        id: "256",
        // "Own Attack Power, HP, and Specialty become same as the opponent's."
        effect: (who) => {
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            myActiveStore.setCpow(hisActiveStore.cPow)
            myActiveStore.setTpow(hisActiveStore.tPow)
            myActiveStore.setXpow(hisActiveStore.xPow)
            myActiveStore.setHp(hisActiveStore.hp)
            myActiveStore.setSpecialty(hisActiveStore.specialty)
        }
    },
    {
        id: "257",
        // 'Pick Partner Card from own Online Deck at random and put in own Hand.'
        // TODO
        effect: (who) => {
        },
    },
    {
        id: "258",
        // 'Change own Specialty to Fire. Boost own Attack Power +200.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setSpecialty(CONST.FIRE)
            myActiveStore.addAllPow(200)
        },
    },
    {
        id: "259",
        // 'Change own Specialty to Ice. Recover own HP by +200.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setSpecialty(CONST.ICE)
            myActiveStore.addHp(200)
        },
    },
    {
        id: "260",
        // 'Change own Specialty to Nature. Attack first.'
        // TODO game state
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setSpecialty(CONST.NATURE)
        },
    },
    {
        id: "261",
        // "Change own Specialty to Darkness. Both players' HP are halved."
        effect: (who) => {
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            myActiveStore.setSpecialty(CONST.DARKNESS)
            myActiveStore.setHp(Math.floor(parseInt(myActiveStore.hp) / 2))
            hisActiveStore.setHp(Math.floor(parseInt(hisActiveStore.hp) / 2))
        },
    },
    {
        id: "262",
        // 'Change own Specialty to Rare. Opponent discards 1 Card at random.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setSpecialty(CONST.RARE)
            myActiveStore.addAllPow(200)
            const hisHandStore = getHisHandCardsStore(who)
            hisHandStore.discardOne(hisHandStore.randomHand)
        },
    },
    {
        id: "263",
        // "Opponent's attack changes from {{button|c}} to {{button|t}}, {{button|t}} to {{button|x}}, or {{button|x}} to {{button|c}}."
        // TODO
        effect: (who) => {
        },
    },
    {
        id: "264",
        // 'Boost own Attack Power +300.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.addAllPow(300)
        },
    },
    {
        id: "265",
        // "Randomly discard 1 Card from own Hand. Opponent's Attack Power is 0."
        effect: (who) => {
            const myHandStore = getMyHandCardsStore(who)
            myHandStore.discardOne(myHandStore.randomHand)
            const hisActiveStore = getHisActiveCardsStore(who)
            hisActiveStore.setAllPow(0)
        },
    },
    {
        id: "266",
        // 'Recover own HP by +300.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.addHp(300)
        },
    },
    {
        id: "267",
        // 'Own {{button|c}} Attack Power is doubled.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setCpow(parseInt(myActiveStore.cPow) * 2)
        },
    },
    {
        id: "268",
        // 'Own {{button|t}} Attack Power is doubled.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setTpow(parseInt(myActiveStore.tPow) * 2)
        },
    },
    {
        id: "269",
        // 'Own {{button|x}} Attack Power is doubled.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setXpow(parseInt(myActiveStore.xPow) * 2)
        },
    },
    {
        id: "270",
        // "Opponent's {{button|c}} Attack Power is 0."
        effect: (who) => {
            const hisActiveStore = getHisActiveCardsStore(who);
            hisActiveStore.setCpow(0)
        },
    },
    {
        id: "271",
        // "Opponent's {{button|t}} Attack Power is 0."
        effect: (who) => {
            const hisActiveStore = getHisActiveCardsStore(who);
            hisActiveStore.setTpow(0)
        },
    },
    {
        id: "272",
        // "Opponent's {{button|x}} Attack Power is 0."
        effect: (who) => {
            const hisActiveStore = getHisActiveCardsStore(who);
            hisActiveStore.setXpow(0)
        },
    },
    {
        id: "273",
        // 'Boost own Attack Power +100.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.addAllPow(100)
        },
    },
    {
        id: "274",
        // 'Recover own HP by +100.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setHp(100)
        },
    },
    {
        id: "275",
        // "KO'd Digimon revives with 100 HP. Battle is still lost."
        // TODO: game state
        effect: (who) => {

        },
    },
    {
        id: "276",
        // 'Draw 2 Cards from Online Deck.'
        effect: (who) => {
            const myHandStore = getMyHandCardsStore(who)
            myHandStore.setOne()
            myHandStore.setOne()
        },
    },
    {
        id: "277",
        // 'Change own Specialty to Nature.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who)
            myActiveStore.setSpecialty(CONST.NATURE)
        },
    },
    {
        id: "278",
        // 'Changes own Specialty to Rare.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who)
            myActiveStore.setSpecialty(CONST.RARE)
        },
    },
    {
        id: "279",
        // 'Changes own Specialty to Fire.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who)
            myActiveStore.setSpecialty(CONST.FIRE)
        },
    },
    {
        id: "280",
        // 'Change own Specialty to Darkness.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who)
            myActiveStore.setSpecialty(CONST.DARKNESS)
        },
    },
    {
        id: "281",
        // 'Change own Specialty to Ice.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who)
            myActiveStore.setSpecialty(CONST.ICE)
        },
    },
    {
        id: "282",
        // 'Own attack becomes {{button|c}}.'
        // TODO: game state
        effect: (who) => {
        },
    },
    {
        id: "283",
        // 'Own attack becomes {{button|t}}.'
        // TODO: game state
        effect: (who) => {
        },
    },
    {
        id: "284",
        // 'Own attack becomes {{button|x}}.'
        // TODO: game state
        effect: (who) => {
        },
    },
    {
        id: "285",
        // 'Own Attack Power is tripled.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.setCpow(parseInt(myActiveStore.cPow) * 3);
            myActiveStore.setTpow(parseInt(myActiveStore.tPow) * 3);
            myActiveStore.setXpow(parseInt(myActiveStore.xPow) * 3);
        },
    },
    {
        id: "286",
        // 'Recover own HP by +1000.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.addHp(1000)
        },
    },
    {
        id: "287",
        // "If opponent's HP are lower then own, opponent's HP become 10."
        effect: (who) => {
            let { myActiveStore, hisActiveStore } = getBothActiveStore(who);
            if (hisActiveStore.hp < myActiveStore.hp) {
                hisActiveStore.setHp(10)
            }
        },
    },
    {
        id: "288",
        // 'Own Attack Power is boosted by the number of own HP.'
        effect: (who) => {
            const myActiveStore = getMyActiveCardsStore(who);
            myActiveStore.addAllPow(parseInt(myActiveStore.hp))
        },
    },
    {
        id: "289",
        // "Opponent's Support and Option Effects are voided. His Attack Power is 0."
        // TODO
        effect: (who) => {
        },
    },
    {
        id: "290",
        // 'Attack first. Own attack becomes "Eat-up HP." Boost Attack Power +200.'
        // TODO
        effect: (who) => {
        },
    },
    {
        id: "291",
        // 'Move top 10 Cards from Offline Pile to Online Deck, then shuffle.'
        effect: (who) => {
            const myOfflineStore = getMyOfflineCardsStore(who)
            for (let i = 0; i < 10; i++) {
                myOfflineStore.moveToOnlineCards()
            }
            const myOnlineStore = getMyOnlineCardsStore(who)
            myOnlineStore.shuffleCards()
        },
    },
    {
        id: "292",
        // 'Opponent discards his Hand and all Cards in his DP Slot.'
        effect: (who) => {
            const hisHandStore = getHisHandCardsStore()
            hisHandStore.discardAll()
            const hisDpStore = getHisDpStore()
            hisDpStore.flushAll()
        },
    },
    {
        id: "293",
        // 'Can digivolve regardless of own Specialty, Level, or Digivolve Pts.'
        effect: (who) => {
        },
    },
    {
        id: "294",
        // 'Digivolve a Level A Digimon to C or U. (DP are needed.)'
        effect: (who) => {
        },
    },
    {
        id: "295",
        // 'Can digivolve regardless of own Specialty by adding DP +20.'
        effect: (who) => {
        },
    },
    {
        id: "296",
        // 'Can digivolve Digimon at same Level. (Need DP) (Ignore Specialty)'
        effect: (who) => {
        },
    },
    {
        id: "297",
        // 'Can digivolve from R to U. (DP are needed.)'
        effect: (who) => {
        },
    },
    {
        id: "298",
        // 'Downgrade a Level A Digimon to Level R.'
        effect: (who) => {
        },
    },
    {
        id: "299",
        // 'Can disregard DP in digivolving. (Not possible in Abnormal states)'
        effect: (who) => {
        },
    },
    {
        id: "300",
        // 'DownGrade own digivolution by 1 Level. HP double when successful.'
        effect: (who) => {
        },
    },
];

export default all;