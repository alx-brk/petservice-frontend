<template>
  <v-list-item v-if="personProvided" @click="openDatails">
    <v-list-item-avatar>
      <v-img :src="person.avatar"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="person.name"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
  <span v-else class="ml-3">Не назначен</span>
</template>

<script>
    export default {
        name: "PersonCard",
        props: {
            person: Object
        },
        methods: {
            openDatails() {
                // TODO implement modal display
            }
        },
        computed: {
            personProvided() {
                return this.person != null
            }
        }
    }
</script>

<style scoped>

</style>