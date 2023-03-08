import { createApp } from 'vue';
import App from './App.vue';
// Vue Router
import router from './router/routers.js';
// tailwind css
import './assets/style.css';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.mount('#app');
