import Vue from 'vue';

// import App from './views/version-1-vuex-nested/App.vue';
import App from './views/version-2-props/App.vue';

import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
