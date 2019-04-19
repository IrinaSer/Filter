let id = () => {
    return Math.random().toString(36).substr(2, 9)
};

class FilterRow {
    constructor(selectType, selectOperation, inputValue, id = null) {
        this.selectType = selectType
        this.selectOperation = selectOperation
        this.inputValue = inputValue
        this.id = id
    }
}

export default {
    state: {
        rows: []
    },
    mutations: {
        createFilterRow(state) {
            const filterRow = new FilterRow('text', 'Containing', '', id())
            state.rows.push(filterRow)
        },
        deleteFilterRow(state, id) {
            state.rows = state.rows.filter(item => item.id !== id)
        },
        clearFilter(state) {
            state.rows = []
        }
    },
    getters: {
        rows(state) {
            return state.rows
        },
    },
    actions: {}
}
