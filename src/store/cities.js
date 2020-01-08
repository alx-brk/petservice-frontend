import CityService from "../services/CityService";

export default {
    state: {
        cities: []
    },
    mutations: {
        SET_CITIES: (state, cities) => {
            state.cities = cities
        }
    },
    actions: {
        initCities: async ({commit, getters}) => {
            if (getters.cities.length === 0) {
                await CityService.fetchAll()
                    .then((response) => {
                        commit('SET_CITIES', response.data)
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    })
            }
        }
    },
    getters: {
        cities (state) {
            return state.cities
        }
    }
}
