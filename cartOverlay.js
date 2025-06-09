// cartOverlay.js
(function() {
    'use strict';

    let overlayElement = null;
    let overlayItemsContainer = null; // To display individual cart items
    let overlayTotalPriceElement = null;
    let closeOverlayButton = null;

    function createCartOverlayDOM() {
        if (document.getElementById('cart-overlay-container')) {
            // Already created
            return;
        }

        overlayElement = document.createElement('div');
        overlayElement.id = 'cart-overlay-container';
        Object.assign(overlayElement.style, {
            position: 'fixed', top: '0', left: '0',
            width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'none', // Initially hidden
            justifyContent: 'center', alignItems: 'center',
            zIndex: '1000',
            fontFamily: 'Arial, sans-serif' // Basic font
        });

        const overlayContent = document.createElement('div');
        Object.assign(overlayContent.style, {
            backgroundColor: 'white', padding: '25px',
            borderRadius: '8px', textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
            minWidth: '250px'
        });

        const title = document.createElement('h2');
        title.textContent = 'Cart Summary';
        title.style.marginTop = '0';
        title.style.marginBottom = '15px';

        // Container for item details
        overlayItemsContainer = document.createElement('div');
        overlayItemsContainer.id = 'overlay-items-list';
        Object.assign(overlayItemsContainer.style, {
            marginBottom: '15px',
            maxHeight: '200px', // Adjust as needed, makes it scrollable if many items
            overflowY: 'auto',
            textAlign: 'left', // Align item text to the left
            borderBottom: '1px solid #eee', // Visual separator
            paddingBottom: '10px', // Space below items before separator
            fontSize: '0.9em'
        });

        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = 'Total price: DKK ';
        priceParagraph.style.fontSize = '1.1em';
        overlayTotalPriceElement = document.createElement('span');
        overlayTotalPriceElement.id = 'overlay-total-price';
        overlayTotalPriceElement.textContent = '0.00'; // Initial placeholder
        priceParagraph.appendChild(overlayTotalPriceElement);
        priceParagraph.append(',-');

        closeOverlayButton = document.createElement('button');
        closeOverlayButton.id = 'close-overlay-btn';
        closeOverlayButton.textContent = 'Close';
        Object.assign(closeOverlayButton.style, {
            marginTop: '20px', padding: '10px 20px', cursor: 'pointer',
            backgroundColor: '#007bff', color: 'white', border: 'none',
            borderRadius: '5px', fontSize: '1em'
        });

        overlayContent.appendChild(title);
        overlayContent.appendChild(overlayItemsContainer); // Add items container before total price
        overlayContent.appendChild(priceParagraph);
        overlayContent.appendChild(closeOverlayButton);
        overlayElement.appendChild(overlayContent);
        document.body.appendChild(overlayElement);

        // Event listeners for closing
        closeOverlayButton.addEventListener('click', hideCartOverlay);
        overlayElement.addEventListener('click', (event) => {
            if (event.target === overlayElement) { // Only if clicked on the background
                hideCartOverlay();
            }
        });
    }

    // Updated to accept an array of items and the total price
    function showCartOverlay(items, totalPrice) {
        if (!overlayElement) {
            createCartOverlayDOM(); // Ensure it's created
        }

        // Populate item details
        if (overlayItemsContainer) {
            overlayItemsContainer.innerHTML = ''; // Clear previous items

            if (items && items.length > 0) {
                const aggregatedItems = new Map();
                items.forEach(item => {
                    // Create a unique key for each item based on its name and price
                    const itemKey = `${item.name}_${item.price}`;
                    if (aggregatedItems.has(itemKey)) {
                        aggregatedItems.get(itemKey).count++;
                    } else {
                        aggregatedItems.set(itemKey, { ...item, count: 1 });
                    }
                });

                aggregatedItems.forEach(aggregatedItem => {
                    const itemKey = `${aggregatedItem.name}_${aggregatedItem.price}`; // Re-construct itemKey for handlers
                    const itemElement = document.createElement('p');
                    itemElement.style.margin = '8px 0'; // Adjust spacing for each item line
                    itemElement.style.display = 'flex'; // For aligning items in the line
                    itemElement.style.alignItems = 'center'; // Vertically align items in the line

                    const itemName = aggregatedItem.name || 'Unnamed Item';
                    const itemPrice = typeof aggregatedItem.price === 'number' ? aggregatedItem.price.toFixed(2) : 'N/A';
                    const itemCount = aggregatedItem.count;

                    // Item Info Span (Name and Price)
                    const itemInfoSpan = document.createElement('span');
                    itemInfoSpan.textContent = `${itemName}: DKK ${itemPrice}`;
                    itemInfoSpan.style.color = '#333';
                    itemInfoSpan.style.flexGrow = '1'; // Allow it to take available space

                    // Quantity Display Span
                    const quantityDisplaySpan = document.createElement('span');
                    quantityDisplaySpan.textContent = ` (x${itemCount})`;
                    quantityDisplaySpan.style.color = '#555';
                    quantityDisplaySpan.style.cursor = 'pointer';
                    quantityDisplaySpan.style.marginLeft = '10px';
                    quantityDisplaySpan.style.fontWeight = 'bold';
                    quantityDisplaySpan.title = 'Click to change quantity';

                    // Quantity Editor Span (hidden by default)
                    const quantityEditorSpan = document.createElement('span');
                    quantityEditorSpan.style.display = 'none';
                    quantityEditorSpan.style.marginLeft = '10px';

                    const quantityInput = document.createElement('input');
                    quantityInput.type = 'number';
                    quantityInput.value = itemCount;
                    quantityInput.min = '0'; // 0 could mean remove from cart
                    quantityInput.style.width = '40px';
                    quantityInput.style.marginRight = '5px';

                    const updateBtn = document.createElement('button');
                    updateBtn.textContent = 'Update';
                    updateBtn.style.marginRight = '5px';

                    const cancelBtn = document.createElement('button');
                    cancelBtn.textContent = 'Cancel';

                    quantityEditorSpan.appendChild(quantityInput);
                    quantityEditorSpan.appendChild(updateBtn);
                    quantityEditorSpan.appendChild(cancelBtn);

                    itemElement.appendChild(itemInfoSpan);
                    itemElement.appendChild(quantityDisplaySpan);
                    itemElement.appendChild(quantityEditorSpan);
                    overlayItemsContainer.appendChild(itemElement);

                    // Event Listeners for quantity editing
                    quantityDisplaySpan.addEventListener('click', () => {
                        quantityDisplaySpan.style.display = 'none';
                        quantityInput.value = aggregatedItem.count; // Reset to current count
                        quantityEditorSpan.style.display = 'inline';
                        quantityInput.focus();
                    });

                    updateBtn.addEventListener('click', () => {
                        const newQuantity = parseInt(quantityInput.value, 10);
                        if (!isNaN(newQuantity) && newQuantity >= 0) {
                            if (globalThis.CartModule && typeof globalThis.CartModule.updateItemQuantity === 'function') {
                                globalThis.CartModule.updateItemQuantity(itemKey, newQuantity);
                                // The cart.js module should then call showCartOverlay again, which will rebuild this.
                            } else {
                                console.warn('CartModule.updateItemQuantity is not defined. UI updated locally, but cart state is not synced.');
                                // Fallback: update display locally and hide editor (no actual cart update)
                                quantityDisplaySpan.textContent = ` (x${newQuantity})`;
                                aggregatedItem.count = newQuantity; // Temporary local update for display
                                quantityEditorSpan.style.display = 'none';
                                quantityDisplaySpan.style.display = 'inline';
                            }
                        } else {
                            quantityInput.value = aggregatedItem.count; // Revert to original on invalid input
                        }
                    });

                    cancelBtn.addEventListener('click', () => {
                        quantityEditorSpan.style.display = 'none';
                        quantityDisplaySpan.style.display = 'inline';
                    });
                });
            } else {
                const noItemsMsg = document.createElement('p');
                noItemsMsg.textContent = 'Your cart is empty.';
                noItemsMsg.style.margin = '4px 0';
                noItemsMsg.style.fontStyle = 'italic';
                noItemsMsg.style.color = '#777';
                overlayItemsContainer.appendChild(noItemsMsg);
            }
        }

        if (overlayTotalPriceElement) {
            overlayTotalPriceElement.textContent = totalPrice.toFixed(2);
        }
        if (overlayElement) {
            overlayElement.style.display = 'flex';
        }
    }

    function hideCartOverlay() {
        if (overlayElement) {
            overlayElement.style.display = 'none';
        }
    }

    // Expose the 'show' function globally under a namespace
    globalThis.CartOverlayModule = {
        show: showCartOverlay
        // 'hide' is primarily internal, triggered by user interaction within the overlay
    };

    // Create the overlay DOM structure once the document is ready
    document.addEventListener('DOMContentLoaded', createCartOverlayDOM);

})();