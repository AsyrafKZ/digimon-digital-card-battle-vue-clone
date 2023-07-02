<template>
  <!-- Player B Info -->
  <v-row class="my-0 text-center text-h6 opp-side" justify="space-evenly">
    <v-col class="my-0 py-0"> {{ deckName }} </v-col>
    <v-col class="ma-0 pa-0 divider"></v-col>
    <v-col class="my-0 py-0"> {{ playerName }} </v-col>
  </v-row>
  <!-- Player B Hand class="opp-side" -->
  <v-row class="mt-1" justify="center" align="center">
    <!-- Win Count -->
    <v-col class="win-bars ma-0 pa-0">
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
.win-bars {
  /* orange-darken-4 */
  background: #E65100;
  height: 130px;
  border-right: 10px solid #E65100;
  border-left: 3px solid #E65100;
  border-bottom-left-radius: 5%;
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
.opp-side .v-col {
  max-width: 322px;
}
.opp-side {
  /* orange-darken-2 */
  background: #f57c00;
  width: 644px;
  position: relative;
  top: 4px;
  left: 107px;
}
.opp-side .v-col.divider {
  max-width: 1px;
  border-right: 5px solid #E65100
}
</style>