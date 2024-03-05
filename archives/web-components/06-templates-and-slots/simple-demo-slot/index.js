class MyParagraph extends HTMLElement {
  constructor() {
    super();
    this.init();
  };

  init() {
    const template = document.getElementById('my-paragraph');
    const templateContent = template.content;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateContent.cloneNode(true));
  };
};

customElements.define('my-paragraph', MyParagraph);

const slottedSpan = document.querySelector('my-paragraph span');

console.log(slottedSpan.assignedSlot);
console.log(slottedSpan.slot);