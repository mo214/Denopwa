// Make sure to include the Html5QrcodeScanner library before this script.
// <script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>

function onScanSuccess(decodedText, _decodedResult) {
  // Assume the decodedText is a URL and navigate to it.
  // If the QR code is intended to open the menu, it should contain the URL to menu.html (e.g., "./menu.html" or the full URL)
  globalThis.location.href = decodedText;
}

globalThis.addEventListener('DOMContentLoaded', () => {
  const html5QrCode = new Html5Qrcode("qr-reader");
  html5QrCode.start(
    { facingMode: "environment" }, // Use back camera
    { fps: 10, qrbox: 250 },
    onScanSuccess
  );
});