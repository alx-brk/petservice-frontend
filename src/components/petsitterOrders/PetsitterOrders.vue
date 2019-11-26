<template>
  <v-container>
    <v-layout align="center" justify="center" class="flex-wrap ma-3 flex-column">
      <order-card
          v-for="order in orders"
          :key="order.id"
          :order="order"
          :selected-items-container="order.petsitter"
      ></order-card>
    </v-layout>
  </v-container>
</template>

<script>
    import * as api from '../../common/api.js';
    import OrderCard from "../common/OrderCard";

    export default {
        name: "PetsitterOrders",
        components: {
            'order-card': OrderCard
        },
        data: () => ({
            orders: [
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
            profile: null
        }),
        mounted() {
            this.profile = this.$store.getters.profile
            api.jobController.get("/petsitter-orders", {
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