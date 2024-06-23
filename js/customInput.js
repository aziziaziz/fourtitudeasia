class customInput extends HTMLElement {
  constructor() {
    super();

    // Creating the shadow of the current document
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    let multiline = this.getAttribute('multiline');
    this.isMultiLine = multiline == 'true';
    
    let template;
    // Get the template whether it is multiline (textarea) or not (input)
    if (this.isMultiLine) {
      template = document.getElementById('custom-textarea-template').content;
    } else {
      template = document.getElementById('custom-input-template').content;
    }

    // To clone the template and work on the clone instead
    let templateClone = template.cloneNode(true);

    // Get the input/textarea element and the placeholder
    this.inputEl = templateClone.getElementById('custom-input-element');
    this.placeholderEl = templateClone.getElementById('custom-placeholder-element');
    
    // Appending the cloned template
    this.shadow.appendChild(templateClone);

    //#region Attributes
    // Set the placeholder
    let placeholder = this.getAttribute('placeholder');
    this.placeholderEl.innerHTML = placeholder || 'Placeholder not set';

    // Set the key for easier handling when the input value changed
    let elKey = this.getAttribute('key');
    this.elementKey = elKey || '';

    // Setting the type of the input
    let elType = this.getAttribute('type');
    this.inputEl.setAttribute('type', elType || 'text');
    //#endregion Attributes

    //#region Events
    // When focus on the input, the placeholder will be moved up
    this.inputEl.addEventListener('focus', (e) => {
      if (!Array.from(this.placeholderEl.classList).includes('custom-placeholder-focus')) {
        this.placeholderEl.classList.add('custom-placeholder-focus');
      }
    });
    // When unfocus, the placeholder will come back to original place if the value is empty
    this.inputEl.addEventListener('blur', (e) => {
      if (!e.target.value) {
        this.placeholderEl.classList.remove('custom-placeholder-focus');
      }
    });
    // When the input value changed
    this.inputEl.addEventListener('input', (e) => {
      let value = e.target.value;

      if (elType == 'tel') {
        let match = value.match(/(\d)|\+/g);
        value = match ? match.join('') : '';
      }

      this.inputEl.value = value;

      // Create and dispatch the custom input changed event to be consumed by the parent of this custom element
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
  // Function to clear the input value from parent side
  clear() {
    this.inputEl.value = '';
    if (Array.from(this.placeholderEl.classList).includes('custom-placeholder-focus')) {
      this.placeholderEl.classList.remove('custom-placeholder-focus');
    }
  }
  //#endregion Methods
}

// Defining a custom element to be used in the HTML
customElements.define('custom-input', customInput);