import AnimalService from "../services/AnimalService";
import UserService from "../services/UserService";

export default {
    state: {
        animals: []
    },
    mutations: {
        SET_ANIMALS: (state, animals) => {
            state.animals = animals
        }
    },
    actions: {
        initAnimals: async ({commit, getters}) => {
            if (getters.animals.length === 0) {
                await AnimalService.fetchAll()
                    .then((response) => {
                        commit('SET_ANIMALS', response.data)
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
        animals (state) {
            return state.animals
        }
    }
}
