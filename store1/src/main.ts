import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';
import Auth from '../../../doppio/libs/controllers/auth';
import resourceManager from '../../../doppio/libs/resourceManager';
import call from '../../../doppio/libs/controllers/call';
import socket from '../../../doppio/libs/controllers/socket';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

createApp(App).use(router).mount('#app')
const app = createApp(App);
const auth = reactive(new Auth());
const vuetify = createVuetify();

app.use(router);
app.use(resourceManager);
app.use(vuetify);

app.config.globalProperties.$auth = auth;
app.config.globalProperties.$call = call;
app.config.globalProperties.$socket = socket;

app.mount('#app');