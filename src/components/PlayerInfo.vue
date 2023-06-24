<template>
  <v-container>
      <v-row>
        <v-col>
          <h3>Current ID: {{ socketId }}</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="playerNameInput"
            rounded
            outlined
            clearable
            label="Player Name"
            color="teal"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="deckNameInput"
            rounded
            outlined
            clearable
            label="Deck Name"
            color="teal"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn @click="updateName" color="teal">UPDATE</v-btn>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            socketId: "123abc",
            playerNameInput: "Player",
            deckNameInput: "Tricolor Deck",
        }
    },
    methods: {
        updateName: function () {
            // do something
        }
    }
}
</script>

<style>

</style>