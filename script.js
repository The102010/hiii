document.getElementById('openCameraButton').addEventListener('click', function() {
    const cameraInput = document.getElementById('cameraInput');
    cameraInput.click(); // تفعيل الإدخال لفتح الكاميرا

    cameraInput.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            // يمكنك هنا إضافة أي معالجة للصورة المحترفة
            alert('تم التقاط الصورة بنجاح!');
        }
    };

    cameraInput.onerror = function() {
        alert('حصل خطأ أثناء فتح الكاميرا');
    };
});
