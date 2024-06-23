class customInput extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    let multiline = this.getAttribute('multiline');
    this.isMultiLine = multiline == 'true';
    
    let template;
    if (this.isMultiLine) {
      template = document.getElementById('custom-textarea-template').content;
    } else {
      template = document.getElementById('custom-input-template').content;
    }

    let templateClone = template.cloneNode(true);

    this.inputEl = templateClone.getElementById('custom-input-element');
    this.placeholderEl = templateClone.getElementById('custom-placeholder-element');

    this.shadow.appendChild(templateClone);

    //#region Attributes
    let placeholder = this.getAttribute('placeholder');
    this.placeholderEl.innerHTML = placeholder || 'Placeholder not set';

    let elKey = this.getAttribute('key');
    this.elementKey = elKey || '';

    let elType = this.getAttribute('type');
    this.inputEl.setAttribute('type', elType || 'text');
    //#endregion Attributes

    //#region Events
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
      let value = e.target.value;

      if (elType == 'tel') {
        let match = value.match(/(\d)|\+/g);
        value = match ? match.join('') : '';
      }

      this.inputEl.value = value;

      let event = new CustomEvent('customInputChanged', {
        detail: {
          value: value,
          key: this.elementKey
        },
        composed: true,
        bubbles: true
      });

      this.dispatchEvent(event);
    });
    //#endregion Events
  }

  //#region Methods
  clear() {
    this.inputEl.value = '';
    if (Array.from(this.placeholderEl.classList).includes('custom-placeholder-focus')) {
      this.placeholderEl.classList.remove('custom-placeholder-focus');
    }
  }
  //#endregion Methods
}

customElements.define('custom-input', customInput);