class WordCount extends HTMLParagraphElement {
  constructor() {
    // 必须首先调用 super() 方法，这样才能继承父类的属性和方法
    super();

    // 元素的功能代码写在这里
  }
};

customElements.define('word-count', WordCount, { extends: 'p' });