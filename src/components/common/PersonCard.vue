<template>
  <v-list-item v-if="personProvided" @click="openDetails">
    <v-list-item-avatar>
      <v-img :src="avatarLink"/>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="person.name"/>
    </v-list-item-content>
  </v-list-item>
  <span v-else class="ml-3">Не назначен</span>
</template>

<script>
    import ImageService from "../../services/ImageService";

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
                return !!this.person
            },
            avatarLink() {
                return ImageService.avatarLink(this.person.avatar)
            },
        }
    }
</script>

<style scoped>

</style>
