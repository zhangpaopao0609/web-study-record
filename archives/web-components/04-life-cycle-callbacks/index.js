class CustonSquare extends HTMLElement {
  // 指定要观察的属性以便 attributeChangedCallback 生效
  static get observedAttributes() {
    return ['c', 'l'];
  };

  constructor() {
    super();
    this.init();
  };

  init() {
    const shadow = this.attachShadow({ mode: 'open' });
    const div = document.createElement('div');
    const style = document.createElement('style');

    shadow.appendChild(style);
    shadow.appendChild(div);
  };

  connectedCallback() {
    console.log('Custom square element added to page.');
    this.updateStyle(this);
  };

  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  };

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
    this.updateStyle(this);
  };

  updateStyle(elem) {
    const shadow = elem.shadowRoot;
    const childNodes = shadow.childNodes;
    childNodes.forEach(item => {
      if(item.nodeName === 'STYLE') {
        item.textContent = `
          div { 
            width: ${elem.getAttribute('l')}px;
            height: ${elem.getAttribute('l')}px;
            background-color: ${elem.getAttribute('c')};
          }
        `
      } 
    });
  }
};

customElements.define('custom-square', CustonSquare);