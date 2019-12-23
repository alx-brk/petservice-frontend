import * as api from '../common/api.js';

export default {
    state: {
        profile: {
            id: null,
            avatar: null,
            email: "",
            name: "",
            phone: "",
            city: "",
            activePetsitter: false,
            catalogSet: [],
            animals: [],
            description: "",
            rating: null,
            feedback: []
        }
    },
    mutations: {
        SET_PROFILE: (state, profile) => {
            state.profile = profile
        }
    },
    actions: {
        fetchProfile: async ({commit, getters}) => {
            if (getters.profile.id === null) {
                await api.userController.get("", {
                    params: {
                        id: null,
                        email: "masha.pupkina@gmail.com"
                    }
                })
                    .then((response) => {
                        commit('SET_PROFILE', response.data)
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    })
            }
        }
    },
    getters: {
        profile (state) {
            return state.profile
        }
    }
}