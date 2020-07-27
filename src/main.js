import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuelidate from "vuelidate/src";
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

Vue.use(Vuelidate)
Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
