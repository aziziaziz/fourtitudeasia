let connectObj = {
  name: '',
  address: '',
  contact: '',
  details: ''
};
let mobileMenuShow = false;

document.addEventListener('DOMContentLoaded', () => {
  connectButtonEnabled(false);

  // Event handler when the value of the custom input changed
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

// When clearing the connect details
function clearClicked() {
  // Getting the custom input and clear via the clear method
  let name = document.getElementById('connect-name');
  let address = document.getElementById('connect-address');
  let contact = document.getElementById('connect-contact');
  let details = document.getElementById('connect-details');
  name.clear();
  address.clear();
  contact.clear();
  details.clear();

  // Need to remove all the values in the object as well
  connectObj = {
    name: '',
    address: '',
    contact: '',
    details: ''
  };

  // Disabling the connect button
  connectButtonEnabled(false);
}

// When connect button is clicked
function connectClicked() {
  let verifyEmail = connectObj.address.match(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/g);
  let verifyContact = connectObj.contact.match(/^\+?[0-9()-]{7,20}$/g)
  if (verifyEmail && verifyContact) { // If the email address and the phone number is verified and in correct format
    alert('Thank you! We will get in touch with you as soon as possible.');
    clearClicked();
  } else { // Either the email or phone number is not in correct format
    if (!verifyEmail && !verifyContact) {
      alert('Please provide a valid email address and phone number.')
    } else if (!verifyEmail) {
      alert('Please provide a valid email address.');
    } else if (!verifyContact) {
      alert('Please proved a valid phone number.');
    }
  }
}

// To enable to disable the connect button
function connectButtonEnabled(enable) {
  let connectButton = document.getElementById('button-connect');
  if (enable) {
    connectButton.removeAttribute('disabled');
  } else {
    connectButton.setAttribute('disabled', true);
  }
}

// To show or hide the mobile menu using the burger icon
function showHideMobileMenuClicked(close) {
  let mobileBurger = document.getElementById('mobile-burger');
  let mobileBurgerClose = document.getElementById('mobile-burger-close');
  let navigator = document.getElementById('mobile-navigator');

  if (close) { // Close is provided means that the menu is forced to close
    mobileMenuShow = false;
  } else { // Based on the current state of the menu, if close, then open and vice versa
    mobileMenuShow = !mobileMenuShow;
  }

  if (mobileMenuShow) { // Hide the burger icon, show the close icon and show the menu
    mobileBurger.classList.add('mobile-menu-hide');
    mobileBurgerClose.classList.remove('mobile-menu-hide');

    navigator.classList.add('mobile-navigator-show');
    navigator.classList.remove('mobile-navigator-hide');
  } else { // Show the burger icon, hide the close icon and hide the menu
    mobileBurger.classList.remove('mobile-menu-hide');
    mobileBurgerClose.classList.add('mobile-menu-hide');

    navigator.classList.add('mobile-navigator-hide');
    navigator.classList.remove('mobile-navigator-show');
  }
}

// When the menu is clicked, scroll into the view
function scrollToView(id, isMobile) {
  let el = document.getElementById(id);
  window.scrollTo({
    top: el.offsetTop - (isMobile ? 45 : 60), // The element top offset had to be minused with a fix value based on the UI whether it is mobile or not
    behavior: 'smooth'
  });

  // To force the menu to be closed/hide
  showHideMobileMenuClicked(true);
}