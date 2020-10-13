import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ELEMENT from "ELEMENT";
import DUIUI from "DUIUI";

Vue.use(ELEMENT);
Vue.use(DUIUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
