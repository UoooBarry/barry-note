import { getAllNotes, insertNote, updateNote, Note } from '../../api/noteApi';

const state = () => ({
  all: []
});

const getters = {
  findNote: (state: { all: Note[]; }) => (id: string) => {
    return state.all.find((note: Note) => note._id === id);
  },
  lastNote: (state: {all: Note[]; }) => {
    return state.all[state.all.length - 1];
  }
}

const actions = {
  async getAllNotes({ commit }: { commit: Function }) {
    const notes = await getAllNotes();
    commit('setNotes', notes);
  },
  async saveNote({ commit }: {commit: Function}, note: Note) {
    const newNote = await insertNote(note);
    commit('saveNote', note);
    return newNote;
  },
  async updateNote({ commit }: {commit: Function}, note: Note) {
    await updateNote(note);
    commit('saveNote', note);
  },
  async newNote({ commit }: {commit: Function}) {
    let note: Note = {title: "new", type: "text", content: ""};
    note = await insertNote(note);
    commit('saveNote', note) 
    return note;
  }
}

// mutations
const mutations = {
  setNotes(state: { all: Note[]; }, notes: [Note]) {
    state.all = notes
  },
  saveNote(state: { all: Note[]; }, _note: Note) {
    let note = state.all.find((note: Note) => note._id === _note._id);
    if(note) {
      note = _note;
    }else{
      state.all.push(_note);
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
