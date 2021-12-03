import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    token: '',
    permission: '',
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
    },
    setPermission (state, permisson) {
      state.permission = permisson
    },
    clearPermission (state) {
      state.permission = ''
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    clearToken ({ commit }) {
      commit('clearToken')
    },
    setPermission ({ commit }, permission) {
      commit('setPermission', permission)
    },
    clearPermission ({ commit }) {
      commit('clearPermission')
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
