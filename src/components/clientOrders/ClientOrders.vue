<template>
  <v-container>
    <div class="flex-wrap ma-3 flex-column align-start"
         v-for="order in orders"
         :key="order.id"
    >
      <order-card
          :order="order"
          :selected-items-container="order.petsitter"
      ></order-card>
    </div>
  </v-container>
</template>

<script>
    import * as api from '../../common/api.js';
    import OrderCard from "../common/OrderCard";

    export default {
        name: "ClientOrders",
        components: {
            'order-card': OrderCard
        },
        data: () => ({
            orders: [
            ],
            profile: null
        }),
        methods: {},
        mounted() {
            this.profile = this.$store.getters.profile
            api.jobController.get("/client-orders", {
                params: {
                    id: this.profile.id
                }
            })
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