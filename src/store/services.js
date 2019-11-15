import * as api from "../common/api";

export default {
    state: {
        services: [],
    },
    mutations: {
        SET_SERVICES: (state, services) => {
            state.services = services
        }
    },
    actions: {
        initServices: async ({commit, getters}) => {
            if (getters.services.length === 0) {
                await api.serviceController.get("/all")
                    .then((response) => {
                        commit('SET_SERVICES', response.data)
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    })
            }
        }
    },
    getters: {
        services (state) {
            return state.services
        }
    }
}