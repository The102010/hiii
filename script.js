let lastAcceleration = { x: 0, y: 0 };
let totalSteps = 0;
let stepsInCurrentDirection = 0;
let currentDirection = 'None';

const stepThreshold = 2; // Threshold for detecting a 'step'

function determineDirection(xChange, yChange) {
    if (Math.abs(xChange) > Math.abs(yChange)) {
        return xChange > 0 ? 'East' : 'West';
    } else {
        return yChange > 0 ? 'South' : 'North';
    }
}

function updateUI(direction, steps) {
    document.getElementById('currentDirection').textContent = `Current Direction: ${direction}`;
    document.getElementById('totalSteps').textContent = `Total Steps: ${steps}`;
}

function displayDirectionAndSteps(steps, direction) {
    const directionsList = document.getElementById('directionsList');
    const listItem = document.createElement('li');
    listItem.textContent = `${steps} steps towards ${direction}`;
    directionsList.appendChild(listItem);
}

function handleMotionEvent(event) {
    const acceleration = event.accelerationIncludingGravity;
    let xChange = acceleration.x - lastAcceleration.x;
    let yChange = acceleration.y - lastAcceleration.y;

    if (Math.abs(xChange) > stepThreshold || Math.abs(yChange) > stepThreshold) {
        const newDirection = determineDirection(xChange, yChange);
        
        if (newDirection !== currentDirection) {
            if (currentDirection !== 'None') {
                displayDirectionAndSteps(stepsInCurrentDirection, currentDirection);
            }
            currentDirection = newDirection;
            stepsInCurrentDirection = 1;
        } else {
            stepsInCurrentDirection++;
        }
        
        totalSteps++;
        updateUI(currentDirection, totalSteps);
    }
    
    lastAcceleration = { x: acceleration.x, y: acceleration.y };
}

if ('DeviceMotionEvent' in window) {
    window.addEventListener('devicemotion', handleMotionEvent, false);
} else {
    console.error('DeviceMotionEvent is not supported by your device.');
    alert('DeviceMotionEvent is not supported by your device.');
}
