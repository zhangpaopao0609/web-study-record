import Vue from "vue";
// import App from "./App.vue";
import App from "./App_test_aVuex.vue";
// import store from './store/index.js';
import store from './Astore/aIndex.js';

console.log(store)

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

Vue.component("Comp", {
  // template: '<div id="box" class="foo"><span>aaa</span></div>'
  render(h) {
    return h('div', {
      class: { foo: true },
      attrs: { id: 'box' }
    }, [ h('span', 'aaa') ])
  }
  // render(h) {
  //   return <div id="box" class="foo"><span>aaa</span></div>
  // }
})

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

// <div id="box" class="foo"><span>aaa</span></div>
