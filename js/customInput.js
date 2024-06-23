class customInput extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // if (!this.inputEl || !this.placeholderEl) {
    //   console.error('Failed to find input or placeholder');
    //   if (this.placeholderEl) {
    //     this.placeholderEl.innerHTML = 'Failed to load';
    //   }
    //   if (this.inputEl) {
    //     this.inputEl.setAttribute('disabled', 'true');
    //   }
    //   return;
    // }

    let multiline = this.getAttribute('multiline');
    this.isMultiLine = multiline == 'true';
    
    let template;
    if (this.isMultiLine) {
      template = document.getElementById('custom-textarea-template').content;
    } else {
      template = document.getElementById('custom-input-template').content;
    }

    console.log(this.isMultiLine);
    console.log(template);

    let templateClone = template.cloneNode(true);

    this.inputEl = templateClone.getElementById('custom-input-element');
    this.placeholderEl = templateClone.getElementById('custom-placeholder-element');

    this.shadow.appendChild(templateClone);

    //#region Attributes
    let placeholder = this.getAttribute('placeholder');
    this.placeholderEl.innerHTML = placeholder || 'Placeholder not set';

    let elKey = this.getAttribute('key');
    this.elementKey = elKey || '';
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
    //#endregion Events

  }
}

customElements.define('custom-input', customInput);