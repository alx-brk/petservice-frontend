import Vue from 'vue'
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld";
import Profile from "../components/profile/Profile";
import NewOrder from "../components/newOrder/NewOrder";
import ClientOrders from "../components/clientOrders/ClientOrders";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: HelloWorld
        },
        {
            path: '/client-orders',
            name: 'client-orders',
            component: ClientOrders
        },
        {
            path: '/new-order',
            name: 'new-order',
            component: NewOrder
        },
        {
            path: '/petsitters-search',
            name: 'petsitters-search',
            component: HelloWorld
        },
        {
            path: '/petsitter-orders',
            name: 'petsitter-orders',
            component: HelloWorld
        },
        {
            path: '/orders-search',
            name: 'orders-search',
            component: HelloWorld
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
    ],
    base: process.env.BASE_URL,
    mode: 'history'
})