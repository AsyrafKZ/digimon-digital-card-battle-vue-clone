<template>
  <!-- Player A Hand -->
  <v-row class="my-1 player-side" justify="center" align="center">
    <!-- OnlineCards -->
    <OnlineCards :who="player" />
    <!-- Hand Cards -->
    <HandCards />
    <!-- Win Count -->
    <v-col>
      <div class="win-bar"></div>
      <div class="win-bar"></div>
      <div class="win-bar"></div>
    </v-col>
  </v-row>
  <!-- Player A Info -->
  <v-row class="my-1 text-center" justify="center" align="center">
    <v-col > {{ deckName }} </v-col>
    <v-col > {{ playerName }} </v-col>
  </v-row>
</template>

<script>
import { CONST } from "@/const/const";
import OnlineCards from "./OnlineCards.vue";
import HandCards from "./HandCards.vue";

export default {
  components: {
    OnlineCards,
    HandCards,
  },
  data() {
    return {
      playerName: "Player A",
      deckName: "Tricolor Deck",
      center: "center",
      player: null,
    };
  },
  created: function () {
    this.player = CONST.PLAYER;
  },
};
</script>

<style scoped>
.player-info {
  border: 1px solid blue;
}
.player-board {
  border: 1px solid yellow;
}
.win-bar {
  background: green;
  border: 2px solid greenyellow;
  border-radius: 15%;
  display: flex;
  justify-content: center;
  padding: 0px;
  margin: 9px 0px;
  width: 85px;
  height: 35px;
  color: red;
  text-align: center;
}
.v-col {
  max-width: fit-content;
}
.player-side {
  /* blue-darken-4 */
  background: #0D47A1;
}
</style>