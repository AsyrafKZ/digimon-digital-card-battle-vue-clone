<template>
  <v-card
    class="dp-slot"
    :class="who == player ? 'pl-bg' : 'opp-bg'"
    theme="dark"
  >
    <v-card-title class="title ma-0 pa-0"> DP </v-card-title>
    <v-card-item class="ma-0 pa-0">
      <span class="text-center text-h6">{{ oppDpStore.dp }}</span>
    </v-card-item>
    <v-card-item class="ma-0 pa-0">
      <v-img src="src/images/card-back.png" height="50" width="50"></v-img>
    </v-card-item>
    <v-card-item class="ma-0 pa-0">
      <span class="text-center text-h6">{{ oppDpStore.stackCount }}/8</span>
    </v-card-item>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useOppDpStore } from "../stores/oppDp";
import { CONST } from "@/const/const";

export default {
  props: ["who"],
  data() {
    return {
      player: CONST.PLAYER,
    };
  },
  computed: {
    ...mapStores(useOppDpStore),
  },
};
</script>

<style scoped>
.dp-slot {
  margin-bottom: auto;
  text-align: center;
  border-radius: 0%;
}
.pl-bg {
  background: #0d47a1;
  border-right: 2px solid #42a5f5;
}
.opp-bg {
  background: #e65100;
  border-left: 2px solid #ffa726;
}
.pl-bg .title {
  /* blue-lighten-1 */
  border-bottom: 2px solid #42a5f5
}
.opp-bg .title {
  /* orange-lighten-1 */
  border-bottom: 2px solid #ffa726;
}
.title {
  font-size: 1rem;
  line-height: 2.2rem !important;
}
</style>