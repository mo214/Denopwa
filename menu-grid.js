
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
  document.querySelectorAll('.menu-item').forEach(el => {
    el.addEventListener('click', (event) => {
      e.stopPropagation(); // Prevent click from bubbling up to the document
      el.item.classList.toggle('show-overlay');
    });
  });

  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
      e.stopPropagation(); // Prevent click from bubbling up to the document
      const item = e.currentTarget.closest('.menu-item');
      item.classList.remove('show-overlay');
    });
  });
  });
 