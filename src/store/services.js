export default {
    state: {
        services: ["Передержка", "Выгул", "Кормление", "Дрессировка", "Стрижка", "Уход за больным животным"],
    },
    mutations: {},
    actions: {},
    getters: {
        services (state) {
            return state.services
        }
    }
}