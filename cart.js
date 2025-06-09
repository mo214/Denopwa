// Variables and functions that need to be accessed across different parts of the script
let currentTotalPrice = 0.0;
let cartItems = []; // Array to store item objects {name, price}
let cartIconDisplayElement = null;
let cartDetailsDisplayElement = null;

// Function to update the cart summary text - now at the top level
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

// Function to clear the cart
function clearCart() {
    cartItems = [];
    currentTotalPrice = 0.0;
    updateCartSummary();
    // If the cart overlay is open, it might be good to refresh or hide it too
    // For now, just clearing data and updating summary.
}
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-icon');
    cartIconDisplayElement = document.getElementById('cart-icon-display'); // Assign to top-level variable
    cartDetailsDisplayElement = document.getElementById('cart-details-display'); // Assign to top-level variable

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

    // Add click event listener to the "Bestill" (Order) button
    const orderButton = document.getElementById('order-button');
    if (orderButton) {
        orderButton.addEventListener('click', () => {
            orderButton.disabled = true;
            orderButton.textContent = 'Bestiller...'; // "Ordering..."

            if (cartItems.length === 0) {
                alert("Your cart is empty. Add some items before placing an order.");
                orderButton.disabled = false;
                orderButton.textContent = 'Bestill';
                return;
            }

            // Directly show confirmation and clear cart without backend call
            if (globalThis.OrderConfirmationOverlayModule && typeof globalThis.OrderConfirmationOverlayModule.show === 'function') {
                globalThis.OrderConfirmationOverlayModule.show(cartItems, currentTotalPrice);
                clearCart();
            } else {
                console.error("OrderConfirmationOverlayModule is not loaded or 'show' function is missing.");
            }

            // Re-enable button after a short delay to allow overlay to show
            setTimeout(() => {
                orderButton.disabled = false;
                orderButton.textContent = 'Bestill';
            }, 500); // Adjust delay as needed
        });
    }
    // Initialize cart summary text now that DOM elements are assigned
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

function updateCartItemQuantity(itemKey, newQuantity) {
    const [name, priceString] = itemKey.split('_');
    const price = parseFloat(priceString);

    if (isNaN(price) || !name) {
        console.error('Invalid itemKey for quantity update:', itemKey);
        return;
    }

    // Create a new cartItems array based on the new quantity
    let newAggregatedCartItems = []; // Renaming to avoid confusion with top-level cartItems
    let newTotalPrice = 0;

    // Filter out the item being updated, keep others
    cartItems.forEach(item => {
        if (item.name !== name || item.price !== price) {
            newAggregatedCartItems.push(item);
            newTotalPrice += item.price;
        }
    });

    // Add the updated item with its new quantity
    for (let i = 0; i < newQuantity; i++) {
        newAggregatedCartItems.push({ name: name, price: price });
        newTotalPrice += price;
    }

    cartItems = newAggregatedCartItems; // Update the main cartItems array
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
//version 1.0.8