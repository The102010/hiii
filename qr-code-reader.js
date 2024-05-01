function onScanSuccess(decodedText, decodedResult) {
    // Redirect to the URL from the QR code
    window.location.href = decodedText;
}

function onScanFailure(error) {
    // Log the error to console
    console.error(`Scan failure: ${error}`);
}

function startCamera() {
    Html5Qrcode.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            var cameraId = cameras.find(camera => camera.facingMode === 'environment')?.id || cameras[0].id;
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };
            const html5QrcodeScanner = new Html5Qrcode("qr-reader");
            html5QrcodeScanner.start(cameraId, config, onScanSuccess, onScanFailure)
                .catch(function (error) {
                    console.error(`Unable to start the QR scanner`, error);
                });
        } else {
            console.error("No cameras found.");
        }
    }).catch(function (error) {
        console.error(`Error in getting camera devices: ${error}`);
