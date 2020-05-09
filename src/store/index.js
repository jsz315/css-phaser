import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: 1.0,
    assets: []
  },
  mutations: {
    changeVersion(state, value){
      state.version = value;
    },
    changeAssets(state, value){
      state.assets = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
