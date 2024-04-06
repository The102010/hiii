let lastAcceleration = { x: 0, y: 0 };
let stepsInCurrentDirection = 0;
let currentDirection = null;

function determineDirection(xChange, yChange) {
    if (Math.abs(xChange) > Math.abs(yChange)) {
        return xChange > 0 ? 'east' : 'west';
    } else {
        return yChange > 0 ? 'south' : 'north';
    }
}

function handleMotionEvent(event) {
    const acceleration = event.accelerationIncludingGravity;
    let xChange = acceleration.x - lastAcceleration.x;
    let yChange = acceleration.y - lastAcceleration.y;
    
    const stepThreshold = 2; // Threshold for detecting a 'step'
    if (Math.abs(xChange) > stepThreshold || Math.abs(yChange) > stepThreshold) {
        const newDirection = determineDirection(xChange, yChange);
        
        if (newDirection !== currentDirection) {
            if (currentDirection !== null) {
                // If direction changes, display the steps and previous direction
                displayDirectionAndSteps(stepsInCurrentDirection, currentDirection);
            }
            currentDirection = newDirection;
            stepsInCurrentDirection = 1;
        } else {
            stepsInCurrentDirection++;
        }
    }
    lastAcceleration = { x: acceleration.x, y: acceleration.y };
}

function displayDirectionAndSteps(steps, direction) {
    const listItem = document.createElement('li');
    listItem.textContent = `${steps} steps, ${direction}`;
    document.getElementById('directionsList').appendChild(listItem);
}

if ('DeviceMotionEvent' in window) {
    window.addEventListener('devicemotion', handleMotionEvent, false);
} else {
    alert('DeviceMotionEvent is not supported by your device.');
}
