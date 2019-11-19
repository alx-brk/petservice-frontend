<template>
  <v-container>
    <v-layout align="center" justify="center" class="flex-wrap ma-3 flex-column">
      <order-card
          v-for="(order, index) in orders"
          :key="index"
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
                    client: {
                        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                        name: "Вася"
                    },
                    petsitter: null,
                    status: "Обработан",
                    animals: ["Собаки", "Кошки"],
                    services: ["Выгул", "Кормление"],
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    startDate: "2019-10-31",
                    endDate: "2019-11-15",
                    creationDate: "2019-10-30"
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