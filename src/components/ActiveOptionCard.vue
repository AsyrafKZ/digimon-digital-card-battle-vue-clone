<template>
  <div class="card-bg" :style="cssProps">
    <div class="module top"></div>
    <v-tooltip location="top" activator="parent">
      <!-- lazy-src="https://static.wikia.nocookie.net/digimon/images/f/f2/Puppetmon_139_%28DDCB%29.jpg/revision/latest?cb=20160401023126" -->
      <v-row>
        <v-col>
          <v-img :src="card.imgSrc" height="300" width="300" cover></v-img>
        </v-col>
        <v-col>
          <v-row>
            <v-col cols="1">
              {{ card.name }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              Effect:
              <br />
              {{ card.effect }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-tooltip>
    <v-menu activator="parent" transition="slide-y-transition">
      <v-col class="d-flex flex-row align-center">
        <v-btn class="mx-1" size="small" color="green" icon @click="playCard">
          <v-icon>mdi-transfer-up</v-icon>
        </v-btn>
        <v-btn
          class="mx-1"
          size="small"
          color="blue"
          icon
          @click="activateEffect"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-col>
    </v-menu>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { usePlayerCardsStore } from "../stores/Player";
import { usePlayerActiveCardsStore } from "../stores/playerActiveCards";
import { CONST } from "@/const/const";
import { effects } from "@/effects/effects";

export default {
  props: ["id", "status"],
  computed: {
    ...mapStores(usePlayerCardsStore, usePlayerActiveCardsStore),
    card() {
      if (this.status == CONST.HAND_CARD) {
        for (const key in this.playerCardsStore.handCards) {
          if (
            Object.hasOwnProperty.call(this.playerCardsStore.handCards, key)
          ) {
            const handCard = this.playerCardsStore.handCards[key];
            if (handCard.id == this.id) {
              return handCard;
            }
          }
        }
      } else if (this.status == CONST.PLAY_CARD) {
        return this.playerActiveCardsStore.optionCard;
      }
    },
    cssProps() {
      return {
        "--bg-option-image": `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)), url(${this.card.imgSrc})`,
      };
    },
  },
  methods: {
    playCard: function () {
    },
    activateEffect: function () {
      // do something
      effects[0].effect("Player", 10)
    },
  },
};
</script>

<style scoped>
.card-bg {
  background: linear-gradient(grey, silver);
  border-radius: 7%;
  display: flex;
  justify-content: center;
  padding: 0px;
  margin: 1em;
  width: 108px;
  height: 125px;
  transition: margin 0.2s ease-in-out;
  /* #E57373 */
}
.card-bg:hover {
  cursor: pointer;
  margin-top: 5px;
}

.module {
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    var(--bg-option-image);
  background-size: cover;
  border-radius: 7%;
  width: 100px;
  height: 100px;
  margin-top: 0.5em;
  padding: 0px;
  position: relative;
  float: left;
}

.top h2 {
  color: white;
  background: rgba(#222, 0.1);
  width: 1em;
  margin: 0;
  padding-left: 2px;
  text-align: start;
  font-size: xx-large;
  line-height: normal;
}

.tooltip-test {
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    var(--bg-option-image);
  background-size: cover;
}
</style>