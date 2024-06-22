document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('customInputChanged', (e) => {
    console.log(e);
  })
});