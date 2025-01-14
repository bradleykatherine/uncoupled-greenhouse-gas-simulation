// temperatureOverlay.js: Manages dynamic temperature overlay rendering

let overlayDiameter; // Diameter of the overlay circle

// Initialize overlay dimensions based on canvas size
function initializeOverlay(canvasWidth, canvasHeight) {
    overlayDiameter = Math.min(canvasWidth, canvasHeight) * 0.75; // Diameter relative to Earth image size
}

// Draw the overlay with dynamic opacity based on temperature
function drawTemperatureOverlay(canvasWidth, canvasHeight, temperatureC, baseTemperature, maxTemperature) {
    if (!overlayDiameter) {
        console.error('Overlay not initialized. Call initializeOverlay() in setup.');
        return;
    }

    // Calculate opacity as a function of temperature
    let normalizedTemp = (temperatureC - baseTemperature) / (maxTemperature - baseTemperature); // Normalize temperature
    let alpha = constrain(normalizedTemp, 0, 1) * 255; // Clamp alpha to [0, 255]

    // Draw the overlay circle
    noStroke(); // No border
    fill(255, 0, 0, alpha); // Red with dynamic transparency
    ellipse(canvasWidth / 2, canvasHeight / 2, overlayDiameter, overlayDiameter); // Draw overlay
}

// Public wrapper to initialize and draw the overlay
function renderTemperatureOverlay(canvasWidth, canvasHeight, temperatureC, baseTemperature, maxTemperature) {
    initializeOverlay(canvasWidth, canvasHeight); // Set overlay size
    drawTemperatureOverlay(canvasWidth, canvasHeight, temperatureC, baseTemperature, maxTemperature); // Render overlay
}
