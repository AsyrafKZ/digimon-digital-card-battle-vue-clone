<template>
  <v-btn block color="purple-lighten-1">
    SELECT ATTACK
    <v-dialog v-model="open" activator="parent" width="600">
      <!-- Opponent -->
      <v-card class="mb-6" :loading="!hasOppSelected" variant="outlined">
        <template v-slot:loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            color="blue-accent-4"
            height="4"
            indeterminate
          ></v-progress-linear>
        </template>
        <v-list density="comfortable" bg-color="blue-accent-1">
          <v-list-subheader class="text-h4" color="white">
            <v-row>
              <v-col>
                {{ oppCard.name }}
                {{ oppCard.hp }} {{ oppCard.level }} {{ oppCard.specialty }}
              </v-col>
            </v-row>
          </v-list-subheader>

          <v-list-item
            v-for="(attack, i) in oppAttacks"
            :key="i"
            :value="attack.text"
            :class="attack.color"
            :disabled="attack.isDisabled"
            active-class="add-border"
            @click="oppSelected(i)"
            :active="attack.isSelected"
          >
            <template v-slot:prepend>
              <v-icon :icon="attack.icon"></v-icon>
            </template>
            <v-row>
              <v-col class="text-left">
                {{ attack.text }}
              </v-col>
              <v-col class="text-center">
                {{ attack.xEff }}
              </v-col>
              <v-col class="text-right">
                {{ attack.val }}
              </v-col>
            </v-row>
          </v-list-item>
          <v-card-text>
            <p class="ml-4 text-h6 text-white">
              SELECTED: <v-icon v-if="oppAttack" :icon="oppAttack"></v-icon>
            </p>
          </v-card-text>
        </v-list>
      </v-card>
      <!-- Close Button -->
      <v-btn color="teal-accent-1" block @click="open = false"
        >Close Dialog</v-btn
      >
      <!-- Player -->
      <v-card class="mt-6" :loading="!hasPlayerSelected" variant="outlined">
        <template v-slot:loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            color="blue-accent-4"
            height="4"
            indeterminate
          ></v-progress-linear>
        </template>
        <v-list density="comfortable" bg-color="blue-accent-1">
          <v-list-subheader class="text-h4" color="white">
            <v-row>
              <v-col>
                {{ playerCard.name }}
                {{ playerCard.hp }} {{ playerCard.level }}
                {{ playerCard.specialty }}
              </v-col>
            </v-row>
          </v-list-subheader>

          <v-list-item
            v-for="(attack, i) in playerAttacks"
            :key="i"
            :value="attack"
            :class="attack.color"
            :disabled="attack.isDisabled"
            active-class="add-border"
            @click="playerSelected(i)"
            :active="attack.isSelected"
          >
            <template v-slot:prepend>
              <v-icon :icon="attack.icon"></v-icon>
            </template>
            <v-row>
              <v-col class="text-left">
                {{ attack.text }}
              </v-col>
              <v-col class="text-center">
                {{ attack.xEff }}
              </v-col>
              <v-col class="text-right">
                {{ attack.val }}
              </v-col>
            </v-row>
          </v-list-item>
          <v-card-text>
            <p class="ml-4 text-h6 text-white">
              SELECTED:
              <v-icon v-if="playerAttack" :icon="playerAttack"></v-icon>
            </p>
          </v-card-text>
        </v-list>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
import { mapStores } from "pinia";
import { useGameStateStore } from "../stores/gameState";
import { usePlayerActiveCardsStore } from "../stores/playerActiveCards";
import { useOppActiveCardsStore } from "../stores/oppActiveCards";
import { CONST } from "@/const/const";

