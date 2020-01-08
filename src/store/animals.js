import AnimalService from "../services/AnimalService";

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
