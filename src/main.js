import { createApp } from 'vue'
import App from './App.vue'
import CScrollbar from 'c-scrollbar';
import Menus from 'vue3-menus';
createApp(App).use(Menus).use(CScrollbar).mount('#app')
