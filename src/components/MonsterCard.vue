<template>
  <div class="card-bg" :class="{ move: moveCard }" :style="cssProps">
    <div class="module top">
      <h2>{{ card.level }}</h2>
    </div>
    <v-tooltip location="top" activator="parent">
      <!-- lazy-src="https://static.wikia.nocookie.net/digimon/images/f/f2/Puppetmon_139_%28DDCB%29.jpg/revision/latest?cb=20160401023126" -->
      <v-row>
        <v-col>
          <v-img :src="card.imgSrc" height="300" width="300" cover></v-img>
        </v-col>
        <v-col>
          <v-row>
            <v-col cols="auto">
              {{ card.name }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              〇: {{ card.cPow }}
              <br />
              △: {{ card.tPow }}
              <br />
              ✕: {{ card.xPow }} [{{ card.xEffect }}]
              <br />
            </v-col>
          </v-row>
          <v-row>
            <v-col> HP: {{ card.hp }} </v-col>
          </v-row>
          <v-row>
            <v-col>
              Digivolve DP: {{ card.dp }}
              <br />
              Plus DP: {{ card.pp }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              Support Effect:
              <br />
              {{ card.support }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-tooltip>
    <v-menu activator="parent" transition="slide-y-transition">
      <v-col class="d-flex flex-row align-center">
        <v-tooltip text="Play" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mx-1"
              size="small"
              color="green"
              icon
              @click="playCard(false)"
            >
              <!-- v-show="isPlayValid" -->
              <v-icon>mdi-sword-cross</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Store DP" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mx-1"
              size="small"
              color="primary"
              icon
              @click="storeCardDp"
              v-show="isDpStoreValid"
            >
              <v-icon>mdi-tray-plus</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Digivolve" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mx-1"
              size="small"
              color="purple"
              icon
              @click="digivolve"
              v-show="isDigivolveValid"
            >
              <v-icon>mdi-transfer-up</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Remove card" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="mx-1" size="small" color="red" icon @click="runChosenCard(card.id)"
              ><v-icon>mdi-card-remove</v-icon></v-btn
            >
          </template>
        </v-tooltip>
      </v-col>
    </v-menu>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { usePlayerHandCardsStore } from "../stores/playerHandCards";
import { usePlayerActiveCardsStore } from "../stores/playerActiveCards";
import { usePlayerDpStore } from "../stores/playerDp";
import { useOppHandCardsStore } from "../stores/oppHandCards";
import { useOppActiveCardsStore } from "../stores/oppActiveCards";
import { useOppDpStore } from "../stores/oppDp";
import { useGameStateStore } from "../stores/gameState"
import { CONST } from "../const/const";
// import { isValid } from "../utils/digivolve.js";
import * as digivolve from "../utils/digivolve";

export default {
  props: ["id", "status"],
  data() {
    return {
      moveCard: false,
    };
  },
  computed: {
    ...mapStores(
      usePlayerHandCardsStore,
      usePlayerActiveCardsStore,
      usePlayerDpStore,
      useOppHandCardsStore,
      useOppActiveCardsStore,
      useOppDpStore,
      useGameStateStore
    ),
    card() {
      if (this.status == CONST.HAND_CARD) {
        for (const key in this.playerHandCardsStore.hands) {
          if (
            Object.hasOwnProperty.call(this.playerHandCardsStore.hands, key)
          ) {
            const handCard = this.playerHandCardsStore.hands[key];
            if (handCard.id == this.id) {
              return handCard;
            }
          }
        }
      } else if (this.status == CONST.PLAY_CARD) {
        return this.playerActiveCardsStore.battleCard;
      }
    },
    cssProps() {
      return {
        "--bg-type-color-top": this.card.colorTop,
        "--bg-type-color-bottom": this.card.colorBottom,
        "--bg-monster-image": `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)), url(${this.card.imgSrc})`,
      };
    },
    isDigivolveValid() {
      const { isValid, msg } = digivolve.isValid(
        this.card.dp,
        this.card.specialty,
        this.card.level,
        "player"
      );
      return isValid;
    },
    isPlayValid() {
      const activeId = this.playerActiveCardsStore.battleCard.id;
      if (activeId) {
        if (activeId >= 0) {
          return false;
        } else {
          true;
        }
      } else {
        return true;
      }
    },
    isDpStoreValid() {
      return this.isActiveCard;
    },
    isActiveCard() {
      if (this.status == CONST.PLAY_CARD) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    playCard: function (digivolvePlay) {
      this.playerHandCardsStore.setActiveMonsterCard(this.id, digivolvePlay);
      this.playerHandCardsStore.discardOne(this.id);
    },
    // TODO: undo dp storing
    storeCardDp: function () {
      this.playerDpStore.store(this.id, this.card.pp);
      this.playerHandCardsStore.discardOne(this.id);
    },
    digivolve: function () {
      if (this.isDigivolveValid) {
        this.playCard(true);
        this.playerDpStore.flushAll();
        // TODO: where to put the replaced card id? add a new key-value pair to activeMonsterCard?
      } else {
        let msg = "uhh TODO!";
        console.log(`Cannot Digivolve with this Digimon! Error:${msg}`);
      }
    },
    runChosenCard: function (id) {
      // set and trigger watch function at option card
      this.gameStateStore.setChosenHandId(id)
    },
  },
};
</script>

<style scoped>
.move {
  transform: translateY(100%);
  transition: 1s;
  border: 1px solid white;
}

.card-bg {
  background: linear-gradient(
    var(--bg-type-color-top),
    var(--bg-type-color-bottom)
  );
  border-radius: 7%;
  display: flex;
  justify-content: center;
  padding: 0px;
  margin: 1rem;
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
    var(--bg-monster-image);
  background-size: cover;
  border-radius: 7%;
  border: 2px solid var(--bg-type-color-top);
  width: 100px;
  height: 100px;
  margin-top: 0.5em;
  padding: 0px;
  position: relative;
  float: left;
  -webkit-mask-image: linear-gradient(
    45deg,
    #000 25%,
    rgba(0, 0, 0, 0.3) 50%,
    #000 75%
  );
  mask-image: linear-gradient(
    45deg,
    #000 25%,
    rgba(0, 0, 0, 0.3) 50%,
    #000 75%
  );
  -webkit-mask-size: 800%;
  mask-size: 800%;
  -webkit-mask-position: 0;
  mask-position: 0;
}
.module:hover {
  transition: mask-position 2s ease, -webkit-mask-position 2s ease;
  -webkit-mask-position: 120%;
  mask-position: 120%;
  opacity: 1;
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
    var(--bg-monster-image);
  background-size: cover;
}
</style>