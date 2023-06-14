<template>
  <v-col cols="1">
    <v-row>
      <v-col>
        〇 : {{ cPow }}
        <br />
        △ : {{ tPow }}
        <br />
        ✕ : {{ xPow }}
        <br />
        {{ xEffect }}
      </v-col>
    </v-row>
    <v-row>
      <v-col> HP : {{ hp }} </v-col>
    </v-row>
  </v-col>
  <v-col cols="1">
    <MonsterCard :id="id" :status="'playCard'" />
  </v-col>
</template>

<script>
import MonsterCard from "./MonsterCard.vue";
import { mapStores } from "pinia";
import { usePlayerActiveCardsStore } from "../stores/playerActiveCards";

export default {
  components: {
    MonsterCard,
  },
  data() {
    return {
      cPow: "0",
      cPowInterval: false,
      tPow: "0",
      tPowInterval: false,
      xPow: "0",
      xPowInterval: false,
      hp: "0",
      hpInterval: false,
    };
  },
  ready() {
      this.hp = this.playerActiveCardsStore.battleCard.hp
        ? this.playerActiveCardsStore.battleCard.hp
        : "";
      this.cPow = this.playerActiveCardsStore.battleCard.cPow
        ? this.playerActiveCardsStore.battleCard.cPow
        : "";
      this.tPow = this.playerActiveCardsStore.battleCard.tPow
        ? this.playerActiveCardsStore.battleCard.tPow
        : "";
      this.xPow = this.playerActiveCardsStore.battleCard.xPow
        ? this.playerActiveCardsStore.battleCard.xPow
        : "";
  },
  computed: {
    ...mapStores(usePlayerActiveCardsStore),
    id() {
        return this.playerActiveCardsStore.battleCard.id;
    },
    xEffect() {
        return this.playerActiveCardsStore.battleCard.xEffect;
    },
  },
  watch: {
    "playerActiveCardsStore.battleCard.cPow"() {
      clearInterval(this.cPowInterval);

      if (this.playerActiveCardsStore.battleCard.cPow == this.cPow) {
        return;
      }

      this.cPowInterval = window.setInterval(() => {
        if (this.cPow != this.playerActiveCardsStore.battleCard.cPow) {
          let change =
            (parseInt(this.playerActiveCardsStore.battleCard.cPow) -
              parseInt(this.cPow)) /
            10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.cPow = parseInt(this.cPow) + change;
        }
      }, 25);
    },
    "playerActiveCardsStore.battleCard.tPow"() {
      clearInterval(this.tPowInterval);

      if (this.playerActiveCardsStore.battleCard.tPow == this.tPow) {
        return;
      }

      this.tPowInterval = window.setInterval(() => {
        if (this.tPow != this.playerActiveCardsStore.battleCard.tPow) {
          let change =
            (parseInt(this.playerActiveCardsStore.battleCard.tPow) -
              parseInt(this.tPow)) /
            10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.tPow = parseInt(this.tPow) + change;
        }
      }, 25);
    },
    "playerActiveCardsStore.battleCard.xPow"() {
      clearInterval(this.xPowInterval);

      if (this.playerActiveCardsStore.battleCard.xPow == this.xPow) {
        return;
      }

      this.xPowInterval = window.setInterval(() => {
        if (this.xPow != this.playerActiveCardsStore.battleCard.xPow) {
          let change =
            (parseInt(this.playerActiveCardsStore.battleCard.xPow) -
              parseInt(this.xPow)) /
            10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.xPow = parseInt(this.xPow) + change;
        }
      }, 25);
    },
    "playerActiveCardsStore.battleCard.hp"() {
      clearInterval(this.hpInterval);

      if (this.playerActiveCardsStore.battleCard.hp == this.hp) {
        return;
      }

      this.hpInterval = window.setInterval(() => {
        if (this.hp != this.playerActiveCardsStore.battleCard.hp) {
          let change =
            (parseInt(this.playerActiveCardsStore.battleCard.hp) -
              parseInt(this.hp)) /
            10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.hp = parseInt(this.hp) + change;
        }
      }, 25);
    },
  },
};
</script>

<style>
</style>