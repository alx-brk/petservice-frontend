import JobService from "../services/JobService";

export default {
    state: {
        jobStatuses: []
    },
    mutations: {
        SET_STATUSES: (state, jobStatuses) => {
            state.jobStatuses = jobStatuses
        }
    },
    actions: {
        initStatuses: async ({commit, getters}) => {
            if (getters.jobStatuses.length === 0) {
                await JobService.fetchJobStatuses()
                    .then((response) => {
                        commit('SET_STATUSES', response.data)
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    })
            }
        }
    },
    getters: {
        jobStatuses (state) {
            return state.jobStatuses
        }
    }
}
