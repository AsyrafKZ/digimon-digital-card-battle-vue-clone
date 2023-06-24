<template>
  <!-- if player -->
  <div
    class="d-flex flex-column flex-no-wrap align-center justify-content player-stacks"
    v-if="who == 'player'"
  >
    <v-card class="player-top-card" theme="dark">
      <div class="offline d-flex flex-row">
        <div class="count text-h6 align-center">
          {{ playerOfflineCardsStore.count }}
        </div>
        <div class="offline-outer">
          <div id="playerOffline" class="offline-bg text-body-2">OFFLINE</div>
        </div>
      </div>
    </v-card>
    <v-card class="player-bottom-card" theme="dark">
      <div class="online d-flex flex-row">
        <div class="count text-h6 align-center">
          {{ playerOnlineCardsStore.count }}
        </div>
        <div id="playerDeck" class="deck-holder">
          <v-img
            class="deck player mb-1"
            :src="'src/images/card-back.png'"
            width="55"
            height="75"
            @click="redraw('player')"
          ></v-img>
        </div>
      </div>
    </v-card>
  </div>
  <!-- if opponent -->
  <div
    class="d-flex flex-column flex-no-wrap align-center justify-content opp-stacks"
    v-if="who == 'opponent'"
  >
    <v-card class="opp-top-card" theme="dark">
      <div class="offline d-flex flex-row">
        <div class="offline-bg ml-2">OFFLINE</div>
        <div class="count text-h6 align-center">
          {{ oppOfflineCardsStore.count }}
        </div>
      </div>
    </v-card>
    <v-card class="opp-bottom-card" theme="dark">
      <div class="online d-flex flex-row">
        <div id="oppDeck" class="deck-holder">
          <v-img
            class="deck opp mb-1"
            :src="'src/images/card-back.png'"
            width="70"
            height="85"
            @click="redraw('opp')"
          ></v-img>
        </div>
        <div class="count text-h6 align-center">
          {{ oppOnlineCardsStore.count }}
        </div>
      </div>
    </v-card>
  </div>
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
    redraw: async function (whoDraw) {
      if (whoDraw == "player") {
        await this.playerHandCardsStore.discardAll();
        this.playerHandCardsStore.setAll();
      } else {
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
  left: 5px;
}
.deck:hover {
  box-shadow: 0px 0px 15px 0px #afe0f5;
  cursor: pointer;
  transition: 0.2s ease-out;
}
.deck.player {
  rotate: -90deg;
}
.deck.opp {
  rotate: 90deg;
}
.offline-outer {
  width: 70px;
  height: 55px;
}
.offline-bg {
  background: rgba(200, 200, 200, 0.1);
  border: 1px solid silver;
  border-radius: 7%;
  color: rgba(200, 200, 200, 0.7);
  width: 65px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:5px;
}
.online {
  height: 70px;
}
.count {
  width: 40px;
  text-align: center;
  align-self: center;
}
.player-top-card,
.player-bottom-card {
  /* blue-darken-2 */
  background: #1976d2;
  width: 125px;
  border-radius: 0%;
}
.player-top-card {
  /* blue-darken-4 */
  border-bottom: 1px solid #0d47a1;
}
.player-bottom-card {
  /* blue-darken-4 */
  border-top: 1px solid #0d47a1;
  overflow: visible;
}
.player-stacks {
  border-bottom: 4px solid #0d47a1;
  border-left: 4px solid #0d47a1;
  border-right: 2px solid #0d47a1;
}
.opp-top-card,
.opp-bottom-card {
  /* orange-darken-2 */
  background: #f57c00;
  width: 125px;
  border-radius: 0%;
}
.opp-top-card {
  /* orange-darken-4 */
  border-bottom: 1px solid #e65100;
}
.opp-bottom-card {
  /* orange-darken-4 */
  border-top: 1px solid #e65100;
}
.opp-stacks {
  border-top: 4px solid #e65100;
  border-left: 4px solid #e65100;
  border-right: 2px solid #e65100;
}
.opp-bottom-card .online {
  justify-content: flex-end;
}
</style>