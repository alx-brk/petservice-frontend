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
    import JobService from "../../services/JobService";
    import UserService from "../../services/UserService";

    export default {
        name: "PetsitterOrders",
        components: {
            'order-card': OrderCard
        },
        data: () => ({
            orders: [],
            profile: null
        }),
        created() {
            this.profile = UserService.getProfileState;
            if (!this.profile) {
                // eslint-disable-next-line no-console
                console.log('/login');
                // this.$router.push('/login')
            }
        },
        mounted() {
            JobService.fetchPetsitterOrders(this.profile.id)
                .then((response) => {
                    this.orders = response.data
                    const csrfToken = response.config.headers[response.config.xsrfHeaderName];
                    if (csrfToken){
                        UserService.csrfToken = csrfToken
                    }
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
