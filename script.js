document.getElementById('openCameraButton').addEventListener('click', function() {
    const cameraInput = document.getElementById('cameraInput');
    cameraInput.click(); // تفعيل الإدخال لفتح الكاميرا

    cameraInput.onchange = function(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            alert('تم التقاط الصورة بنجاح!'); // تأكيد التقاط الصورة
        }
    };
});
