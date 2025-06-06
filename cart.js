document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-icon');
    // const cartIconDisplayElement = document.getElementById('cart-icon-display'); // If you need to manipulate the icon later
    const cartDetailsDisplayElement = document.getElementById('cart-details-display');
    let currentTotalPrice = 0.0;
    let cartItemCount = 0; // Initialize item counter

    // Function to update the cart summary text
    function updateCartSummary() {
        // The icon is now static in HTML, so we only update the details span
        if (cartDetailsDisplayElement) {
            // Update text to include item count and total price
            cartDetailsDisplayElement.textContent = `${cartItemCount} DKK (${currentTotalPrice.toFixed(2)},-)`;
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