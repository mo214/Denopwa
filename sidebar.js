function openSidebar() {
  document.getElementByclass('sidebar').style.width = '250px';
}

function closeSidebar() {
  document.getElementByclass('sidebar').style.width = '0';
}

globalThis.addEventListener('DOMContentLoaded', () => {
  // Optionally, close sidebar when clicking outside of it
  document.addEventListener('click', function(event) {
    const sidebar = document.getElementByclass('sidebar');
    if (sidebar && sidebar.style.width === '250px' && !sidebar.contains(event.target) && event.target.id !== 'openSidebarBtn') {
      closeSidebar();
    }
  });
});