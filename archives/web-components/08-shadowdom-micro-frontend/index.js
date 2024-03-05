class MicroFrontendWebComponents extends HTMLElement {
  constructor() {
    super();
    this.init();
  };

  init() {
    const template = document.getElementById('micro-frontend-web-components');
    const templateContent = template.content;
    const shadow = this.attachShadow({ mode: 'open' });
    const m = document.createElement("script");
    m.innerHTML =`  
      new Vue({
        el: ,
        data: function() {
          return { visible: false }
        }
      })
   `
    
    shadow.appendChild(templateContent.cloneNode(true));
    shadow.appendChild(m);

  };
};

customElements.define('micro-frontend-web-components', MicroFrontendWebComponents);