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
    if (!this.inputEl || !this.placeholderEl) {
      console.error('Failed to find input or placeholder');
      if (this.placeholderEl) {
        this.placeholderEl.innerHTML = 'Failed to load';
      }
      if (this.inputEl) {
        this.inputEl.setAttribute('disabled', 'true');
      }
      return;
    }

    let placeholder = this.getAttribute('placeholder');
    this.placeholderEl.innerHTML = placeholder || 'Placeholder not set';

    let elKey = this.getAttribute('key');
    this.elementKey = elKey || '';

    this.inputEl.addEventListener('focus', (e) => {
      if (!Array.from(this.placeholderEl.classList).includes('custom-placeholder-focus')) {
        this.placeholderEl.classList.add('custom-placeholder-focus');
      }
    });
    this.inputEl.addEventListener('blur', (e) => {
      if (!e.target.value) {
        this.placeholderEl.classList.remove('custom-placeholder-focus');
      }
    });
    this.inputEl.addEventListener('input', (e) => {
      let event = new CustomEvent('customInputChanged', {
        detail: {
          value: e.target.value,
          key: this.elementKey
        },
        composed: true,
        bubbles: true
      });

      this.dispatchEvent(event);
    });
  }
}

customElements.define('custom-input', customInput);