<template>
  <!-- Player A Hand class="player-side" -->
  <v-row class="mb-1" justify="center" align="center">
    <!-- OnlineCards -->
    <OnlineCards :who="player" />
    <!-- Hand Cards -->
    <HandCards />
    <!-- Win Count -->
    <v-col class="win-bars ma-0 pa-0">
      <div class="win-bar"></div>
      <div class="win-bar"></div>
      <div class="win-bar"></div>
    </v-col>
  </v-row>
  <!-- Player A Info -->
  <v-row class="text-center text-h6 player-side" justify="space-evenly">
    <v-col class="my-0 py-0"> {{ deckName }} </v-col>
    <v-col class="ma-0 pa-0 divider"></v-col>
    <v-col class="my-0 py-0"> {{ playerName }} </v-col>
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
.win-bars {
  /* orange-darken-4 */
  background: #0D47A1;
  height: 130px;
  border-right: 3px solid #0D47A1;
  border-left: 10px solid #0D47A1;
  border-top-right-radius: 5%;
}
.win-bar {
  background: green;
  border: 2px solid greenyellow;
  border-radius: 15%;
  display: flex;
  justify-content: center;
  padding: 0px;
  margin: 9px 0px;
  width: 65px;
  height: 30px;
  color: red;
  text-align: center;
}
.v-col {
  max-width: fit-content;
}
.player-side .v-col {
  max-width: 322px;
}
.player-side {
  /* blue-darken-2 */
  background: #1976d2;
  width: 644px;
  position: relative;
  top: 8px;
  left: 107px;
}
.player-side .v-col.divider {
  max-width: 1px;
  border-right: 5px solid #0D47A1
}
</style>