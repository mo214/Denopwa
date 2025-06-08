// cartOverlay.js
(function() {
    'use strict';

    let overlayElement = null;
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

    function showCartOverlay(totalPrice) {
        if (!overlayElement) {
            createCartOverlayDOM(); // Ensure it's created
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