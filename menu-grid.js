
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
  const triggerElements = document.querySelectorAll('.js-toggle-overlay-trigger');
  // Corrected: Changed the parameter name in forEach to avoid shadowing
  triggerElements.forEach(triggerElement => {
    // 'this' inside this function will correctly refer to the clicked triggerElement
    triggerElement.addEventListener('click', function() {
    toggleOverlay(this);
  });
 });
  });
 