<template>
  <v-list-item @click="openDatails">
    <v-list-item-avatar>
      <v-img :src="avatar"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="name"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
    export default {
        name: "PersonCard",
        props: {
            avatar: String,
            name: String
        },
        methods: {
            openDatails() {
                // TODO implement modal display
            }
        }
    }
</script>

<style scoped>

</style>