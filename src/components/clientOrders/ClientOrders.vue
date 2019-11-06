<template>
  <v-container>
    <div class="flex-wrap ma-3 flex-column align-start">
      <order-card
          v-for="(order, index) in orders"
          :key="index"
          :order="order"
          :selected-items-container="order.petsitter"
      ></order-card>
    </div>
  </v-container>
</template>

<script>
    import OrderCard from "../common/OrderCard";

    export default {
        name: "ClientOrders",
        components: {
            'order-card': OrderCard
        },
        data: () => ({
            orders: [
                {
                    client: {
                        avatar: "https://randomuser.me/api/portraits/women/81.jpg",
                        name: "Маша Пупкина"
                    },
                    petsitter: null,
                    status: "Новый",
                    animals: ["Собаки", "Кошки"],
                    services: ["Выгул", "Кормление"],
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    startDate: "2019-10-31",
                    endDate: null,
                    creationDate: "2019-10-30"
                }
            ]
        }),
        computed: {
            animals() {
                return this.$store.getters.animals
            },
            services() {
                return this.$store.getters.services
            },
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>