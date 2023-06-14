<template>
  <v-container class="app">
      <Room />
  </v-container>
</template>

<script>
  import Room from '@/components/Room.vue'
  export default {
    components: {
      Room,
    },
  }
</script>

<style>
:root {
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
}
.app {
  display: flex;
  align-items: center;
}
</style>