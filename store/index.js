import Vue from 'vue'
import Vuex from 'vuex'
import filter from './modules/filter'
import result from './modules/result'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      filter,
      result
    }
  })