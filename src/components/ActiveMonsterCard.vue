<template>
  <v-card theme="dark">
    <v-card-title class="name ma-0 pa-0 pt-1 pl-1">
      {{ playerActiveCardsStore.battleCard.name }}
    </v-card-title>
    <div class="d-flex card-slot">
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
      <MonsterCard class="ma-0 mr-1" :id="id" :status="playCard" />
    </div>
  </v-card>
</template>

<script>
import MonsterCard from "./MonsterCard.vue";
import { mapStores } from "pinia";
import { usePlayerActiveCardsStore } from "../stores/playerActiveCards";
import { CONST } from '@/const/const';
import anime from "animejs";

export default {
  components: {
    MonsterCard,
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
      this.playerActiveCardsStore.battleCard.cPow,
      "#plCpow"
    );
    this.tPow = this.animateValChange(
      this.playerActiveCardsStore.battleCard.tPow,
      "#plTpow"
    );
    this.xPow = this.animateValChange(
      this.playerActiveCardsStore.battleCard.xPow,
      "#plXpow"
    );
    this.hp = this.animateValChange(
      this.playerActiveCardsStore.battleCard.hp,
      "#plHp"
    );
  },
  computed: {
    ...mapStores(usePlayerActiveCardsStore),
    id() {
      return this.playerActiveCardsStore.battleCard.id;
    },
    xEffect() {
      return this.playerActiveCardsStore.battleCard.xEffect;
    },
    playerCard() {
      return this.playerActiveCardsStore.battleCard
    },
    attacks() {
      return [
        {
          id: "plCpow",
          val: this.playerCard.cPow,
          icon: "mdi-circle-outline",
          color: "bg-red",
          powClass: "cPow",
        },
        {
          id: "plTpow",
          val: this.playerCard.tPow,
          icon: "mdi-triangle-outline",
          color: "bg-green",
          powClass: "tPow",
        },
        {
          id: "plXpow",
          val: this.playerCard.xPow,
          icon: "mdi-window-close",
          color: "bg-blue",
          powClass: "xPow",
        },
        {
          id: "plXeff",
          val: this.playerCard.xEffect,
          icon: "",
          color: "bg-blue-darken-1",
          powClass: "",
        },
      ]
    }
  },
  watch: {
    id() {
      this.animateValChange(
        this.playerActiveCardsStore.battleCard.cPow,
        "#plCpow"
      );
      this.animateValChange(
        this.playerActiveCardsStore.battleCard.tPow,
        "#plTpow"
      );
      this.animateValChange(
        this.playerActiveCardsStore.battleCard.xPow,
        "#plXpow"
      );
      this.animateValChange(this.playerActiveCardsStore.battleCard.hp, "#plHp");
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
  /* blue-lighten-1 */
  border-bottom: 2px solid #42A5F5;
  /* blue-darken-4 */
  border-top: 1px solid #0D47A1;
  border-right: 2px solid #0D47A1;
  border-left: 1px solid #0D47A1;
  background: #0D47A1 
}
.v-card-item {
  min-width: 100px;
}
.v-list-item {
  border: 1px solid #0D47A1;
}
.card-slot {
  border-right: 2px solid #0D47A1;
}
</style>