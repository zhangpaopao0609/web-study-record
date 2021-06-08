class UserCard extends HTMLElement {
  constructor() {
    super();

    var templateElem = document.getElementById('userCardTemplate');
    var content = templateElem.content.cloneNode(true);
    content.querySelector('img').setAttribute('src', this.getAttribute('image'));
    content.querySelector('.container>.name').innerText = this.getAttribute('name');
    content.querySelector('.container>.email').innerText = this.getAttribute('email');
    // this.appendChild(content);
    // const span = document.createElement('span');
    // span.innerHTML = '111'
    // document.body.appendChild(span);

    this.attachShadow({ mode: 'open' })
      .appendChild(content);
    
  }
}
window.customElements.define('user-card', UserCard); 