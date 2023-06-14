<template>
  <!-- Hand 1 -->
  <v-col cols="1">
    <OppMonsterCard v-if="type1 == 'monster'" :id="id1" :status="'handCard'" />
    <OppOptionCard v-if="type1 == 'option'" :id="id1" :status="'handCard'" />
    <EmptyCard v-if="type1 == 'empty'" />
  </v-col>
  <!-- Hand 2 -->
  <v-col cols="1">
    <OppMonsterCard v-if="type2 == 'monster'" :id="id2" :status="'handCard'" />
    <OppOptionCard v-if="type2 == 'option'" :id="id2" :status="'handCard'" />
    <EmptyCard v-if="type2 == 'empty'" />
  </v-col>
  <!-- Hand 3 -->
  <v-col cols="1">
    <OppMonsterCard v-if="type3 == 'monster'" :id="id3" :status="'handCard'" />
    <OppOptionCard v-if="type3 == 'option'" :id="id3" :status="'handCard'" />
    <EmptyCard v-if="type3 == 'empty'" />
  </v-col>
  <!-- Hand 4 -->
  <v-col cols="1">
    <OppMonsterCard v-if="type4 == 'monster'" :id="id4" :status="'handCard'" />
    <OppOptionCard v-if="type4 == 'option'" :id="id4" :status="'handCard'" />
    <EmptyCard v-if="type4 == 'empty'" />
  </v-col>
</template>

<script>
import OppOptionCard from "./OppOptionCard.vue";
import EmptyCard from "./EmptyCard.vue";
import OppMonsterCard from "./OppMonsterCard.vue";

import { mapStores } from "pinia";
import { useOppHandCardsStore } from "../stores/oppHandCards";
import { CONST } from "../const/const";

export default {
  components: {
    OppOptionCard,
    OppMonsterCard,
    EmptyCard,
  },
  data() {
    return {
      optionCard: CONST.FIRST_OPTION_CARD_ID,
    };
  },
  computed: {
    ...mapStores(useOppHandCardsStore),
    // Hand 1
    id1() {
      return this.oppHandCardsStore.hands.hand1.id;
    },
    type1() {
      let type = this.getCardType(this.oppHandCardsStore.hands.hand1.id);
      return type;
    },
    // Hand 2
    id2() {
      return this.oppHandCardsStore.hands.hand2.id;
    },
    type2() {
      let type = this.getCardType(this.oppHandCardsStore.hands.hand2.id);
      return type;
    },
    // Hand 3
    id3() {
      return this.oppHandCardsStore.hands.hand3.id;
    },
    type3() {
      let type = this.getCardType(this.oppHandCardsStore.hands.hand3.id);
      return type;
    },
    // Hand 4
    id4() {
      return this.oppHandCardsStore.hands.hand4.id;
    },
    type4() {
      let type = this.getCardType(this.oppHandCardsStore.hands.hand4.id);
      return type;
    },
  },
  methods: {
    getCardType: function (id) {
      if (id >= 0) {
        if (id < CONST.FIRST_OPTION_CARD_ID) {
          return "monster";
        } else {
          return "option";
        }
      } else {
        return "empty";
      }
    },
  },
};
</script>

<style>
</style>