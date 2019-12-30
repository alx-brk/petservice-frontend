<template>
    <v-container>
        <div class="flex-wrap ma-3 flex-column align-start"
             v-for="order in orders"
             :key="order.id"
        >
          <order-card
                  :order="order"
                  :selected-items-container="order.petsitter"
          />
        </div>
    </v-container>
</template>

<script>
    import OrderCard from "../common/OrderCard";
    import JobService from "../../services/JobService";

    export default {
        name: "ClientOrders",
        components: {
            'order-card': OrderCard
        },
        data: () => ({
            orders: [],
            profile: null
        }),
        methods: {},
        mounted() {
            this.profile = JSON.parse(localStorage.getItem('currentUser'))

            JobService.fetchClientOrders(this.profile.id)
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