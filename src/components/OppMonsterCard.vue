<template>
  <div v-bind:id="cardId" class="card-bg" :style="cssProps">
    <div class="module">
      <div class="level">
        <h2>{{ card.level }}</h2>
      </div>
      <div v-if="showHp" class="hp-bar d-flex justify-space-between">
        <div class="hp-text">HP</div>
        <div id="oppHp" class="hp">{{ card.hp }}</div>
      </div>
    </div>
    <v-tooltip location="top" activator="parent">
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
            <v-btn
              v-bind="props"
              class="mx-1"
              size="small"
              color="red"
              icon
              @click="runChosenCard(card.id)"
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
import { useOppHandCardsStore } from "../stores/oppHandCards";
import { useOppActiveCardsStore } from "../stores/oppActiveCards";
import { useOppDpStore } from "../stores/oppDp";
import { useGameStateStore } from "../stores/gameState";
import { CONST } from "../const/const";
import * as digivolve from "../utils/digivolve";
import anime from "animejs";

export default {
  props: ["id", "status"],
  computed: {
    ...mapStores(
      useOppHandCardsStore,
      useOppActiveCardsStore,
      useOppDpStore,
      useGameStateStore
    ),
    card() {
      if (this.status == CONST.HAND_CARD) {
        for (const key in this.oppHandCardsStore.hands) {
          if (Object.hasOwnProperty.call(this.oppHandCardsStore.hands, key)) {
            const handCard = this.oppHandCardsStore.hands[key];
            if (handCard.id == this.id) {
              return handCard;
            }
          }
        }
      } else if (this.status == CONST.PLAY_CARD) {
        return this.oppActiveCardsStore.battleCard;
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
        "opp"
      );
      console.log(`name:${this.card.name}, msg:${msg}`);
      return isValid;
    },
    isPlayValid() {
      const activeId = this.oppActiveCardsStore.battleCard.id;
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
    showHp() {
      return this.status == CONST.PLAY_CARD ? true : false;
    },
    cardId() {
      return `id${this.id}`;
    },
  },
  methods: {
    playCard: function (digivolvePlay) {
      // animate
      let el = document.querySelector(`#${this.cardId}`);
      let elPosX = document
        .getElementById(this.cardId)
        .getBoundingClientRect().left;
      let activeElPosX = document
        .getElementById(`id${this.oppActiveCardsStore.battleId}`)
        .getBoundingClientRect().left;
      let elPosY = document
        .getElementById(this.cardId)
        .getBoundingClientRect().top;
      let activeElPosY = document
        .getElementById(`id${this.oppActiveCardsStore.battleId}`)
        .getBoundingClientRect().top;
      let x = activeElPosX - elPosX;
      let y = activeElPosY - elPosY;
      let entryX = x - 15;

      let animate = anime({
        targets: el,
        easing: "cubicBezier(.5, .05, .1, .3)",
        keyframes: [
          {
            duration: 500,
            translateY: y,
            translateX: entryX,
          },
          { translateX: x, duration: 400 },
        ],
      });
      animate.finished.then(() => {
        // set
        this.oppHandCardsStore.setActiveMonsterCard(this.id, digivolvePlay);
        // discard
        // TODO: make sure empty card slot can be seen once animation start
        this.oppHandCardsStore.discardOne(this.id);
      });
    },
    // TODO: undo dp storing
    storeCardDp: function () {
      this.oppDpStore.store(this.id, this.card.pp);
      this.oppHandCardsStore.discardOne(this.id);
    },
    digivolve: function () {
      if (this.isDigivolveValid) {
        this.playCard(true);
        this.oppDpStore.flushAll();
        // TODO: where to put the replaced card id? add a new key-value pair to activeMonsterCard?
      } else {
        let msg = "uhh TODO!";
        console.log(`Cannot Digivolve with this Digimon! Error:${msg}`);
      }
    },
    runChosenCard: function (id) {
      // set and trigger watch function at option card
      this.gameStateStore.setChosenHandId(id);
    },
  },
};
</script>

<style scoped>
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
  animation-fill-mode: initial;
}
.card-bg:hover {
  cursor: pointer;
  margin-top: 5px;
}

.module {
  --module-width: 100px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    var(--bg-monster-image);
  background-size: cover;
  border-radius: 7%;
  border: 2px solid var(--bg-type-color-top);
  width: var(--module-width);
  height: 100px;
  margin-top: 0.5em;
  padding: 0px;
  position: relative;
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

.level h2 {
  color: white;
  width: 1em;
  margin: 0;
  padding-left: 2px;
  text-align: start;
  font-size: xx-large;
  line-height: normal;
}

.hp-bar {
  color: white;
  width: inherit;
  font-size: large;
  position: absolute;
  bottom: 0;
  background: rgba(000, 000, 000, 0.4);
}

.hp-text {
  margin-left: 3px;
  text-align: start;
}

.hp {
  margin-right: 6px;
  text-align: end;
}

.tooltip-test {
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    var(--bg-monster-image);
  background-size: cover;
}
</style>