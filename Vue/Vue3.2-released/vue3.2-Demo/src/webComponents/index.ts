import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // 普通的 vue 组件
  props: {
    msg: String,
  },
  emits: {},
  template: `<div class="msg">{{ msg }}</div>`,

  styles: [`.msg { color: red; }`]
});


// 注册自定义元素.
// 注册后，页面上所有的 `<my-vue-element>` 标签都会更新
customElements.define('my-vue-element', MyVueElement);

import Msg from "./msg.ce.vue";

const MyVueElementBaseSFC = defineCustomElement(Msg);
customElements.define('my-vue-element-base-sfc', MyVueElementBaseSFC);


// 还可以将实例挂载到元素中
// 仅在注册完成后
// document.body.appendChild(
//   new MyVueElement({
//     // 初始化 props
//   })
// )