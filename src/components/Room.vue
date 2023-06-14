<template>
  <v-container>
    <Board />
    <PlayerInfo />
  </v-container>
</template>

<script>
import { io } from "socket.io-client";
import Board from "@/components/Board.vue";
import PlayerInfo from "@/components/PlayerInfo.vue";

import { mapStores } from "pinia";
import { useCardsStore } from "../stores/cards";
import { usePlayerOnlineCardsStore } from "../stores/playerOnlineCards";
import { usePlayerHandCardsStore } from "../stores/playerHandCards";
import { useOppOnlineCardsStore } from "../stores/oppOnlineCards";
import { useOppHandCardsStore } from "../stores/oppHandCards";

export default {
  components: {
    Board,
    PlayerInfo,
  },
  data() {
    return {
      socket: undefined,
      socketId: "",
      roomId: "",
      playerId: "",
      opponentId: "",
    };
  },
  computed: {
    ...mapStores(
      useCardsStore,
      usePlayerOnlineCardsStore,
      usePlayerHandCardsStore,
      useOppOnlineCardsStore,
      useOppHandCardsStore,
    ),
  },
  created: async function () {
    // Setup socket.io
    this.socket = io("http://localhost:5005");
    this.socket.on("welcome-message", (message) => {
      console.log(message);
      this.socketId = this.socket.id;
      this.socket.emit("tell-id", this.socketId);
    });

    // ref data from store
    // this.playerCardsStore = usePlayerCardsStore();
    // this.cardsStore = useCardsStore();

    // get players info
    // there should be some parameter that is passed from landing page. for now dummyUserId
    // dummy user
    const dummyUserId1 = "1";
    const dummyDeckId1 = "4";
    const betamonId = "2";
    const betamonDeckId = "1";
    // await this.playerCardsStore.setUserCards(dummyUserId1, dummyDeckId1);
    await this.playerOnlineCardsStore.setCards(dummyUserId1, dummyDeckId1);
    await this.oppOnlineCardsStore.setCards(betamonId, betamonDeckId);
    // using that same parameter, get all cards for the match
    await this.cardsStore.getCardsGame(this.playerOnlineCardsStore.cards);
    await this.cardsStore.getCardsGame(this.oppOnlineCardsStore.cards);

    this.playerHandCardsStore.setActiveMonsterCard("027");
    this.playerHandCardsStore.setActiveOptionCard("211");
    this.oppHandCardsStore.setActiveMonsterCard("156");
    this.oppHandCardsStore.setActiveOptionCard("231");
  },
  mounted: async function () {
    // register Socket.IO event listeners
    this.listen();
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
  methods: {
    listen: function () {
      this.socket.on("user-id", (userId) => {
        console.log(`Opponent connected! ID: ${userId}`);
      });
      this.socket.on("opponent-disconnect", (userId) => {
        console.log(`Opponent disconnected! ID: ${userId}`);
      });
      this.socket.on("opponent-draw-card", (count) => {
        this.opponentOnlineCount = count;
        console.log("run");
      });
    },
  },
};
</script>

<style>
</style>