const fieldsType = [{name: 'Text field', value: 'text'}, {name: 'Number field', value: 'number'}];
const textSelect = ['Containing', 'Exactly matching', 'Begins with', 'Ends with'];
const numberSelect = ['Equal', 'Greater than', 'Less than'];
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
    setup: {
      fieldsType: fieldsType,
      textSelect: textSelect,
      numberSelect: numberSelect,
      defTextSelect: textSelect[0],
      defNumberSelect: numberSelect[0]
    },
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
    setup(state) {
      return state.setup
    },
    textValue(state) {
      return state.setup.defTextSelect
    },
    numberValue(state) {
      return state.setup.defNumberSelect
    }
  },
  actions: {}
}