import JobService from "../services/JobService";
import UserService from "../services/UserService";

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
        jobStatuses (state) {
            return state.jobStatuses
        }
    }
}
