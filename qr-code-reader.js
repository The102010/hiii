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
            // Find a camera that is pointed at the environment (usually the rear camera).
            const rearCamera = cameras.find(camera => camera.facingMode === 'environment');

            // If a rear camera is found, use it. Otherwise, fall back to the first available camera.
            const cameraId = rearCamera ? rearCamera.id : cameras[0].id;

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
    });
}

document.getElementById('startButton').addEventListener('click', startCamera);
