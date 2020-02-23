import JobService from "../services/JobService";
import UserService from "../services/UserService";

export default {
    state: {
        units: []
    },
    mutations: {
        SET_UNITS: (state, units) => {
            state.units = units
        }
    },
    actions: {
        initUnits: async ({commit, getters}) => {
            if (getters.units.length === 0) {
                await JobService.fetchUnits()
                    .then((response) => {
                        commit('SET_UNITS', response.data)
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
    },
    getters: {
        units (state) {
            return state.units
        }
    }
}
