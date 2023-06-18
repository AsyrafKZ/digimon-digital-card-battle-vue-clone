<template>
  <v-col cols="1">
    <OppMonsterCard :id="id" :status="'playCard'" />
  </v-col>
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
</template>

<script>
import OppMonsterCard from "./OppMonsterCard.vue";
import { mapStores } from "pinia";
import { useOppActiveCardsStore } from "../stores/oppActiveCards";

export default {
  components: {
    OppMonsterCard,
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
      this.hp = this.oppActiveCardsStore.battleCard.hp
        ? this.oppActiveCardsStore.battleCard.hp
        : "";
      this.cPow = this.oppActiveCardsStore.battleCard.cPow
        ? this.oppActiveCardsStore.battleCard.cPow
        : "";
      this.tPow = this.oppActiveCardsStore.battleCard.tPow
        ? this.oppActiveCardsStore.battleCard.tPow
        : "";
      this.xPow = this.oppActiveCardsStore.battleCard.xPow
        ? this.oppActiveCardsStore.battleCard.xPow
        : "";
  },
  computed: {
    ...mapStores(useOppActiveCardsStore),
    id() {
        return this.oppActiveCardsStore.battleCard.id;
    },
    xEffect() {
        return this.oppActiveCardsStore.battleCard.xEffect;
    },
  },
  watch: {
    "oppActiveCardsStore.battleCard.cPow"() {
      clearInterval(this.cPowInterval);

      if (this.oppActiveCardsStore.battleCard.cPow == this.cPow) {
        return;
      }

      this.cPowInterval = window.setInterval(() => {
        if (this.cPow != this.oppActiveCardsStore.battleCard.cPow) {
          let change =
            (parseInt(this.oppActiveCardsStore.battleCard.cPow) -
              parseInt(this.cPow)) /
            10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.cPow = parseInt(this.cPow) + change;
        }
      }, 25);
    },
    "oppActiveCardsStore.battleCard.tPow"() {
      clearInterval(this.tPowInterval);

      if (this.oppActiveCardsStore.battleCard.tPow == this.tPow) {
        return;
      }

      this.tPowInterval = window.setInterval(() => {
        if (this.tPow != this.oppActiveCardsStore.battleCard.tPow) {
          let change =
            (parseInt(this.oppActiveCardsStore.battleCard.tPow) -
              parseInt(this.tPow)) /
            10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.tPow = parseInt(this.tPow) + change;
        }
      }, 25);
    },
    "oppActiveCardsStore.battleCard.xPow"() {
      clearInterval(this.xPowInterval);

      if (this.oppActiveCardsStore.battleCard.xPow == this.xPow) {
        return;
      }

      this.xPowInterval = window.setInterval(() => {
        if (this.xPow != this.oppActiveCardsStore.battleCard.xPow) {
          let change =
            (parseInt(this.oppActiveCardsStore.battleCard.xPow) -
              parseInt(this.xPow)) /
            10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.xPow = parseInt(this.xPow) + change;
        }
      }, 25);
    },
    "oppActiveCardsStore.battleCard.hp"() {
      clearInterval(this.hpInterval);

      if (this.oppActiveCardsStore.battleCard.hp == this.hp) {
        return;
      }

      this.hpInterval = window.setInterval(() => {
        if (this.hp != this.oppActiveCardsStore.battleCard.hp) {
          let change =
            (parseInt(this.oppActiveCardsStore.battleCard.hp) -
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