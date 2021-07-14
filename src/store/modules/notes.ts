import {getAllNotes, Note} from '../../api/noteApi';

const state = () => ({
  all: []
});

const getters = {}

const actions = {
  async getAllNotes ({commit} : { commit: Function }) {
    const notes = await getAllNotes();
    commit('setNotes', notes)
  }
}

// mutations
const mutations = {
  setNotes (state: any, notes: [Note]) {
    state.all = notes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
