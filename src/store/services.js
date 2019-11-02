export default {
    state: {
        services: ["Передержка", "Выгул", "Кормление", "Дрессировка", "Уход за больным животным", "Стрижка"],
    },
    mutations: {},
    actions: {},
    getters: {
        services (state) {
            return state.services
        }
    }
}