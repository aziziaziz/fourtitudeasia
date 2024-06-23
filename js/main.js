let connectObj = {
  name: '',
  address: '',
  contact: '',
  details: ''
};

document.addEventListener('DOMContentLoaded', () => {
  connectButtonEnabled(false);

  document.body.addEventListener('customInputChanged', (e) => {
    let allKeys = Object.keys(connectObj);
    if (allKeys.includes(e.detail.key)) {
      connectObj[e.detail.key] = e.detail.value;
    }

    let emptyValues = Object.values(connectObj).filter(v => !v);
    if (emptyValues.length > 0) {
      connectButtonEnabled(false);
    } else {
      connectButtonEnabled(true);
    }
  });
});

function clearClicked() {
  let name = document.getElementById('connect-name');
  let address = document.getElementById('connect-address');
  let contact = document.getElementById('connect-contact');
  let details = document.getElementById('connect-details');
  name.clear();
  address.clear();
  contact.clear();
  details.clear();

  connectButtonEnabled(false);
}

function connectClicked() {
  let verifyEmail = connectObj.address.match(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/g);
  let verifyContact = connectObj.contact.match(/^\+?[0-9()-]{7,20}$/g)
  if (verifyEmail && verifyContact) {
    alert('Thank you! We will get in touch with you as soon as possible.');
    clearClicked();
  } else {
    if (!verifyEmail && !verifyContact) {
      alert('Please provide a valid email address and phone number.')
    } else if (!verifyEmail) {
      alert('Please provide a valid email address.');
    } else if (!verifyContact) {
      alert('Please proved a valid phone number.');
    }
  }
}

function connectButtonEnabled(enable) {
  let connectButton = document.getElementById('button-connect');
  if (enable) {
    connectButton.removeAttribute('disabled');
  } else {
    connectButton.setAttribute('disabled', true);
  }
}