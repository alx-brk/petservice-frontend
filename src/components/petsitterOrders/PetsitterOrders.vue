<template>
  <v-container>
    <v-layout align="center" justify="center" class="flex-wrap ma-3 flex-column">
      <order-card
              v-for="order in orders"
              :key="order.id"
              :order="order"
              :selected-items-container="order.petsitter"
      />
    </v-layout>
  </v-container>
</template>

<script>
    import OrderCard from "../common/OrderCard";
    import User from "../../model/User";
    import JobService from "../../services/JobService";

    export default {
        name: "PetsitterOrders",
        components: {
            'order-card': OrderCard
        },
        data: () => ({
            orders: [],
            profile: new User()
        }),
        mounted() {
            this.profile = JSON.parse(localStorage.getItem('currentUser'))
            JobService.fetchPetsitterOrders(this.profile.id)
                .then((response) => {
                    this.orders = response.data
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                })
        }
    }
</script>

<style scoped>

</style>
