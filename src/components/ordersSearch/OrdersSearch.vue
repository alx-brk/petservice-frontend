<template>
  <v-container>
    <filter-drawer
            type="orderSearch"
            @input="updateFilterOptions"
            @search="search"
    />
    <div class="flex-wrap ma-3 flex-column align-start"
         v-for="order in searchResults"
         :key="order.id"
    >
      <order-card
              :order="order"
              :selected-items-container="filterOptions"
      />
    </div>
  </v-container>
</template>

<script>
    import OrderCard from "../common/OrderCard";
    import FilterDrawer from "../common/FilterDrawer";
    import FilterOptions from "../../model/FilterOptions";
    import JobService from "../../services/JobService";

    export default {
        name: "OrdersSearch",
        components: {
            'order-card': OrderCard,
            'filter-drawer': FilterDrawer
        },
        data: () => ({
            drawer: true,
            searchResults: [],
            filterOptions: new FilterOptions()
        }),
        methods: {
            search() {
                JobService.search(this.filterOptions)
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
