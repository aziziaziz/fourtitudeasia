let connectObj = {
  name: '',
  address: '',
  contact: '',
  details: ''
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('customInputChanged', (e) => {
    let allKeys = Object.keys(connectObj);
    if (allKeys.includes(e.detail.key)) {
      connectObj[e.detail.key] = e.detail.value;
    }
  });
});