// Make sure to include the Html5QrcodeScanner library before this script.
// <script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>

function onScanSuccess(decodedText, _decodedResult) {
  document.getElementById('qr-result').innerText = "QR Code: " + decodedText;
  // Automatically navigate to the scanned URL
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