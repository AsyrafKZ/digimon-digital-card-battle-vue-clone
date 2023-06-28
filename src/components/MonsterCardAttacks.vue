<template>
  <v-row>
    <v-col> ○:{{ c_pow }} </v-col>
  </v-row>
  <v-row>
    <v-col> △:{{ t_pow }} </v-col>
  </v-row>
  <v-row>
    <v-col> ×:{{ x_pow }} </v-col>
  </v-row>
  <v-row>
    <v-col>
      {{ x_effect }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["c_pow", "t_pow", "x_pow", "x_effect"],
  created: function () {},
};
</script>