<template>
  <v-container class="fill-height justify-center bg-grey-darken-4">
    <!-- Main Board -->
    <v-container class="board">
      <!-- Player B -->
      <Opponent />
      <!-- Battle Field -->
      <BattleField />
      <!-- Player A -->
      <Player/>
    </v-container>
  </v-container>
</template>

<style scoped>
.board {
  border: 1px solid red;
}
.player-board {
  border: 1px solid yellow;
}
</style>

<script>
import MonsterCard from "./MonsterCardOld.vue";
import Player from "./Player.vue"
import Opponent from "./Opponent.vue"
import BattleField from "./BattleField.vue"

import { storeToRefs, mapStores } from "pinia";
import { useCardsStore } from "../stores/cards";
import { CONST } from "../const/const"

export default {
  components: {
    MonsterCard,
    Player,
    Opponent,
    BattleField,
  },
  data() {
    return {
      // Socket IO
      test: false,
      deckName: "Red Deck",
      deckNameInput: "",
      playerName: "Player",
      playerNameInput: "",
      turn: "3",
      // temp json files. TODO: tukar ke DB?
      cards: [],
      monsterCards: [],
      optionCards: [],
      // player
      playerOnlineCards: [],
      playerOnlineCount: 0,
      playerHand1: {},
      playerHand2: {},
      playerHand3: {},
      playerHand4: {},
      playerDpCards: [],
      playerDpCount: 0,
      playerActiveMonster: {},
      playerActiveOption: {},
      playerOfflineCards: [],
      playerOfflineCount: 0,
      playerLostCount: 0,
      // opponent
      opponentOnlineCards: [],
      opponentOnlineCount: 26,
      opponentHand1: {},
      opponentHand2: {},
      opponentHand3: {},
      opponentHand4: {},
      opponentDpCards: [],
      opponentDpCount: "",
      opponentActiveMonster: {},
      opponentActiveOption: {},
      opponentOfflineCards: [],
      opponentOfflineCount: 0,
      opponentLostCount: "",
      card: {
        level: "",
        colorTop: "",
        colorBottom: "",
        specialty: "",
        imgSrc: "src/images/monsters/",
      },
      specialtyList: [
        {
          specialty: "Fire",
          topColor: "red",
          bottomColor: "#E57373", // vuetify color lighten-2
        },
        {
          specialty: "Ice",
          topColor: "blue",
          bottomColor: "#64B5F6", // vuetify color lighten-2
        },
        {
          specialty: "Nature",
          topColor: "green",
          bottomColor: "#81C784", // vuetify color lighten-2
        },
        {
          specialty: "Darkness",
          topColor: "black",
          bottomColor: "#616161", // vuetify color darken-2
        },
        {
          specialty: "Rare",
          topColor: "#ffc107", // vuetify amber base
          bottomColor: "#fff176", // vuetify color lighten-2
        },
      ],
      center: "center",
    };
  },
  computed: {
    ...mapStores(useCardsStore)
  },
  created: async function () {
    // ref data from store
    // this.cardsStore = useCardsStore();
    // this.playerCardsStore = usePlayerStore();

    // cards
    // await this.cardsStore.getAllCards();
    // this.cards = this.cardsStore.allCards;
    // this.monsterCards = this.cardsStore.monsterCards;
    // this.optionCards = this.cardsStore.optionCards;

    // player deck prep
    // this.playerCardsStore.setOnlineCards(this.cards);
    // console.log("online cards", this.playerCardsStore.onlineCards)
    // this.playerCardsStore.setHands("fullRedraw");
  },
  mounted: async function () {
    // this.playerOnlineCards = this.playerCardsStore.onlineCards;

    // player hand prep
    // this.playerCardsStore.setHands("fullRedraw");
    // this.playerHand1 = this.playerCardsStore.handCards.hand1;
    // this.playerHand2 = this.playerCardsStore.handCards.hand2;
    // this.playerHand3 = this.playerCardsStore.handCards.hand3;
    // this.playerHand4 = this.playerCardsStore.handCards.hand4;

    // const { onlineCount } = storeToRefs(this.playerCardsStore);
    // this.playerOnlineCount = onlineCount;
    // this.playerOnlineCount = this.playerCardsStore.onlineCount;

    // TODO: remove this. player active cards
    // this.playerActiveMonster = this.createMonsterCard(
    //   this.monsterCards[Math.floor(Math.random() * this.monsterCards.length)]
    // );
    // this.playerActiveOption = this.createOptionCard(
    //   this.optionCards[Math.floor(Math.random() * this.optionCards.length)]
    // );
    // emit player cards TODO: bagi list of card ids? bagi direct this.playerOnlineCards?
    // this.socket.emit("finish-prep", this.socketId);
  },
  
  methods: {
    createMonsterCard: function (target) {
      let card = {
        ...target,
        level: target.level,
        specialty: target.specialty,
        imgSrc: "src/images/monsters/" + target.number + ".jpg",
        colorTop: "",
        colorBottom: "",
      };
      for (let index = 0; index < this.specialtyList.length; index++) {
        const specialty = this.specialtyList[index];
        if (card.specialty == specialty.specialty) {
          card.colorTop = specialty.topColor;
          card.colorBottom = specialty.bottomColor;
          break;
        }
      }
      return card;
    },
    createOptionCard: function (target) {
      const card = {
        ...target,
        imgSrc: "src/images/options/" + target.number + ".png",
      };
      return card;
    },
    redrawHand: function () {
      // TODO: iffy logic. fix this.
      if (this.playerOnlineCount == 0) {
        alert("Out of cards. YOU LOSE");
      }
      if (thisplayerOnlineCount.playerOnlineCount >= 1) {
        this.playerHand1 = this.drawCard();
        this.playerOfflineCount += 1;
      }
      if (this.playerOnlineCount >= 2) {
        this.playerHand2 = this.drawCard();
        this.playerOfflineCount += 1;
      }
      if (this.playerOnlineCount >= 3) {
        this.playerHand3 = this.drawCard();
        this.playerOfflineCount += 1;
      }
      if (this.playerOnlineCount >= 4) {
        this.playerHand4 = this.drawCard();
        this.playerOfflineCount += 1;
      }
      this.socket.emit("draw-card", this.playerOnlineCount);
    },
    drawCard: function () {
      const card = this.playerOnlineCards[0];
      this.playerOnlineCards.shift();
      this.playerOnlineCount = this.playerOnlineCards.length;
      if (card.number < CONST.FIRST_OPTION_CARD_ID) {
        const monsterCard = this.createMonsterCard(card);
        return monsterCard;
      } else {
        const optionCard = this.createOptionCard(card);
        return optionCard;
      }
    },
    moveCard: function () {
      alert("clicked");
    },
    // selectCard: function () {
    //   console.log("active", this.playerActiveMonster);
    //   this.playerActiveMonster = this.playerHand1;
    //   this.playerHand1 = {};
    //   console.log("active 2", this.playerActiveMonster);
    // },
    updateName: function () {
      this.deckName = this.deckNameInput;
      this.playerName = this.playerNameInput;
    },
  },
};
</script>
