<template>
  <v-row class="my-4" :justify="center" :align="center">
    <!-- Player A DP -->
    <DpSlot :who="'player'"/>
    <!-- Player A Playing Card -->
    <ActiveMonsterCard />
    <!-- Player A Option Card -->
    <ActiveOptionCard v-if="isPlayerOptionCard" v-show="turn == '3'" />
    <EmptyCard v-show="turn == '3'" v-else />
    <!-- Player B Option Card -->
    <OppActiveOptionCard v-if="isOppOptionCard" v-show="turn == '3'" />
    <EmptyCard v-show="turn == '3'" v-else />
    <!-- Player B Playing Card -->
    <OppActiveMonsterCard v-if="isOppMonsterCard" />
    <EmptyCard v-else />
    <DpSlot :who="'opp'" />
  </v-row>
  <!-- Battle Window -->
  <v-row v-show="turn == '3'">
    <AttackSelectWindow class="my-4" />
  </v-row>
</template>

<script>
import OptionCard from "./OptionCard.vue";
import OppOptionCard from "./OppOptionCard.vue";
import EmptyCard from "./EmptyCard.vue";
import ActiveMonsterCard from "./ActiveMonsterCard.vue";
import OppActiveMonsterCard from "./OppActiveMonsterCard.vue";
import AttackSelectWindow from "./AttackSelectWindow.vue";
import ActiveOptionCard from "./ActiveOptionCard.vue";
import OppActiveOptionCard from "./OppActiveOptionCard.vue";
import DpSlot from "./DpSlot.vue"
import { mapStores } from "pinia";
import { usePlayerActiveCardsStore } from "../stores/playerActiveCards";
import { useOppActiveCardsStore } from "../stores/oppActiveCards";
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
    ActiveOptionCard,
    OppActiveOptionCard,
    DpSlot,
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
      useOppActiveCardsStore,
      useGameStateStore
    ),
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