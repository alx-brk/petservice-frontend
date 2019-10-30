export default {
    state: {
        animals: ["Собаки", "Кошки", "Рыбки", "Рептилии", "Птицы", "Грызуны", "Насекомые", "Другое"]
    },
    mutations: {},
    actions: {},
    getters: {
        animals (state) {
            return state.animals
        }
    }
}