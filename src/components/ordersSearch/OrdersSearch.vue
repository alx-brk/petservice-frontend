<template>
  <v-container>
    <filter-drawer
      type="orderSearch"
      v-model="filterOptions"
      @search="search"
    ></filter-drawer>
    <div class="flex-wrap ma-3 flex-column align-start">
      <order-card
          v-for="order in searchResults"
          :key="order.id"
          :order="order"
          :selected-items-container="filterOptions"
      ></order-card>
    </div>
  </v-container>
</template>

<script>
    import * as api from '../../common/api.js';
    import OrderCard from "../common/OrderCard";
    import FilterDrawer from "../common/FilterDrawer";

    export default {
        name: "OrdersSearch",
        components: {
            'order-card': OrderCard,
            'filter-drawer': FilterDrawer
        },
        data: () => ({
            drawer: true,
            searchResults: [
                {
                    id: null,
                    client: null,
                    petsitter: null,
                    status: null,
                    animals: [],
                    petServices: [],
                    description: null,
                    startDate: null,
                    endDate: null,
                    creationDate: null
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
                // eslint-disable-next-line no-console
                console.log(this.filterOptions)
                api.jobController.post("/search", this.filterOptions)
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