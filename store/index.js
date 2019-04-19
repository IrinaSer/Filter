import Vue from 'vue'
import Vuex from 'vuex'
import filter from './modules/filter'
import result from './modules/result'
import layout from './modules/layout'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        layout,
        filter,
        result
    }
})
