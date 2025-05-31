
function toggleOverlay(elem) {
  const menuItem = elem.closest('.menu-item');
  if (menuItem) {
    menuItem.classList.toggle('show-overlay');
  }
  else {
    console.error('Element not found or does not have the expected class.');
  }
}
globalThis.addEventListener('DOMContentLoaded', () => {
 const  triggerElements = document.querySelectorAll('.js-toggle-overlay-trigger');
 triggerElements.forEach(triggerElements => {
  triggerElements.addEventListener('click', () => {toggleOverlay(this);
  });
 });
  });
 