<template>
  <v-container>
    <filter-drawer></filter-drawer>
    <div class="flex-wrap ma-3 flex-column align-start">
      <order-card
          v-for="(order, index) in orders"
          :key="index"
          :order="order"
          :petsitter-animals="[]"
          :petsitter-services="[]"
      ></order-card>
    </div>
  </v-container>
</template>

<script>
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
        })
    }
</script>

<style scoped>

</style>