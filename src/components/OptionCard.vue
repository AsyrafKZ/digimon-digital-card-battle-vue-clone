<template>
  <v-card theme="dark" class="card-slot">
  <div class="card-bg ma-0 mr-1" :style="cssProps">
    <div class="module top"></div>
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
          @click="activateEffect(card.id)"
        >
          <v-icon>mdi-star-face</v-icon>
        </v-btn>
        <v-btn
          class="mx-1"
          size="small"
          color="red"
          icon
        >
          <v-icon>mdi-card-remove</v-icon>
        </v-btn>
      </v-col>
    </v-menu>
  </div>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { usePlayerHandCardsStore } from "../stores/playerHandCards";
import { usePlayerActiveCardsStore } from "../stores/playerActiveCards";
import { usePlayerOfflineCardsStore } from "../stores/playerOfflineCards";
import { useGameStateStore } from "../stores/gameState"
import { CONST } from "@/const/const";
import effects from "@/effects/option";

export default {
  props: ["id", "status"],
  computed: {
    ...mapStores(usePlayerHandCardsStore, usePlayerActiveCardsStore,usePlayerOfflineCardsStore, useGameStateStore),
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
      this.playerOfflineCardsStore.setOffline(this.playerActiveCardsStore.battleCard.id)
      this.playerHandCardsStore.setActiveOptionCard(this.id);
      
      this.playerHandCardsStore.discardOne(this.id);
    },
    activateEffect: async function (id) {
      const needIdEffect = ["192"]
      if (needIdEffect.includes(id)){
        this.gameStateStore.setGameState(CONST.PHASE.CHOOSE_CARD)
      } else {
        const optionId = this.getIndex(id)
        effects[optionId].effect("player");
      }
    },
    getIndex: function (id) {
      return parseInt(id) - CONST.FIRST_OPTION_CARD_ID
    },
  },
  watch: {
    "gameStateStore.chosenHandId": function (newVal) {
      if (newVal != "" && this.card.isActive) {
        const optionId = this.getIndex(this.card.id)
        effects[optionId].effect("player", newVal);
      }
      // TODO: misfire failure (takde kad kat tangan etc.)
    }
  }
};
</script>

<style scoped>
.card-bg {
  background: linear-gradient(grey, silver);
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
    var(--bg-option-image);
  background-size: cover;
  border-radius: 7%;
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
    var(--bg-option-image);
  background-size: cover;
}
.card-slot {
  margin-left: 5px;
  padding-left: 7px;
  border-top: 5px solid #0d47a1;
}

/* border to extend to 20% from top left corner */
.v-card.card-slot:after {
  content: "";
  background: #0d47a1;
  position: absolute;
  top: 0;
  left: 0px;
  height: 20%;
  width: 5px;
}
</style>