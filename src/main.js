import { createApp } from 'vue'
import App from './App.vue'

//UI Kit
import 'mdb-vue-ui-kit/css/mdb.min.css';

//Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

//Router
import Router from './routes/Routes'

const app = createApp(App);
app.use(Router);
app.use(VueAxios, axios)
app.config.devtools = true;
app.mount('#app');
