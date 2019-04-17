let fieldsType = [{name: 'Text field', value: 'text'}, {name: 'Number field', value: 'number'}];
let textSelect = ['Containing', 'Exactly matching', 'Begins with', 'Ends with'];
let numberSelect = ['Equal', 'Greater than', 'Less than'];
let id = () => {
  return Math.random().toString(36).substr(2, 9)
};
class FilterRow {
  constructor (fieldsType, textSelect, numberSelect, selectType, selectOperation, inputValue, id = null) {
    this.fieldsType = fieldsType
    this.textSelect = textSelect
    this.numberSelect = numberSelect
    this.selectType = selectType
    this.selectOperation = selectOperation
    this.inputValue = inputValue
    this.id = id
  }
}
export default {
  state: {
    row: [],
    textSelect: textSelect[0],
    numberSelect: numberSelect[0]
  },
  mutations: {
    createFilterRow (state) {
      const filterRow = new FilterRow (fieldsType, textSelect, numberSelect, 'text', 'Containing', '', id())
      state.row.push(filterRow)
    },
    deleteFilterRow (state, id) {
      state.row = state.row.filter(item => item.id !== id)
    },
    clearFilter (state) {
      state.row = []
    }
  },
  getters: {
    rows (state) {
      return state.row
    },
    textValue (state) {
      return state.textSelect
    },
    numberValue (state) {
      return state.numberSelect
    }
  },
  actions: {}
}