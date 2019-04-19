export default {
  state: {
    result: {
      text: [],
      number: []
    }
  },
  getters: {
    result(state) {
      return state.result
    }
  },
  mutations: {
    clearResult(state) {
      state.result = {
        text: [],
        number: []
      }
    },
    updateResult(state, payload) {
      let key = payload.type
      delete payload.type
      state.result[key].push(payload)
    }
  }
}
