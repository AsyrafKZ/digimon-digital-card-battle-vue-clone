<template>
  <div class="card-bg" :class="{move: moveCard}" :style="cssProps">
    <div class="module top">
      <h2>{{ level }}</h2>
    </div>
    <v-tooltip location="top" activator="parent">
      <!-- lazy-src="https://static.wikia.nocookie.net/digimon/images/f/f2/Puppetmon_139_%28DDCB%29.jpg/revision/latest?cb=20160401023126" -->
      <v-row>
        <v-col>
          <v-img :src="imgSrc" height="300" width="300" cover></v-img>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
              {{ c_pow }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              {{ c_pow }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              {{ c_pow }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div></div>
    </v-tooltip>
    <v-menu activator="parent" transition="slide-y-transition">
      <v-col class="d-flex flex-row align-center">
        <v-btn size="small" color="green" icon @click="$emit('select-card')">
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn size="small" color="primary" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-menu>
  </div>
</template>

<style scoped>
.move {
  transform: translateY(100%);
  transition: 1s;
  border: 1px solid white
}

.card-bg {
  background: linear-gradient(
    var(--bg-type-color-top),
    var(--bg-type-color-bottom)
  );
  border-radius: 7%;
  display: flex;
  justify-content: center;
  padding: 0px;
  margin: 1em;
  width: 108px;
  height: 125px;
  /* #E57373 */
}

.module {
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    var(--bg-monster-image);
  background-size: cover;
  border-radius: 7%;
  border: 2px solid var(--bg-type-color-top);
  width: 100px;
  height: 100px;
  margin-top: 0.5em;
  padding: 0px;
  position: relative;
  float: left;
}

.top h2 {
  color: white;
  background: rgba(#222, 0.1);
  width: 1em;
  margin: 0;
  padding-left: 2px;
  text-align: start;
  font-size: xx-large;
  line-height: normal;
}

.tooltip-test {
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    var(--bg-monster-image);
  background-size: cover;
}
</style>

<script>
export default {
  props: [
    "level",
    "colorTop",
    "colorBottom",
    "specialty",
    "imgSrc",
    "c_pow",
    "img_src",
  ],
  emits: ["select-card"],
  data() {
    return {
        moveCard: false,
      // color: "blue",
      // bgTypeColorTop: this.colorTop,
      // bgTypeColorBottom: this.colorBottom,
      // bgMonsterImage: this.imgSrc,
    };
  },
  created: function () {
    // console.log("imgSrc", this.imgSrc)
    // console.log("bgTypeColorTop", this.bgTypeColorTop)
  },
  methods: {
    // selectCard: function () {
    //     // move card with animation
    //     // this.moveCard = true
    // },
  },
  computed: {
    cssProps() {
      return {
        "--bg-type-color-top": this.colorTop,
        "--bg-type-color-bottom": this.colorBottom,
        "--bg-monster-image": `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)), url(${this.imgSrc})`,
      };
    },
  },
};
</script>