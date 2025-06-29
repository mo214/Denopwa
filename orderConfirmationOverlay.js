// orderConfirmationOverlay.js
(function() {
    'use strict';

    let overlayElement = null;
    let overlayItemsContainer = null;
    let overlayTotalPriceElement = null;
    let overlayTableNumberElement = null; // To display the table number
    let confirmButton = null;
    let thankYouMessage = null;

    function createOrderConfirmationOverlayDOM() {
        if (document.getElementById('order-confirmation-overlay-container')) {
            return; // Already created
        }

        overlayElement = document.createElement('div');
        overlayElement.id = 'order-confirmation-overlay-container';

        const overlayContent = document.createElement('div');
        overlayContent.className = 'order-confirmation-content';

        const title = document.createElement('h2');
        title.textContent = 'Bekræft din bestilling';
        title.className = 'order-confirmation-title';

        const subTitle = document.createElement('p');
        subTitle.textContent = 'Dine ordreoplysninger:';
        subTitle.className = 'order-confirmation-subtitle';

        // Element to display table number
        const tableNumberParagraph = document.createElement('p');
        tableNumberParagraph.className = 'order-confirmation-table-number-p';
        overlayTableNumberElement = document.createElement('span');
        overlayTableNumberElement.id = 'order-confirmation-table-number';
        tableNumberParagraph.appendChild(overlayTableNumberElement);

        overlayItemsContainer = document.createElement('div');
        overlayItemsContainer.id = 'order-confirmation-items-list';

        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = 'Total: DKK ';
        priceParagraph.className = 'order-confirmation-total-price-p';
        overlayTotalPriceElement = document.createElement('span');
        overlayTotalPriceElement.id = 'order-confirmation-total-price';
        overlayTotalPriceElement.textContent = '0.00';
        priceParagraph.appendChild(overlayTotalPriceElement);
        priceParagraph.append(',-');

        // Confirm button
        confirmButton = document.createElement('button');
        confirmButton.textContent = 'Bekræft';
        confirmButton.className = 'order-confirmation-confirm-btn';
        confirmButton.style.padding = '12px 28px';
        confirmButton.style.background = '#1976d2';
        confirmButton.style.color = '#fff';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '6px';
        confirmButton.style.fontSize = '1.1em';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.marginTop = '18px';

        // Thank you message (hidden by default)
        thankYouMessage = document.createElement('div');
        thankYouMessage.id = 'order-thankyou-message';
        thankYouMessage.style.display = 'none';
        thankYouMessage.style.marginTop = '24px';
        thankYouMessage.style.fontSize = '1.2em';
        thankYouMessage.style.color = '#1976d2';
        thankYouMessage.textContent = 'Tak for din bestilling!';

        overlayContent.appendChild(title);
        overlayContent.appendChild(subTitle);
        overlayContent.appendChild(tableNumberParagraph);
        overlayContent.appendChild(overlayItemsContainer);
        overlayContent.appendChild(priceParagraph);
        overlayContent.appendChild(confirmButton);
        overlayContent.appendChild(thankYouMessage);
        overlayElement.appendChild(overlayContent);
        document.body.appendChild(overlayElement);

        confirmButton.addEventListener('click', () => {
            confirmButton.style.display = 'none';
            thankYouMessage.style.display = 'block';
            setTimeout(hideOrderConfirmationOverlay, 2000);
        });

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

        // Reset state
        if (confirmButton && thankYouMessage) {
            confirmButton.style.display = '';
            thankYouMessage.style.display = 'none';
        }

        // Display table number
        if (overlayTableNumberElement) {
            if (tableNumber) {
                overlayTableNumberElement.textContent = `Table: ${tableNumber}`;
            } else {
                overlayTableNumberElement.textContent = 'Table: Not specified';
            }
        }
        overlayItemsContainer.innerHTML = '';
        if (items && items.length > 0) {
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