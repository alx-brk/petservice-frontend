import Vue from 'vue'
import VueRouter from "vue-router";
import Profile from "../components/profile/Profile";
import NewOrder from "../components/newOrder/NewOrder";
import ClientOrders from "../components/clientOrders/ClientOrders";
import PetsitterOrders from "../components/petsitterOrders/PetsitterOrders";
import OrdersSearch from "../components/ordersSearch/OrdersSearch";
import PetsittersSearch from "../components/petsittersSearch/PetsittersSearch";
import Registration from "../components/auth/Registration";
import Login from "../components/auth/Login";
import ErrorPage from "../components/auth/ErrorPage";
import UserRole from "../model/UserRole";
import jwtDecode from 'jwt-decode'
import Home from "../components/home/Home";
import UserService from "../services/UserService";

Vue.use(VueRouter)
Vue.use(require('vue-cookies'))

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/client-orders',
            name: 'client-orders',
            component: ClientOrders,
            meta: { roles: [UserRole.USER, UserRole.ADMIN] }
        },
        {
            path: '/new-order',
            name: 'new-order',
            component: NewOrder
        },
        {
            path: '/petsitters-search',
            name: 'petsitters-search',
            component: PetsittersSearch
        },
        {
            path: '/petsitter-orders',
            name: 'petsitter-orders',
            component: PetsitterOrders,
            meta: { roles: [UserRole.USER, UserRole.ADMIN] }
        },
        {
            path: '/orders-search',
            name: 'orders-search',
            component: OrdersSearch
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: { roles: [UserRole.USER, UserRole.ADMIN] }
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/error/:errorCode',
            name: 'error',
            component: ErrorPage
        },
        {
            path: '*',
            redirect: '/error/404'
        },

    ],
    base: process.env.BASE_URL,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    const { roles } = to.meta;
    const jwtToken = UserService.jwtTokenValue;

    // eslint-disable-next-line no-console
    console.log('required user roles')
    // eslint-disable-next-line no-console
    console.log(roles)
    if (roles) {
        if (!jwtToken) {
            return next('/login')
        }

        // eslint-disable-next-line no-console
        console.log('jwt decoded')

        let jwtObject = jwtDecode(jwtToken);

        // eslint-disable-next-line no-console
        console.log(jwtObject)

        if (roles.length && !jwtObject.authorities.some(item => roles.includes(item.authority))){
            // eslint-disable-next-line no-console
            console.log("to 401")
            localStorage.removeItem('jwtToken');
            return next('/login')
        }
    }
    next();
})

export default router;
