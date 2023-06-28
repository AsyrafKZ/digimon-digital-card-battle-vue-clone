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
            :class="attack.class"
            density="compact"
            class="px-1 py-0"
          >
            <template v-slot:prepend>
              <v-icon v-if="attack.icon" :icon="attack.icon"></v-icon>
            </template>
            <span
              v-if="attack.powClass"
              v-bind:id="attack.id"
              :class="attack.powClass"
            ></span>
            <span v-else class="text-body-2 text-left"> {{ attack.val }}</span>
            <span
              v-show="showPopup"
              id="idCpowChange"
              class="cPowChange text-h3"
              >{{ cPowChange }}</span
            >
          </v-list-item>
          <!-- <span v-if="false" class="tPowChange">{{ tPowChange }}</span> -->
        </div>
      </v-card-item>
      <MonsterCard
        v-show="id > -1"
        class="ma-0 mr-1"
        :id="id"
        :status="playCard"
      />
      <EmptyCard v-if="id <= -1" :cardType="activeMonsterCard" />
    </div>
  </v-card>
</template>

<script>
import MonsterCard from "./MonsterCard.vue";
import EmptyCard from "./EmptyCard.vue";
import { mapStores } from "pinia";
import { usePlayerActiveCardsStore } from "../stores/playerActiveCards";
import { CONST } from "@/const/const";
import anime from "animejs";

export default {
  components: {
    MonsterCard,
    EmptyCard,
  },
  data() {
    return {
      cPow: "0",
      tPow: "0",
      xPow: "0",
      hp: "0",
      cPowChange: "+10",
      tPowChange: "+100",
      playCard: CONST.PLAY_CARD,
      activeMonsterCard: CONST.ACTIVE_CARD.MONSTER_PLAYER,
      showPopup: false,
    };
  },
  mounted() {
    if (this.id > -1) {
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
    }
  },
  computed: {
    ...mapStores(usePlayerActiveCardsStore),
    id() {
      if (this.playerActiveCardsStore.battleCard.id > -1) {
        return this.playerActiveCardsStore.battleCard.id;
      } else {
        return -1;
      }
    },
    xEffect() {
      return this.playerActiveCardsStore.battleCard.xEffect;
    },
    playerCard() {
      return this.playerActiveCardsStore.battleCard;
    },
    attacks() {
      return [
        {
          id: "plCpow",
          val: this.playerCard.cPow,
          icon: "mdi-circle-outline",
          class: "bg-red text-right",
          powClass: "cPow",
        },
        {
          id: "plTpow",
          val: this.playerCard.tPow,
          icon: "mdi-triangle-outline",
          class: "bg-green text-right",
          powClass: "tPow",
        },
        {
          id: "plXpow",
          val: this.playerCard.xPow,
          icon: "mdi-window-close",
          class: "bg-blue text-right",
          powClass: "xPow",
        },
        {
          id: "plXeff",
          val: this.playerCard.xEffect,
          icon: "",
          class: "bg-blue-darken-1 text-left",
          powClass: "",
        },
      ];
    },
  },
  watch: {
    id(newVal) {
      if (newVal > -1) {
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
        this.animateValChange(
          this.playerActiveCardsStore.battleCard.hp,
          "#plHp"
        );
      }
    },
    async "playerActiveCardsStore.battleCard.cPow"() {
      await this.animatePopup("#idCpowChange");
    },
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
    animatePopup: async function (id) {
      let popupEl = document.querySelector(id);
      this.showPopup = true;
      await anime({
        targets: popupEl,
        easing: "linear",
        translateY: -5,
        duration: 100,
        endDelay: 500,
      }).finished.then(() => {
        this.showPopup = false;
        anime({
          targets: popupEl,
          easing: "easeOutCirc",
          translateY: 5,
          duration: 100,
        });
      });
    },
  },
};
</script>

<style scoped>
.cPowChange,
.tPowChange {
  position: absolute;
  top: -15px;
  right: 10px;
  font-style: italic;
  font-weight: bolder;
  color: #4CAF50;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  z-index: 99;
  overflow: visible;
}
.name {
  font-size: 1rem;
  line-height: 1rem !important;
  /* blue-lighten-1 */
  border-bottom: 2px solid #42a5f5;
  /* blue-darken-4 */
  border-top: 1px solid #0d47a1;
  border-right: 2px solid #0d47a1;
  border-left: 1px solid #373a40;
  background: #0d47a1;
  min-height: 1.5rem;
}
/* .v-card.v-theme--dark.v-card--density-default.v-card--variant-elevated {
  overflow: visible !important;
} */
::v-deep .v-card-item__content {
  overflow: visible !important;
}
.v-card-item {
  min-width: 100px;
}
.v-list-item {
  border: 1px solid #0d47a1;
}
.card-slot {
  border-right: 2px solid #0d47a1;
}
</style>