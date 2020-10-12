import Vue from 'vue';
import Vuex from 'vuex';

import num from './count.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    num
  }
});
