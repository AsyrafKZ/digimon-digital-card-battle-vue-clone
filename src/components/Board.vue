<template>
  <v-container class="fill-height justify-center bg-blue-grey-darken-4 board">
    <!-- Main Board class="playing-field" -->
    <v-container >
      <!-- Player B -->
      <Opponent />
      <!-- Battle Field -->
      <BattleField />
      <!-- Player A -->
      <Player />
    </v-container>
  </v-container>
</template>


<script>
import MonsterCard from "./MonsterCardOld.vue";
import Player from "./Player.vue";
import Opponent from "./Opponent.vue";
import BattleField from "./BattleField.vue";

export default {
  components: {
    MonsterCard,
    Player,
    Opponent,
    BattleField,
  },
};
</script>

<style scoped>
.board {
  border: 1px solid white;
  width: 900px
}
.playing-field {
  /* blue-darken-2 */
  background: #1976D2;
  width: fit-content;
  height: fit-content;
}
</style>