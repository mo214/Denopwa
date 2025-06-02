
function toggleOverlay(elem) {
  const menuItem = elem.closest('.menu-item');
  if (menuItem) {
    menuItem.classList.toggle('show-overlay');
  }
  else {
    console.error('Element not found or does not have the expected class.');
  }
}
// Plain JavaScript version
document.addEventListener('DOMContentLoaded', () => {
  // Handle overlay toggle
  document.querySelectorAll('.js-toggle-overlay-trigger').forEach(trigger => {
    const handleActivation = (e) => {
      e.preventDefault();
     
      const menuItem = trigger.closest('.menu-item');
      if (menuItem) {
        menuItem.classList.toggle('show-overlay');
      }
    };
    
    trigger.addEventListener('click', handleActivation);
    trigger.addEventListener('touchend', handleActivation);
  });

  // Handle overlay close
  document.querySelectorAll('.close-btn').forEach(btn => {
    const handleClose = (e) => {
      e.stopPropagation();
      const menuItem = btn.closest('.menu-item');
      if (menuItem) {
        menuItem.classList.remove('show-overlay');
      }
    };
    
    btn.addEventListener('click', handleClose);
    btn.addEventListener('touchend', handleClose);
  });

  // Prevent scrolling when overlay is open
  document.addEventListener('touchmove', (e) => {
    if (document.querySelector('.menu-item.show-overlay')) {
      e.preventDefault();
    }
  }, { passive: false });
});

 