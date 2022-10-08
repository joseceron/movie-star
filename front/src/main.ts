import Vue from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import store from './store'

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
