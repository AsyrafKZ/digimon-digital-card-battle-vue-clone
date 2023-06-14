<template>
  <!-- Player B Info -->
  <v-row>
    <v-col class="player-info" cols="6"> {{ deckName }} </v-col>
    <v-col class="player-info" cols="6"> {{ playerName }} </v-col>
  </v-row>
  <!-- Player B Hand -->
  <v-row class="player-board my-1" :justify="center" :align="center">
    <!-- Win Count -->
    <v-col cols="auto">
      <div class="win-bar"></div>
      <div class="win-bar"></div>
      <div class="win-bar"></div>
    </v-col>
    <!-- Hand Cards -->
    <OppHandCards />
    <!-- Decks -->
    <OnlineCards :who="opp" />
  </v-row>
</template>

<script>
import { CONST } from '@/const/const';
import OnlineCards from "./OnlineCards.vue";
import OppHandCards from "./OppHandCards.vue";

export default {
  components: {
    OnlineCards,
    OppHandCards,
  },
  data() {
    return {
      playerName: "Betamon",
      deckName: "Tutorial Deck",
      center: "center",
      opp: null,
    };
  },
  created: function () {
    this.opp = CONST.OPP
  }
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
</style>