// function onScanSuccess(decodedText, decodedResult) {
//     // Redirect to the URL from the QR code
//     window.location.href = decodedText;
// }

// function onScanFailure(error) {
//     // Log the error to console
//     console.error(`Scan failure: ${error}`);
// }

// function startCamera() {
//     Html5Qrcode.getCameras().then(function (cameras) {
//         if (cameras.length > 0) {
//             // Attempt to select the rear camera based on common naming conventions or IDs.
//             let cameraId = null;
//             for (let camera of cameras) {
//                 if (camera.label.toLowerCase().includes("back") || camera.label.toLowerCase().includes("rear")) {
//                     cameraId = camera.id;
//                     break;
//                 }
//             }

//             // If no rear camera was specifically identified, fall back to the first available camera.
//             if (!cameraId) {
//                 cameraId = cameras[0].id;
//             }

//             const config = { fps: 10, qrbox: { width: 250, height: 250 } };
//             const html5QrcodeScanner = new Html5Qrcode("qr-reader");
//             html5QrcodeScanner.start(cameraId, config, onScanSuccess, onScanFailure)
//                 .catch(function (error) {
//                     console.error(`Unable to start the QR scanner`, error);
//                 });
//         } else {
//             console.error("No cameras found.");
//         }
//     }).catch(function (error) {
//         console.error(`Error in getting camera devices: ${error}`);
//     });
// }
function onScanSuccess(decodedText, decodedResult) {
    window.location.href = decodedText;
}

function onScanFailure(error) {
    alert.error(`Scan failure: ${error}`);
}

function startCamera() {
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras.length > 0) {
            const cameraId = cameras.find(camera => camera.facingMode.includes("environment"))?.id || cameras[0].id;
            const scanner = new Html5Qrcode("qr-reader");
            scanner.start(cameraId, { fps: 10, qrbox: { width: 250, height: 250 } }, onScanSuccess, onScanFailure)
                .catch(error => console.error(`Error starting the scanner: ${error}`));
        } else {
            console.error("No cameras found.");
        }
    }).catch(error => console.error(`Error getting cameras: ${error}`));
}

document.getElementById('startButton').addEventListener('click', startCamera);


