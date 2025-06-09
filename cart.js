document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-icon');
    const cartIconDisplayElement = document.getElementById('cart-icon-display'); 
    const cartDetailsDisplayElement = document.getElementById('cart-details-display');
    let currentTotalPrice = 0.0;
    let cartItems = []; // Array to store item objects {name, price}
    // cartItemCount can be derived from cartItems.length

    // Function to update the cart summary text
    function updateCartSummary() {
        if (cartIconDisplayElement) {
            // Update text to include item count and cart icon
            cartIconDisplayElement.textContent = `${cartItems.length} 🛒`;
        }
        if (cartDetailsDisplayElement) {
            // Update text to include total price
            cartDetailsDisplayElement.textContent = `DKK (${currentTotalPrice.toFixed(2)},-)`;
        }
    }

    // Add click event listener to the cart action button
    const cartActionButton = document.getElementById('cart-action-button');
    if (cartActionButton) {
        cartActionButton.addEventListener('click', () => {
            if (globalThis.CartOverlayModule && typeof globalThis.CartOverlayModule.show === 'function') {
                globalThis.CartOverlayModule.show(cartItems, currentTotalPrice);
            } else {
                console.error("CartOverlayModule is not loaded or 'show' function is missing.");
            }
        });
    }

    // Initialize cart summary text
    updateCartSummary();
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Prevent any default action or event bubbling if necessary
            // event.stopPropagation(); 

            const menuItem = button.closest('.menu-item');
            // Ensure you have a way to get the item's name, e.g., from a data attribute or a specific element
            // For example, if your HTML has <div class="menu-item" data-name="Coffee" data-price="25">...</div>
            const itemName = menuItem.dataset.name || menuItem.querySelector('.item-name')?.textContent || 'Unknown Item';

            if (menuItem && menuItem.dataset.price && itemName) {
                const price = parseFloat(menuItem.dataset.price);
                if (!isNaN(price)) {
                    cartItems.push({ name: itemName, price: price });
                    currentTotalPrice += price;
                    // cartItemCount is now cartItems.length
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

// In cart.js

// ... (your existing cart.js code) ...

function updateCartItemQuantity(itemKey, newQuantity) {
    const [name, priceString] = itemKey.split('_');
    const price = parseFloat(priceString);

    if (isNaN(price) || !name) {
        console.error('Invalid itemKey for quantity update:', itemKey);
        return;
    }

    // Create a new cartItems array based on the new quantity
    const newCartItems = [];
    let newTotalPrice = 0;

    // Add back other items
    cartItems.forEach(item => {
        if (item.name !== name || item.price !== price) {
            newCartItems.push(item);
            newTotalPrice += item.price;
        }
    });

    // Add the updated item with its new quantity
    for (let i = 0; i < newQuantity; i++) {
        newCartItems.push({ name: name, price: price });
        newTotalPrice += price;
    }

    cartItems = newCartItems; // Update the main cartItems array
    currentTotalPrice = newTotalPrice; // Update the main total price

    updateCartSummary(); // Update the summary display (e.g., DKK total in the header)

    // Refresh the cart overlay with the new state
    if (globalThis.CartOverlayModule && typeof globalThis.CartOverlayModule.show === 'function') {
        globalThis.CartOverlayModule.show(cartItems, currentTotalPrice);
    }
}

// Expose the function globally
globalThis.CartModule = {
    updateItemQuantity: updateCartItemQuantity
};

// Ensure updateCartSummary() is called initially as well
// document.addEventListener('DOMContentLoaded', () => { ... updateCartSummary(); ... });
