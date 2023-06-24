<template>
  <v-card theme="dark" class="card-slot">
    <OppOptionCard class="ma-0 mr-1" :id="id" :status="playCard" />
  </v-card>
</template>

<script>
import OppOptionCard from "./OppOptionCard.vue";
import { mapStores } from "pinia";
import { useOppActiveCardsStore } from "../stores/oppActiveCards";
import { CONST } from "@/const/const";

export default {
  components: {
    OppOptionCard,
  },
  data() {
    return {
      playCard: CONST.PLAY_CARD,
    };
  },
  computed: {
    ...mapStores(useOppActiveCardsStore),
    id() {
      return this.oppActiveCardsStore.optionCard.id;
    },
  },
};
</script>

<style scoped>
.card-slot {
  margin-left: 5px;
  padding-left: 7px;
  /* orange-darken-4 */
  border-bottom: 5px solid #E65100;
}

/* border to extend to 20% from bottom right corner */
.v-card.card-slot:after {
  content: "";
  background: #E65100;
  position: absolute;
  bottom: 0;
  right: 0px;
  height: 20%;
  width: 5px;
}
</style>