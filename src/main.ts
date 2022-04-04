import { createApp } from 'vue'
import App from './App.vue'
import { registerComponents } from './components/register';
import { router } from './router';
import './assets/main.scss';
import { createPinia } from 'pinia';
import { i18n } from './lang/';


init();

 function init() {

    console.time('🕓 Application Loaded');

    const app = createApp(App);

    app.use(router);
    app.use(createPinia());
    app.use(i18n);

    registerComponents(app);

    app.mount('#app');

    console.timeEnd('🕓 Application Loaded');

    console.group(`%c✨ Project Information`, 'color:DodgerBlue'); // groupCollapsed

    console.groupEnd();

    // Prevent the browser from opening files that are dragged on the window
    window.addEventListener('dragover', (e) => e.preventDefault(), false);
    window.addEventListener('drop', (e) => e.preventDefault(), false);
}

