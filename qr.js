// Make sure to include the Html5QrcodeScanner library before this script.
// <script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>

function onScanSuccess(decodedText, _decodedResult) {
  // If the QR code content is exactly "menu", redirect to menu.html
  if (decodedText === "menu") {
    globalThis.location.href = "menu.html";
  } else {
    // Otherwise, redirect to result.html with the scanned URL as a query parameter
    globalThis.location.href = `result.html?url=${encodeURIComponent(decodedText)}`;
  }
}

globalThis.addEventListener('DOMContentLoaded', () => {
  const html5QrCode = new Html5Qrcode("qr-reader");
  html5QrCode.start(
    { facingMode: "environment" }, // Use back camera
    { fps: 10, qrbox: 250 },
    onScanSuccess
  );
});