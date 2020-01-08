import JobService from "../services/JobService";

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
