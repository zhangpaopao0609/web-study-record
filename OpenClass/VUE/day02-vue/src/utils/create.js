import Vue from 'vue';

// 创建指定实例，并且挂载于body上
export default function create( Component, props ) {
  // 0. 先创建vue实例
  const vm = new Vue({
    render(h) {
      // render 方法提供给我们一个h函数，它可以渲染 VNode
      return h(Component, { props })
    }   
  }).$mount();
  // 1. 上面的vm创建组件实例
  console.log(vm);
  // 2. 通过$children来获取该组件实例
  const comp = vm.$children[0];
  // 3. 追加至body
  document.body.appendChild(vm.$el);
  // 4. 清理函数
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy;
  }
  // 5. 返回组件实例
  return comp;
}