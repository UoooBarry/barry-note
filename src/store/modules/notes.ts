import { getAllNotes, insertNote, Note } from '../../api/noteApi';

const state = () => ({
  all: []
});

const getters = {
  findNote: (state: { all: Note[]; }) => (id: string) => {
    return state.all.find((note: Note) => note._id === id);
  }
}

const actions = {
  async getAllNotes({ commit }: { commit: Function }) {
    const notes = await getAllNotes();
    commit('setNotes', notes);
  },
  async saveNote({ commit }: {commit: Function}, note: Note) {
    await insertNote(note);
    commit('saveNote', note);
  }
}

// mutations
const mutations = {
  setNotes(state: any, notes: [Note]) {
    state.all = notes
  },
  saveNote(state: any, _note: Note) {
    let note = state.all.find((note: Note) => note._id === _note._id);
    if(note) {
      note = _note;
    }else{
      state.all.push(note);
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
