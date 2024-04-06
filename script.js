let lastAcceleration = { x: 0, y: 0 };
let totalSteps = 0;

function determineDirection(xChange, yChange) {
    if(Math.abs(xChange) > Math.abs(yChange)) {
        return xChange > 0 ? 'east' : 'west';
    } else {
        return yChange > 0 ? 'north' : 'south';
    }
}

function handleMotionEvent(event) {
    const acceleration = event.accelerationIncludingGravity;
    let xChange = acceleration.x - lastAcceleration.x;
    let yChange = acceleration.y - lastAcceleration.y;
    const stepThreshold = 2; // Threshold for detecting a step
    if(Math.abs(xChange) > stepThreshold || Math.abs(yChange) > stepThreshold) {
        totalSteps++;
        const direction = determineDirection(xChange, yChange);
        updateUI(direction, totalSteps);
    }
    lastAcceleration = { x: acceleration.x, y: acceleration.y };
}

function updateUI(direction, steps) {
    document.getElementById('currentDirection').textContent = `Current Direction: ${direction}`;
    document.getElementById('totalSteps').textContent = `Total Steps: ${steps}`;
}

if ('DeviceMotionEvent' in window) {
    window.addEventListener('devicemotion', handleMotionEvent, false);
} else {
    alert('DeviceMotionEvent is not supported by your device.');
}
