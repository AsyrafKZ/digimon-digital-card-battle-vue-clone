<template>
  <!-- Hand 1 -->
  <v-col id="playerHand1" class="ma-0 pa-0">
    <MonsterCard v-if="type1 == 'monster'" :id="id1" :status="'handCard'" />
    <OptionCard v-if="type1 == 'option'" :id="id1" :status="'handCard'"/>
    <EmptyCard v-if="type1 == 'empty'" />
  </v-col>
  <!-- Hand 2 -->
  <v-col id="playerHand2" class="ma-0 pa-0">
    <MonsterCard v-if="type2 == 'monster'" :id="id2" :status="'handCard'" />
    <OptionCard v-if="type2 == 'option'" :id="id2" :status="'handCard'"/>
    <EmptyCard v-if="type2 == 'empty'" />
  </v-col>
  <!-- Hand 3 -->
  <v-col id="playerHand3" class="ma-0 pa-0">
    <MonsterCard v-if="type3 == 'monster'" :id="id3" :status="'handCard'" />
    <OptionCard v-if="type3 == 'option'" :id="id3" :status="'handCard'"/>
    <EmptyCard v-if="type3 == 'empty'" />
  </v-col>
  <!-- Hand 4 -->
  <v-col id="playerHand4" class="right-edge ma-0 pa-0">
    <MonsterCard v-if="type4 == 'monster'" :id="id4" :status="'handCard'" />
    <OptionCard v-if="type4 == 'option'" :id="id4" :status="'handCard'"/>
    <EmptyCard v-if="type4 == 'empty'" />
  </v-col>
</template>

<script>
import OptionCard from "./OptionCard.vue";
import EmptyCard from "./EmptyCard.vue";
import MonsterCard from "./MonsterCard.vue";

import { mapStores } from "pinia";
import { usePlayerHandCardsStore } from "../stores/playerHandCards";
import { CONST } from "../const/const"

export default {
  components: {
    MonsterCard,
    OptionCard,
    EmptyCard,
  },
  data() {
    return {
      optionCard: CONST.FIRST_OPTION_CARD_ID,
    }
  },
  computed: {
    ...mapStores(usePlayerHandCardsStore),
    // Hand 1
    id1() {
      return this.playerHandCardsStore.hands.hand1.id
    },
    type1() {
      let type = this.getCardType(this.playerHandCardsStore.hands.hand1.id)
      return type
    },
    // Hand 2
    id2() {
      return this.playerHandCardsStore.hands.hand2.id
    },
    type2() {
      let type = this.getCardType(this.playerHandCardsStore.hands.hand2.id)
      return type
    },
    // Hand 3
    id3() {
      return this.playerHandCardsStore.hands.hand3.id
    },
    type3() {
      let type = this.getCardType(this.playerHandCardsStore.hands.hand3.id)
      return type
    },
    // Hand 4
    id4() {
      return this.playerHandCardsStore.hands.hand4.id
    },
    type4() {
      let type = this.getCardType(this.playerHandCardsStore.hands.hand4.id)
      return type
    },
  },
  methods: {
    getCardType: function (id) {
      if (id >= 0) {
        if (id < CONST.FIRST_OPTION_CARD_ID) {
          return "monster"
        }
        else {
          return "option"
        }
      } else {
        return "empty"
      }
    },
  },
};
</script>

<style scoped>
.v-col {
  max-width: fit-content;
  border-left: 2px solid #0D47A1;
  border-right: 2px solid #0D47A1;
  border-bottom: 4px solid #0D47A1;
  background: #1976D2 
}

.v-col.right-edge {
  border-right: 4px solid #0D47A1;
}
</style>