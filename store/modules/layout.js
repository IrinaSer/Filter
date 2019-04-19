const fieldsType = [{name: 'Text field', value: 'text'}, {name: 'Number field', value: 'number'}];
const textSelect = ['Containing', 'Exactly matching', 'Begins with', 'Ends with'];
const numberSelect = ['Equal', 'Greater than', 'Less than'];

export default {
  state: {
    setup: {
      fieldsType: fieldsType,
      textSelect: textSelect,
      numberSelect: numberSelect,
      defTextSelect: textSelect[0],
      defNumberSelect: numberSelect[0]
    },
  },
  getters: {
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
  mutations: {},
  actions: {}
}
