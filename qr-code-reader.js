function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    console.log(`Code matched = ${decodedText}`, decodedResult);
    // Redirect to the URL from the QR code
    window.location.href = decodedText;
}

function onScanFailure(error) {
    // Handle on scan failure condition.
    console.log(`Scan failure: ${error}`);
}

window.addEventListener('load', () => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", 
        { fps: 10, qrbox: 250, aspectRatio: 1.777 }, // typical aspect ratio for rear cameras
        /* verbose= */ false
    );

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    // To use the rear camera explicitly if available
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length > 0) {
            let cameraId = cameras[cameras.length - 1].id; // usually the rear cameras are listed last
            html5QrcodeScanner.start(
                cameraId, 
                { fps: 10, qrbox: { width: 250, height: 250 } },
                onScanSuccess,
                onScanFailure
            ).catch(err => console.error(`Error starting QR scanner: ${err}`));
        } else {
            console.error("No cameras found.");
        }
    }).catch(err => console.error(`Error getting cameras: ${err}`));
});
