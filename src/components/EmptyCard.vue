<template>
  <div :id="id" class="card-bg"></div>
</template>

<script>
import { CONST } from "@/const/const";

export default {
  props: ["cardType"],
  computed: {
    id: function () {
      if (this.cardType == CONST.ACTIVE_CARD.MONSTER_PLAYER) {
        return CONST.ACTIVE_CARD.MONSTER_PLAYER;
      } else if (this.cardType == CONST.ACTIVE_CARD.OPTION_PLAYER) {
        return CONST.ACTIVE_CARD.OPTION_PLAYER;
      } else if (this.cardType == CONST.ACTIVE_CARD.MONSTER_OPP) {
        return CONST.ACTIVE_CARD.MONSTER_OPP;
      } else if (this.cardType == CONST.ACTIVE_CARD.OPTION_OPP) {
        return CONST.ACTIVE_CARD.OPTION_OPP;
      } 
    },
  },
};
</script>

<style scoped>
.card-bg {
  background: rgba(0, 0, 0, 0.1);
  border: 2px solid silver;
  border-radius: 7%;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  width: 108px;
  height: 125px;
}
</style>