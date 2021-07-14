import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'



const app = createApp(App).use(router).use(store).use(VueAxios, axios);
app.mount('#app');
