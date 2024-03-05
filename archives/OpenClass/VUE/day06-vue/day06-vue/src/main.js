import Vue from 'vue'
import App from './layout/index.vue'
import router from './router/index.js'

import '@/assets/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
