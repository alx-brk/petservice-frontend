<template>
  <v-container>
    <filter-drawer
        type="petsitterSearch"
        v-model="filterOptions"
        @search="search"
    ></filter-drawer>
    <petsitter-card
        v-for="profile in searchResults"
        :key="profile.email"
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
                {
                    avatar: "https://randomuser.me/api/portraits/women/81.jpg",
                    email: "masha.pupkina@gmail.com",
                    name: "Маша Пупкина",
                    phone: "+79047389265",
                    city: "Санкт-Петербург",
                    activePetsitter: true,
                    catalog: [
                        {service: "Выгул", price: 500, units: "руб"},
                    ],
                    animals: ["Собаки", "Кошки"],
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    rating: 4.6,
                    feedback: [
                        {
                            author: "Вася",
                            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                            mark: 4,
                            text: "Not bad"
                        },
                        {
                            author: "Вася",
                            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                            mark: 4,
                            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        }
                    ]
                }
            ],
            filterOptions: {
                city: null,
                animals: [],
                services: [],
                startDate: null,
                endDate: null,
                creationDate: null
            }
        }),
        mounted() {
        },
        methods: {
            search() {
                api.userController.get("/search", this.filterOptions)
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