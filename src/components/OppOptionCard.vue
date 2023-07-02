<template>
  <div v-bind:id="cardId" class="card-bg" :style="cssProps">
    <div class="module top"></div>
    <v-tooltip theme="light" location="top" activator="parent"
      ><v-row>
        <v-col>
          <v-img :src="card.imgSrc" height="300" width="300" cover></v-img>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
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
      </v-col>
    </v-menu>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useOppHandCardsStore } from "../stores/oppHandCards";
import { useOppActiveCardsStore } from "../stores/oppActiveCards";
import { useOppOfflineCardsStore } from "../stores/oppOfflineCards";
import { CONST } from "@/const/const";
import effects from "@/effects/option";
import anime from "animejs";

export default {
  props: ["id", "status"],
  data(){
    return {
      activeOptionCard: CONST.ACTIVE_CARD.OPTION_OPP
    }
  },
  computed: {
    ...mapStores(
      useOppHandCardsStore,
      useOppActiveCardsStore,
      useOppOfflineCardsStore
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
        return this.oppActiveCardsStore.optionCard;
      }
    },
    cssProps() {
      return {
        "--bg-option-image": `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)), url(${this.card.imgSrc})`,
      };
    },
    cardId() {
      return `id${this.id}`;
    },
  },
  methods: {
    playCard: function () {
      // animate translation from hand to active slot
      let el = document.querySelector(`#${this.cardId}`);
      let elPosX = document
        .getElementById(this.cardId)
        .getBoundingClientRect().left;
      let elPosY = document
        .getElementById(this.cardId)
        .getBoundingClientRect().top;
      let activeElPosX = null;
      let activeElPosY = null;
      if (this.oppActiveCardsStore.optionId > -1) {
        activeElPosX = document
          .getElementById(`id${this.oppActiveCardsStore.optionId}`)
          .getBoundingClientRect().left;
        activeElPosY = document
          .getElementById(`id${this.oppActiveCardsStore.optionId}`)
          .getBoundingClientRect().top;
      } else {
        activeElPosX = document
          .getElementById(this.activeOptionCard)
          .getBoundingClientRect().left;
        activeElPosY = document
          .getElementById(this.activeOptionCard)
          .getBoundingClientRect().top;
      }
      let x = activeElPosX - elPosX;
      let y = activeElPosY - elPosY;
      let entryY = y - 15;

      let animate = anime({
        targets: el,
        easing: "cubicBezier(.5, .05, .1, .3)",
        keyframes: [
          {
            duration: 500,
            translateY: entryY,
            translateX: x,
          },
          { translateY: y, duration: 400 },
        ],
      });
      animate.finished.then(() => {
        this.oppHandCardsStore.setActiveOptionCard(this.id);
        this.oppHandCardsStore.discardOne(this.id);
      });
    },
    activateEffect: function (id) {
      const needIdEffect = [];
      const optionId = this.getIndex(id);
      if (needIdEffect.includes(id)) {
        // TODO: make player choose card
        effects[optionId].effect("opp", id);
      } else {
        const optionId = this.getIndex(id);
        effects[optionId].effect("opp");
      }
    },
    getIndex: function (id) {
      return parseInt(id) - CONST.FIRST_OPTION_CARD_ID;
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
  padding: 0;
  margin: 0;
  width: 108px;
  height: 125px;
  position: relative;
  z-index: 11;
  transition-timing-function: ease-in-out;
}
.card-bg:hover {
  cursor: pointer;
  transform: translateY(5px);
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
</style>