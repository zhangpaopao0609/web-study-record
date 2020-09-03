// 遍历 DOM 结构，解析指令和插值表达式
class Compiler {
  // el 待编译模板， vm-AVue 实例
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);
    
    // 把模板中的内容移到片段操作
    this.$fragment = this.node2Fragment(this.$el);
    // 执行编译操作
    this.compile(this.$fragment);
    // 放回 $el 中
    this.$el.appendChild(this.$fragment);
  }
  
  node2Fragment(el) {
    // 创建片段
    const fragment = document.createDocumentFragment();
    let child;
    while(child = el.firstChild) {
      fragment.appendChild(child);
    };
    return fragment;
  } 

  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if(node.nodeType == 1) {
        // 元素
        console.log('编译元素' + node.nodeName);
        this.compileElement(node);
      } else if(this.isInter(node)) {
        // 只关心{{xx}}
        console.log('编译插值文本' + node.textContent);
        this.compileText(node);
      }
      // 递归子节点
      if(node.children && node.childNodes.length > 0) {
        this.compile(node)
      };
      
    })
  }
  
  isInter(node) {
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  
  // 文本替换
  compileText(node) {
    console.log(RegExp.$1);
    node.textContent = this.$vm[RegExp.$1] 
    // 表达式
    const exp = RegExp.$1;
    this.update(node, exp, 'text'); // a-text
  }
  
  compileElement(node) {
    // 关心属性
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      // 规定：a-xx
      const attrName = attr.name; // A-xxx
      const exp = attr.value; // k-
      if(attrName.indexOf('a-') == 0) {
        // 指令
        const dir = attrName.substring(2); // xxx
        // 执行
        this[dir] && this[dir](node, exp);
      }
    })
  }
  
  update(node, exp, dir) {
    const updater = this[dir+'Updater'];
    updater && updater(node, this.$vm[exp]);  // 首次初始化更新
    // 此处创建watcher实例，依赖收集完成了
    new Watcher(this.$vm, exp, (value) => {
      updater && updater(node, value);
    })
  }
  
  textUpdater(node, value) {
    node.textContent = value;
  }
  
  text(node, exp) {
    this.update(node, exp, 'text')
  }
}