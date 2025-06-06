document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-icon');
    const cartIconDisplayElement = document.getElementById('cart-icon-display'); 
    const cartDetailsDisplayElement = document.getElementById('cart-details-display');
    let currentTotalPrice = 0.0;
    let cartItemCount = 0; // Initialize item counter

    // Function to update the cart summary text
    function updateCartSummary() {
        if (cartIconDisplayElement) {
            // Update text to include item count and cart icon
            cartIconDisplayElement.textContent = `${cartItemCount} 🛒`;
        }
        if (cartDetailsDisplayElement) {
            // Update text to include total price
            cartDetailsDisplayElement.textContent = `DKK (${currentTotalPrice.toFixed(2)},-)`;
        }
    }

    // Initialize cart summary text
    updateCartSummary();
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Prevent any default action or event bubbling if necessary
            // event.stopPropagation(); 

            const menuItem = button.closest('.menu-item');
            if (menuItem && menuItem.dataset.price) {
                const price = parseFloat(menuItem.dataset.price);
                if (!isNaN(price)) {
                    currentTotalPrice += price;
                    cartItemCount++; // Increment the item count
                    updateCartSummary();
                } else {
                    console.warn('Item price is not a valid number:', menuItem.dataset.price);
                }
            } else {
                console.warn('Could not find price for item:', menuItem);
            }
        });
    });
});