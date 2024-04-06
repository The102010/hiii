let lastAcceleration = { x: 0, y: 0 };

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
    const stepThreshold = 2;
    if(Math.abs(xChange) > stepThreshold || Math.abs(yChange) > stepThreshold) {
        const direction = determineDirection(xChange, yChange);
        updateDirectionsList(direction);
    }
    lastAcceleration = { x: acceleration.x, y: acceleration.y };
}

function updateDirectionsList(direction) {
    const listElement = document.createElement('li');
    listElement.textContent = `Movement detected towards ${direction}`;
    document.getElementById('directionsList').appendChild(listElement);
}

if ('DeviceMotionEvent' in window) {
    window.addEventListener('devicemotion', handleMotionEvent, false);
} else {
    alert('DeviceMotionEvent is not supported by your device.');
}
