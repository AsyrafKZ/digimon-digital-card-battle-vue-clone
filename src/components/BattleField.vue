<template>
  <v-row class="player-board" :justify="center" :align="center">
    <!-- Player A DP -->
    <v-col cols="auto">
      <v-col> {{ playerDpStore.dp }} </v-col>
    </v-col>
    <!-- Player A Playing Card -->
    <ActiveMonsterCard v-if="isPlayerMonsterCard" />
    <EmptyCard v-else />
    <!-- Player A Option Card -->
    <v-col v-show="turn == '3'" cols="auto">
      <OptionCard
        v-if="isPlayerOptionCard"
        :id="playerOptionId"
        :status="'playCard'"
      />
      <EmptyCard v-else />
    </v-col>
    <!-- Player B Option Card -->
    <v-col v-show="turn == '3'" cols="auto">
      <OppOptionCard
        v-if="isOppOptionCard"
        :id="oppOptionId"
        :status="'playCard'"
      />
      <EmptyCard v-else />
    </v-col>
    <!-- Player B Playing Card -->
    <OppActiveMonsterCard v-if="isOppMonsterCard" />
    <EmptyCard v-else />
    <!-- Player B DP -->
    <v-col cols="auto">
      <v-col> {{ oppDpStore.dp }} </v-col>
    </v-col>
  </v-row>
  <!-- Battle Window -->
  <AttackSelectWindow />
</template>

<script>
import OptionCard from "./OptionCard.vue";
import OppOptionCard from "./OppOptionCard.vue";
import EmptyCard from "./EmptyCard.vue";
import ActiveMonsterCard from "./ActiveMonsterCard.vue";
import OppActiveMonsterCard from "./OppActiveMonsterCard.vue";
import AttackSelectWindow from "./AttackSelectWindow.vue";
import { mapStores } from "pinia";
import { usePlayerActiveCardsStore } from "../stores/playerActiveCards";
import { usePlayerDpStore } from "../stores/playerDp";
import { useOppActiveCardsStore } from "../stores/oppActiveCards";
import { useOppDpStore } from "../stores/oppDp";
import { useGameStateStore } from "../stores/gameState";
import { CONST } from "@/const/const";

export default {
  components: {
    OptionCard,
    OppOptionCard,
    EmptyCard,
    ActiveMonsterCard,
    OppActiveMonsterCard,
    AttackSelectWindow,
  },
  data() {
    return {
      playerActiveMonster: "",
      playerActiveOption: "",
      opponentActiveMonster: "",
      opponentActiveOption: "",
      turn: "3",
      center: "center",
    };
  },
  computed: {
    ...mapStores(
      usePlayerActiveCardsStore,
      usePlayerDpStore,
      useOppActiveCardsStore,
      useOppDpStore,
      useGameStateStore
    ),
    playerOptionId() {
      return this.playerActiveCardsStore.optionId;
    },
    oppOptionId() {
      return this.oppActiveCardsStore.optionId;
    },
    isPlayerMonsterCard() {
      return this.isCard(this.playerActiveCardsStore.battleId);
    },
    isOppMonsterCard() {
      return this.isCard(this.oppActiveCardsStore.battleId);
    },
    isPlayerOptionCard() {
      return this.isCard(this.playerActiveCardsStore.optionId);
    },
    isOppOptionCard() {
      return this.isCard(this.oppActiveCardsStore.optionId);
    },
  },
  watch: {
    "gameStateStore.phase": function (currentPhase) {
      console.log("----- NEW PHASE -----");
      console.log(`----- ${currentPhase} -----`);
      if (currentPhase == CONST.PHASE.BATTLE) {
        this.gameStateStore.startBattle();
      }
    },
  },
  methods: {
    isCard: function (cardId) {
      const id = cardId;
      if (id > -1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
</style>