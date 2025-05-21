// Make sure to include the Html5QrcodeScanner library before this script.
// <script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>

function onScanSuccess(decodedText, decodedResult) {
  document.getElementById('qr-result').innerText = "QR Code: " + decodedText;
}

globalThis.addEventListener('DOMContentLoaded', () => {
  const qrCodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: 250 }
  );
  qrCodeScanner.render(onScanSuccess);
});