<template>
  <v-container>
    <filter-drawer
        type="orderSearch"
        @input="updateFilterOptions"
        @search="search"
    ></filter-drawer>
    <div class="flex-wrap ma-3 flex-column align-start"
         v-for="order in searchResults"
         :key="order.id"
    >
      <order-card
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
            searchResults: [],
            filterOptions: {
                city: null,
                animals: [],
                petServices: [],
                startDate: null,
                endDate: null,
                creationDate: null,
                jobStatus: null
            }
        }),
        mounted() {
        },
        methods: {
            search() {
                api.jobController.post("/search", this.filterOptions)
                    .then((response) => {
                        this.searchResults = response.data
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    })
            },
            updateFilterOptions(options){
                this.filterOptions = options
            }
        }
    }
</script>

<style scoped>

</style>