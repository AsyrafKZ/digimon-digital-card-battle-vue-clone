<template>
  <!-- if player -->
  <v-col v-if="who == 'player'" cols="auto">
    <v-row>
      <v-col align-self="center"> {{ playerOfflineCardsStore.count }} </v-col>
      <v-col><div class="offline-bg">OFFLINE</div></v-col>
    </v-row>
    <v-row>
      <v-col align-self="center"> {{ playerOnlineCardsStore.count }} </v-col>
      <v-col>
        <!-- <v-btn color="error" elevation="2" plain @click="redraw">Redraw</v-btn> -->
        <v-img
          class="deck mb-1"
          :src="'src/images/card-back.png'"
          height="100"
          width="85"
          cover
          @click="redraw('player')"
        ></v-img>
      </v-col>
    </v-row>
  </v-col>
  <!-- if opponent -->
  <v-col v-if="who == 'opponent'" cols="auto">
    <v-row>
      <v-col><div class="offline-bg">OFFLINE</div></v-col>
      <v-col> {{ oppOfflineCardsStore.count }} </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!-- <v-btn color="error" elevation="2" plain @click="redraw">Redraw</v-btn> -->
        <v-img
          class="deck mb-1"
          :src="'src/images/card-back.png'"
          height="100"
          width="85"
          cover
          @click="redraw('opp')"
        ></v-img>
      </v-col>
      <v-col> {{ oppOnlineCardsStore.count }} </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { mapStores } from "pinia";
import { usePlayerOnlineCardsStore } from "../stores/playerOnlineCards";
import { usePlayerOfflineCardsStore } from "../stores/playerOfflineCards";
import { usePlayerHandCardsStore } from "../stores/playerHandCards";
import { useOppOnlineCardsStore } from "../stores/oppOnlineCards";
import { useOppOfflineCardsStore } from "../stores/oppOfflineCards";
import { useOppHandCardsStore } from "../stores/oppHandCards";

export default {
  props: ["who"],
  data() {
    return {};
  },
  computed: {
    ...mapStores(
      usePlayerOnlineCardsStore,
      usePlayerOfflineCardsStore,
      usePlayerHandCardsStore,
      useOppOnlineCardsStore,
      useOppOfflineCardsStore,
      useOppHandCardsStore
    ),
  },
  methods: {
    redraw: function (whoDraw) {
      if (whoDraw == 'player') {
        this.playerHandCardsStore.discardAll();
        this.playerHandCardsStore.setAll();
      } else{
        this.oppHandCardsStore.discardAll();
        this.oppHandCardsStore.setAll();
      }
    },
  },
};
</script>

<style scoped>
.deck {
  transition: 0.2s ease-out;
}
.deck:hover {
  box-shadow: 0px 0px 30px 0px #afe0f5;
  cursor: pointer;
  transition: 0.2s ease-out;
}
.offline-bg {
  background: rgba(200, 200, 200, 0.1);
  border: 2px solid silver;
  border-radius: 7%;
  display: flex;
  justify-content: center;
  padding: 0px;
  margin: 0px;
  width: 85px;
  height: 30px;
  color: red;
  text-align: center;
}
</style>