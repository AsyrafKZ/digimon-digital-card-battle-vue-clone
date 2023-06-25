<template>
  <div :id="id" class="card-bg"></div>
</template>

<script>
export default {
  props: ["cardType"],
  computed: {
    id: function () {
      if (this.cardType == "activePlayerMonsterCard") {
        return "activePlayerMonsterCard";
      } else if (this.cardType == "activePlayerMonsterCard") {
        return "activePlayerMonsterCard";
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