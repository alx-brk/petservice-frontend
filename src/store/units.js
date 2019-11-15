import * as api from "../common/api";

export default {
    state: {
        units: ["руб/час", "руб/день", "руб"]
    },
    mutations: {
        SET_UNITS: (state, units) => {
            state.units = units
        }
    },
    actions: {
        initUnits: async ({commit, getters}) => {
            if (getters.units.length === 0) {
                await api.jobController.get("/units/all")
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