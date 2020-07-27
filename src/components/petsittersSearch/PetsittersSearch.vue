<template>
    <v-container>
        <filter-drawer
                type="petsitterSearch"
                @input="updateFilterOptions"
                @search="search"
        />
        <petsitter-card
                v-for="profile in searchResults"
                :key="profile.id"
                :profile="profile"
                :selected-items-container="filterOptions"
        />
    </v-container>
</template>

<script>
    import FilterDrawer from "../common/FilterDrawer";
    import PetsitterCard from "../common/PetsitterCard";
    import FilterOptions from "../../model/FilterOptions";
    import UserService from "../../services/UserService";

    export default {
        name: "PetsittersSearch",
        components: {
            'filter-drawer': FilterDrawer,
            'petsitter-card': PetsitterCard
        },
        data: () => ({
            searchResults: [],
            filterOptions: new FilterOptions()
        }),
        methods: {
            search() {
                UserService.search(this.filterOptions)
                    .then((response) => {
                        this.searchResults = response.data
                        const csrfToken = response.config.headers[response.config.xsrfHeaderName];
                        if (csrfToken) {
                            UserService.setCsrfToken = csrfToken;
                        }
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(JSON.stringify(error));
                    })
            },
            updateFilterOptions(options) {
                this.filterOptions = options
            }
        }
    }
</script>

<style scoped>

</style>
