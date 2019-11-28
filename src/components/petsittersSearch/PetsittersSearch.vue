<template>
  <v-container>
    <filter-drawer
        type="petsitterSearch"
        v-model="filterOptions"
        @search="search"
    ></filter-drawer>
    <petsitter-card
        v-for="profile in searchResults"
        :key="profile.id"
        :profile="profile"
        :selected-items-container="filterOptions"
    ></petsitter-card>
  </v-container>
</template>

<script>
    import * as api from '../../common/api.js';
    import FilterDrawer from "../common/FilterDrawer";
    import PetsitterCard from "../common/PetsitterCard";

    export default {
        name: "PetsittersSearch",
        components: {
            'filter-drawer': FilterDrawer,
            'petsitter-card': PetsitterCard
        },
        data: () => ({
            searchResults: [
            ],
            filterOptions: {
                city: null,
                animals: [],
                petServices: [],
                rating: null
            }
        }),
        mounted() {
        },
        methods: {
            search() {
                api.userController.post("/search", this.filterOptions)
                    .then((response) => {
                        this.searchResults = response.data
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    })
            }
        }
    }
</script>

<style scoped>

</style>