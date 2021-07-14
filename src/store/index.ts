import { createStore } from 'vuex';
import note from './modules/notes';

export default createStore({
  modules: {
    note
  }
});
