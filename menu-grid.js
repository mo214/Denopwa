
function toggleOverlay(elem) {
  const menuItem = elem.closest('.menu-item');
  if (menuITem) {
    menuItem.classList.toggle('show-overlay');
  }
  else {
    console.error('Element not found or does not have the expected class.');
  }
}
globalThis.addEventListener('DOMContentLoaded', () => {
 const  triggerElements = document.querySelectorAll('.js-toggle-overlay-trigger');
 triggerElements.foreach(triggerElements => {
  triggerElements.addEventListener('click', () => {toggleOverlay(this);
  });
 });
  });
 