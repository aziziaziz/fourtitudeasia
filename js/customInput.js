class customInput extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'open' });
    let template = document.getElementById('custom-input-template').content;
    let templateClone = template.cloneNode(true);

    this.inputEl = templateClone.getElementById('custom-input-element');
    this.placeholderEl = templateClone.getElementById('custom-placeholder-element');

    shadow.appendChild(templateClone);
  }

  connectedCallback() {
    let placeholder = this.getAttribute('placeholder');
    this.placeholderEl.innerHTML = placeholder || 'Placeholder not set';
  }
}

customElements.define('custom-input', customInput);