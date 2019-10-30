import Vue from 'vue'
import Vuex from 'vuex'
import cities from "./cities";
import animals from "./animals";
import services from "./services";
import units from "./units";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        cities,
        animals,
        services,
        units
    }
})