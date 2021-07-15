import { createStore } from 'vuex';
import note from './modules/notes';
import auth from './modules/auth';

export default createStore({
  modules: {
    note,
    auth
  }
});
