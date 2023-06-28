<template>
  <v-card theme="dark" class="card-slot">
    <OptionCard 
        v-show="id > -1" class="ma-0 mr-1" :id="id" :status="playCard" />
    <EmptyCard v-if="id <= -1" :cardType="activeOptionCard" />
  </v-card>
</template>

<script>
import OptionCard from "./OptionCard.vue";
import EmptyCard from "./EmptyCard.vue";
import { mapStores } from "pinia";
import { usePlayerActiveCardsStore } from "../stores/playerActiveCards";
import { CONST } from "@/const/const";

export default {
  components: {
    OptionCard,
    EmptyCard,
  },
  data() {
    return {
      playCard: CONST.PLAY_CARD,
      activeOptionCard: CONST.ACTIVE_CARD.OPTION_PLAYER
    };
  },
  computed: {
    ...mapStores(usePlayerActiveCardsStore),
    id() {
      if (this.playerActiveCardsStore.optionCard.id > -1) {
        return this.playerActiveCardsStore.optionCard.id;
      } else {
        return -1;
      }
    },
  },
};
</script>

<style scoped>
.card-slot {
  margin-left: 5px;
  margin-right: 1px;
  padding-left: 7px;
  /* blue-darken-4 */
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