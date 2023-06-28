<template>
  <v-card
    class="dp-slot"
    :class="who == player ? 'pl-bg' : 'opp-bg'"
    theme="dark"
  >
    <v-card-title class="title ma-0 pa-0"> DP </v-card-title>
    <v-card-item class="ma-0 pa-0">
      <span class="text-center text-h6">{{ playerDpStore.dp }}</span>
    </v-card-item>
    <v-card-item class="ma-0 pa-0">
      <div
        :id="who == player ? 'playerDp' : 'oppDp'"
        class="dp-card mx-1"
      ></div>
    </v-card-item>
    <v-card-item class="ma-0 pa-0">
      <span class="text-center text-h6">{{ playerDpStore.stackCount }}/8</span>
    </v-card-item>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { usePlayerDpStore } from "../stores/playerDp";
import { CONST } from "@/const/const";

export default {
  props: ["who"],
  data() {
    return {
      player: CONST.PLAYER,
    };
  },
  computed: {
    ...mapStores(usePlayerDpStore),
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
  overflow: visible;
}
.opp-bg {
  background: #e65100;
  border-left: 2px solid #ffa726;
}
.pl-bg .title {
  /* blue-lighten-1 */
  border-bottom: 2px solid #42a5f5;
}
.opp-bg .title {
  /* orange-lighten-1 */
  border-bottom: 2px solid #ffa726;
}
.title {
  font-size: 1rem;
  line-height: 2.2rem !important;
}
.dp-card {
  background: rgba(200, 200, 200, 0.1);
  background-size: 45px;
  border: 1px solid silver;
  border-radius: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  height: 45px;
  width: 45px;
  position: relative;
  z-index: 10;
}
::v-deep .v-card-item__content {
  overflow: visible !important;
}
.v-card {
  z-index: 1 !important;
}
</style>