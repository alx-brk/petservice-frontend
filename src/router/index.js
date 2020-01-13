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
import Role from "../model/Role";
import UserService from "../services/UserService";
import jwtDecode from 'jwt-decode'
import Home from "../components/home/Home";

Vue.use(VueRouter)

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
            meta: { roles: [Role.USER, Role.ADMIN] }
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
            meta: { roles: [Role.USER, Role.ADMIN] }
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
            meta: { roles: [Role.USER, Role.ADMIN] }
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
            path: '/error/:id',
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
    const currentUser = UserService.currentUserValue;

    // eslint-disable-next-line no-console
    console.log('current user roles')
    // eslint-disable-next-line no-console
    console.log(roles)
    if (roles) {
        if (!currentUser) {
            return next({path: '/login'})
        }

        // eslint-disable-next-line no-console
        console.log('jwt decoded')

        let jwtObject = jwtDecode(currentUser.token);

        // eslint-disable-next-line no-console
        console.log(jwtObject)

        if (roles.length && !roles.includes(jwtObject.roles)){
            // eslint-disable-next-line no-console
            console.log("to 401")
            localStorage.removeItem('currentUser');
            return next({path: '/login'})
        }
    }
    next();
})

export default router;
