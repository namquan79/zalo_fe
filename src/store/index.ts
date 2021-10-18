import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    token: ''
  },
  getters: {
    isLoggedIn (state): boolean {
      return !!state.token
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    clearToken (state) {
      state.token = ''
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    clearToken ({ commit }) {
      commit('clearToken')
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