export default {
  data() {
    return {
      open: false,
      playerAttacks: [],
      oppAttacks: [],
      cButton: 0,
      tButton: 1,
      xButton: 2,
      xEffect: 3,
      playerAttack: "",
      oppAttack: "",
      hasPlayerSelected: false,
      hasOppSelected: false,
    };
  },
  computed: {
    ...mapStores(
      useGameStateStore,
      usePlayerActiveCardsStore,
      useOppActiveCardsStore
    ),
    playerCard: function () {
      return this.playerActiveCardsStore.battleCard;
    },
    oppCard: function () {
      return this.oppActiveCardsStore.battleCard;
    },
  },
  watch: {
    playerCard: function () {
      this.playerAttacks = [
        {
          text: this.playerCard.cAttack,
          val: this.playerCard.cPow,
          icon: "mdi-circle-outline",
          color: "bg-red",
          xEff: "",
          isDisabled: false,
          isSelected: false,
        },
        {
          text: this.playerCard.tAttack,
          val: this.playerCard.tPow,
          icon: "mdi-triangle-outline",
          color: "bg-green",
          xEff: "",
          isDisabled: false,
          isSelected: false,
        },
        {
          text: this.playerCard.xAttack,
          val: this.playerCard.xPow,
          icon: "mdi-window-close",
          color: "bg-blue",
          xEff: "",
          isDisabled: false,
          isSelected: false,
        },
        {
          text: "SPECIAL EFFECT",
          val: "EFFECT SPEED : " + this.playerCard.xEffectSpeed,
          icon: "mdi-star-face",
          color: "bg-blue-darken-1",
          xEff: this.playerCard.xEffect,
          isDisabled: true,
          isSelected: false,
        },
      ];
    },
    oppCard: function () {
      this.oppAttacks = [
        {
          text: this.oppCard.cAttack,
          val: this.oppCard.cPow,
          icon: "mdi-circle-outline",
          color: "bg-red",
          xEff: "",
          isDisabled: false,
          isSelected: false,
        },
        {
          text: this.oppCard.tAttack,
          val: this.oppCard.tPow,
          icon: "mdi-triangle-outline",
          color: "bg-green",
          xEff: "",
          isDisabled: false,
          isSelected: false,
        },
        {
          text: this.oppCard.xAttack,
          val: this.oppCard.xPow,
          icon: "mdi-window-close",
          color: "bg-blue",
          xEff: "",
          isDisabled: false,
          isSelected: false,
        },
        {
          text: "SPECIAL EFFECT",
          val: "EFFECT SPEED : " + this.oppCard.xEffectSpeed,
          icon: "mdi-star-face",
          color: "bg-blue-darken-1",
          xEff: this.oppCard.xEffect,
          isDisabled: true,
          isSelected: false,
        },
      ];
    },
    "gameStateStore.playerAttack": function () {
      this.endAttackSelectPhase();
    },
    "gameStateStore.oppAttack": function () {
      this.endAttackSelectPhase();
    },
    open: function (isOpen) {
      if (isOpen) {
        this.setDisable(false);
        this.setInitialState();
      } else {
        this.setDisable(true);
      }
    },
  },
  methods: {
    playerSelected: function (val) {
      if (val == this.xEffect) {
        return;
      }
      this.playerAttacks.forEach((attack, i) => {
        if (val == i) {
          attack.isSelected = !attack.isSelected;
          if (attack.isSelected) {
            this.playerAttack = attack.icon;
            this.hasPlayerSelected = true;
            this.gameStateStore.setPlayerAttack(this.setAttackName(val));
          } else {
            this.playerAttack = "";
            this.hasPlayerSelected = false;
            this.gameStateStore.setPlayerAttack("");
          }
        } else {
          attack.isSelected = false;
        }
      });
      if (this.playerAttacks[this.xButton].isSelected) {
        this.playerAttacks[this.xEffect].isDisabled = false;
      } else {
        this.playerAttacks[this.xEffect].isDisabled = true;
      }
    },
    oppSelected: function (val) {
      if (val == this.xEffect) {
        return;
      }
      this.oppAttacks.forEach((attack, i) => {
        if (val == i) {
          attack.isSelected = !attack.isSelected;
          if (attack.isSelected) {
            this.oppAttack = attack.icon;
            this.hasOppSelected = true;
            this.gameStateStore.setOppAttack(this.setAttackName(val));
          } else {
            this.oppAttack = "";
            this.hasOppSelected = false;
            this.gameStateStore.setOppAttack("");
          }
        } else {
          attack.isSelected = false;
        }
      });
      if (this.oppAttacks[this.xButton].isSelected) {
        this.oppAttacks[this.xEffect].isDisabled = false;
      } else {
        this.oppAttacks[this.xEffect].isDisabled = true;
      }
    },
    setAttackName: function (i) {
      if (i == 0) {
        return CONST.O;
      } else if (i == 1) {
        return CONST.T;
      } else if (i == 2) {
        return CONST.X;
      }
    },
    endAttackSelectPhase: function () {
      if (
        this.gameStateStore.playerSelectedAttack &&
        this.gameStateStore.oppSelectedAttack
      ) {
        // disable players from change attack selection once both have chosen
        this.setDisable(true);
        setTimeout(() => {
          this.open = false;
          setTimeout(() => {
            console.log("....MOVING ON TO THE BATTLE PHASE..!");
            this.gameStateStore.setPhase(CONST.PHASE.BATTLE);
          }, 1000);
        }, 1000);
      }
    },
    setDisable: function (newState) {
      this.playerAttacks.forEach((attack) => {
        attack.isDisabled = newState;
      });
      this.oppAttacks.forEach((attack) => {
        attack.isDisabled = newState;
      });
    },
    setInitialState: function () {
      this.playerAttacks.forEach((attack) => {
        attack.isSelected = false;
      });
      this.oppAttacks.forEach((attack) => {
        attack.isSelected = false;
      });
      this.playerAttack = "";
      this.oppAttack = "";
      this.gameStateStore.setPlayerAttack("");
      this.gameStateStore.setOppAttack("");
    },
  },
};
</script>

<style scoped>
.add-border {
  border: 2px solid white;
  box-shadow: 0px 0px 30px 0px #d2ebf6;
}
</style>