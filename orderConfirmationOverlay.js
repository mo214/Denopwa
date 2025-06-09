// orderConfirmationOverlay.js
(function() {
    'use strict';

    let overlayElement = null;
    let overlayItemsContainer = null;
    let overlayTotalPriceElement = null;
    let overlayTableNumberElement = null; // To display the table number
    let closeButton = null;

    function createOrderConfirmationOverlayDOM() {
        if (document.getElementById('order-confirmation-overlay-container')) {
            return; // Already created
        }

        overlayElement = document.createElement('div');
        overlayElement.id = 'order-confirmation-overlay-container';
        // Styles moved to orderConfirmationOverlay.css

        const overlayContent = document.createElement('div');
        overlayContent.className = 'order-confirmation-content';
        // Styles moved to orderConfirmationOverlay.css

        const title = document.createElement('h2');
        title.textContent = 'Thank You For Your Order!';
        title.className = 'order-confirmation-title';
        // Styles moved to orderConfirmationOverlay.css

        const subTitle = document.createElement('p');
        subTitle.textContent = 'Your order details:';
        subTitle.className = 'order-confirmation-subtitle';
        // Styles moved to orderConfirmationOverlay.css

        // Element to display table number
        const tableNumberParagraph = document.createElement('p');
        tableNumberParagraph.className = 'order-confirmation-table-number-p'; // For styling
        overlayTableNumberElement = document.createElement('span');
        overlayTableNumberElement.id = 'order-confirmation-table-number';
        tableNumberParagraph.appendChild(overlayTableNumberElement);

        overlayItemsContainer = document.createElement('div');
        overlayItemsContainer.id = 'order-confirmation-items-list';
        // Styles moved to orderConfirmationOverlay.css

        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = 'Total: DKK ';
        priceParagraph.className = 'order-confirmation-total-price-p';
        // Styles moved to orderConfirmationOverlay.css
        overlayTotalPriceElement = document.createElement('span');
        overlayTotalPriceElement.id = 'order-confirmation-total-price';
        overlayTotalPriceElement.textContent = '0.00';
        priceParagraph.appendChild(overlayTotalPriceElement);
        priceParagraph.append(',-');
        closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.className = 'order-confirmation-close-btn';
        // Styles moved to orderConfirmationOverlay.css

        overlayContent.appendChild(title);
        overlayContent.appendChild(subTitle);
        overlayContent.appendChild(tableNumberParagraph); // Add table number display
        overlayContent.appendChild(overlayItemsContainer);
        overlayContent.appendChild(priceParagraph);
        overlayContent.appendChild(closeButton);
        overlayElement.appendChild(overlayContent);
        document.body.appendChild(overlayElement);

        closeButton.addEventListener('click', hideOrderConfirmationOverlay);
        overlayElement.addEventListener('click', (event) => {
            if (event.target === overlayElement) {
                hideOrderConfirmationOverlay();
            }
        });
    }

    function showOrderConfirmationOverlay(items, totalPrice, tableNumber) {
        if (!overlayElement) {
            createOrderConfirmationOverlayDOM();
        }

        // Display table number
        if (overlayTableNumberElement) {
            if (tableNumber) {
                overlayTableNumberElement.textContent = `Table: ${tableNumber}`;
            } else {
                overlayTableNumberElement.textContent = 'Table: Not specified';
            }
        }
        overlayItemsContainer.innerHTML = ''; // Clear previous items
        if (items && items.length > 0) {
            // Using a simple list format here, can be enhanced like cartOverlay if needed
            items.forEach(item => {
                const itemElement = document.createElement('p');
                itemElement.className = 'order-item-line';
                itemElement.textContent = `${item.name} - DKK ${item.price.toFixed(2)}`;
                overlayItemsContainer.appendChild(itemElement);
            });
        } else {
            overlayItemsContainer.textContent = 'No items in this order.';
        }

        overlayTotalPriceElement.textContent = totalPrice.toFixed(2);
        overlayElement.style.display = 'flex';
    }

    function hideOrderConfirmationOverlay() {
        if (overlayElement) {
            overlayElement.style.display = 'none';
        }
    }

    globalThis.OrderConfirmationOverlayModule = {
        show: showOrderConfirmationOverlay
    };
})();