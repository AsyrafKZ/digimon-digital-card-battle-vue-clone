<template>
  <v-card theme="dark">
    <v-card-title class="name ma-0 pa-0 pt-1 pl-1">
      {{ oppActiveCardsStore.battleCard.name }}
    </v-card-title>
    <div class="d-flex card-slot">
      <OppMonsterCard class="ma-0 ml-1" :id="id" :status="playCard" />
      <v-card-item class="ma-0 pa-0">
        <div>
          <v-list-item
            v-for="(attack, i) in attacks"
            :key="i"
            :class="attack.color"
            density="compact"
            class="px-1 py-0"
          >
            <template v-slot:prepend>
              <v-icon v-if="attack.icon" :icon="attack.icon"></v-icon>
            </template>
            <span v-if="attack.powClass" v-bind:id="attack.id" :class="attack.powClass" class="text-right"></span>
            <span v-else class="text-body-2 align-left"> {{ attack.val }}</span>
          </v-list-item>
          <!-- <span v-if="false" class="cPowChange">{{ cPowChange }}</span>
          <span v-if="false" class="tPowChange">{{ tPowChange }}</span> -->
        </div>
      </v-card-item>
    </div>
  </v-card>
</template>

<script>
import OppMonsterCard from "./OppMonsterCard.vue";
import { mapStores } from "pinia";
import { useOppActiveCardsStore } from "../stores/oppActiveCards";
import { CONST } from '@/const/const';
import anime from "animejs";

export default {
  components: {
    OppMonsterCard,
  },
  data() {
    return {
      cPow: "0",
      tPow: "0",
      xPow: "0",
      hp: "0",
      cPowChange: "+0",
      tPowChange: "+100",
      playCard: CONST.PLAY_CARD,
    };
  },
  mounted() {
    this.cPow = this.animateValChange(
      this.oppActiveCardsStore.battleCard.cPow,
      "#oppCpow"
    );
    this.tPow = this.animateValChange(
      this.oppActiveCardsStore.battleCard.tPow,
      "#oppTpow"
    );
    this.xPow = this.animateValChange(
      this.oppActiveCardsStore.battleCard.xPow,
      "#oppXpow"
    );
    this.hp = this.animateValChange(
      this.oppActiveCardsStore.battleCard.hp,
      "#oppHp"
    );
  },
  computed: {
    ...mapStores(useOppActiveCardsStore),
    id() {
        return this.oppActiveCardsStore.battleCard.id;
    },
    xEffect() {
        return this.oppActiveCardsStore.battleCard.xEffect;
    },
    playerCard() {
      return this.oppActiveCardsStore.battleCard
    },
    attacks() {
      return [
        {
          id: `oppCpow`,
          val: this.playerCard.cPow,
          icon: "mdi-circle-outline",
          color: "bg-red",
          powClass: "cPow",
        },
        {
          id: `oppTpow`,
          val: this.playerCard.tPow,
          icon: "mdi-triangle-outline",
          color: "bg-green",
          powClass: "tPow",
        },
        {
          id: `oppXpow`,
          val: this.playerCard.xPow,
          icon: "mdi-window-close",
          color: "bg-blue",
          powClass: "xPow",
        },
        {
          id: `oppXeff`,
          val: this.playerCard.xEffect,
          icon: "",
          color: "bg-blue-darken-1",
          powClass: "",
        },
      ]
    },
    cardId() {
      return `id${this.id}`;
    },
  },
  watch: {
    id() {
      this.animateValChange(
        this.oppActiveCardsStore.battleCard.cPow,
        "#oppCpow"
      );
      this.animateValChange(
        this.oppActiveCardsStore.battleCard.tPow,
        "#oppTpow"
      );
      this.animateValChange(
        this.oppActiveCardsStore.battleCard.xPow,
        "#oppXpow"
      );
      this.animateValChange(this.oppActiveCardsStore.battleCard.hp, "#oppHp");
    },
    // "playerActiveCardsStore.battleCard.cPow"(newValue) {
    //   this.animateValChange(newValue, ".cPow");
    // },
    // "playerActiveCardsStore.battleCard.tPow"(newValue) {
    //   this.animateValChange(newValue, ".tPow");
    // },
    // "playerActiveCardsStore.battleCard.xPow"(newValue) {
    //   this.animateValChange(newValue, ".xPow");
    // },
    // "playerActiveCardsStore.battleCard.hp"(newValue) {
    //   this.animateValChange(newValue, ".hp");
    // },
  },
  methods: {
    animateValChange: function (newValue, id) {
      let valEl = document.querySelector(id);
      let valObj = {
        val: "0",
      };
      anime({
        targets: valObj,
        val: newValue,
        round: 1,
        easing: "linear",
        update: function () {
          valEl.innerHTML = valObj.val;
        },
      });
    },
  },
};
</script>

<style scoped>
.cPowChange,
.tPowChange {
  position: absolute;
  top: -10px;
  left: 50px;
  font-size: 200%;
  font-style: italic;
  font-weight: bold;
  color: green;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
.name {
  font-size: 1rem;
  line-height: 1rem !important;
  align-self: center;
  /* orange-lighten-1 */
  border-bottom: 2px solid #FFA726;
  /* orange-darken-4 */
  border-top: 1px solid #E65100;
  border-right: 1px solid #E65100;
  border-left: 2px solid #E65100;
  background: #E65100
}
.v-card-item {
  min-width: 100px;
}
.v-list-item {
  border: 1px solid #E65100;
}
.card-slot {
  border-left: 2px solid #E65100;
}
</style>