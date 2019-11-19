<template>
  <v-list-item v-if="personProvided" @click="openDetails">
    <v-list-item-avatar>
      <v-img :src="avatarLink"></v-img>
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
            openDetails() {
                // TODO implement modal display
            }
        },
        computed: {
            personProvided() {
                return this.person != null
            },
            avatarLink() {
                return (this.person.avatar !== null) ?
                    "http://localhost:8090/image/" + this.person.avatar.id :
                    "src/assets/logo.png";
            },
        }
    }
</script>

<style scoped>

</style>