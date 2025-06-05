document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-icon');
    const cartSummaryTextElement = document.getElementById('cart-summary-text');
    let currentTotalPrice = 0.0;

    // Function to update the cart summary text
    function updateCartSummary() {
        if (cartSummaryTextElement) {
            cartSummaryTextElement.textContent = `Cart ($${currentTotalPrice.toFixed(2)})`;
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