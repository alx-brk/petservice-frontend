<template>
  <v-container>
    <v-layout align="center" justify="center" class="flex-wrap ma-3 flex-column">
      <order-card
          v-for="(order, index) in orders"
          :key="index"
          :order="order"
      ></order-card>
    </v-layout>
  </v-container>
</template>

<script>
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
                    petsitter: {
                        avatar: "https://randomuser.me/api/portraits/women/81.jpg",
                        name: "Маша Пупкина"
                    },
                    status: "Обработан",
                    animals: ["Собаки", "Кошки"],
                    services: ["Выгул", "Кормление"],
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    startDate: "2019-10-31",
                    endDate: "2019-11-15",
                    creationDate: "2019-10-30"
                }
            ]
        })
    }
</script>

<style scoped>

</style>