const state = () => ({
  key: ''
});

const getters = {
  isAuthenticated: (state: { key: string; }, getters: { getKey: string | any[]; }) => {
    return !(getters.getKey.length === 0);
  },
  getKey: (state: { key: string; }) => {
    if (state.key) {
      return state.key
    }else {
      const storeKey = localStorage.getItem('key') || '';
      state.key = storeKey;
      return storeKey;
    }
  }
}

const actions = {
  authorize({ commit }: { commit: Function }, key: string) {
    commit('setKey', key);
  }
}

const mutations = {
  setKey(state: { key: string; }, key: string) {
    state.key = key;
    localStorage.setItem('key', key)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
