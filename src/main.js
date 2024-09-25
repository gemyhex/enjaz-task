import {createApp} from 'vue'
import { createVuetify } from 'vuetify';
import App from './App.vue'
import router from './router'
import './assets/scss/main.scss'
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App)
app.use(vuetify);
app.use(router)
app.mount('#app')
