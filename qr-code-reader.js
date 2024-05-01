function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    console.log(`Code matched = ${decodedText}`, decodedResult);
    document.getElementById('qr-result').innerText = "نتيجة الفحص: " + decodedText;
}

function onScanFailure(error) {
    // Handle on scan failure condition.
    console.log(`Scan failure: ${error}`);
}

window.addEventListener('load', () => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", 
        { fps: 10, qrbox: 250 },
        /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});
