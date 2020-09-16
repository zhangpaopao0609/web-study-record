import Vue from 'vue';
import Icon from '@/components/icon.vue';

// 图标自动导入
// 利用webpack的require.context自动导入
// 返回的req是只去加载svg目录中的木模块中的函数
const req = require.context('./svg', false, /\.svg$/);

req.keys().map(req);

// 把Icon组件全局注册一下
Vue.component('Icon', Icon);