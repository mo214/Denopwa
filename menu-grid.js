// menu-grid.js
// This file is currently empty or not provided in the initial context.
// Assuming it's for menu grid specific interactions.

document.addEventListener('DOMContentLoaded', () => {
  // Extract the table number from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const tableNumber = urlParams.get("table");

  // Store it globally for other scripts to access
  globalThis.currentTableNumber = tableNumber || null;

  // Display the table number if the element exists
  const tableNumberElement = document.getElementById("table-number-display"); // Changed ID for clarity
  if (tableNumberElement) {
    if (globalThis.currentTableNumber) {
      tableNumberElement.textContent = `Table ${globalThis.currentTableNumber}`;
    } else {
      tableNumberElement.textContent = 'Table number not specified in URL.';
    }
  }
});