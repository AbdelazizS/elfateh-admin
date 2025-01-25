import './assets/css/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueFeather from 'vue-feather';
import PageHeaderVue from './components/ui/PageHeader.vue';
import Icon from '@/components/ui/Icon.vue';
import i18n from '@/plugins/i18n'
import VeeValidatePlugin from '@/plugins/validation'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component(VueFeather.name, VueFeather);
app.component('PageHeader', PageHeaderVue);
app.component('Icon', Icon);
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VeeValidatePlugin)

app.mount('#app')
