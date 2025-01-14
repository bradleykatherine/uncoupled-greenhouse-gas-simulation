// earthVisualization.js: Handles rendering of the Earth image

let earthImage; // Global variable to store the Earth image

// Preload the Earth image from a public URL
function preloadEarthImage() {
    // Load a high-quality Earth image from Wikimedia Commons
    earthImage = loadImage('https://upload.wikimedia.org/wikipedia/commons/5/5b/The_Blue_Marble_%285052124705%29.jpg');
}

// Draw the Earth image on the canvas
function drawEarth(canvasWidth, canvasHeight) {
    if (!earthImage) {
        console.error('Earth image not loaded. Ensure preloadEarthImage() is called before setup.');
        return;
    }

    // Calculate scaling to fit the Earth image within the canvas dimensions
    let aspectRatio = earthImage.width / earthImage.height; // Aspect ratio of the image
    let scaleFactor = 0.75; // Scale factor (75% of the smaller canvas dimension)
    let maxDiameter = Math.min(canvasWidth, canvasHeight) * scaleFactor; // Maximum size based on canvas

    let earthWidth, earthHeight;
    if (aspectRatio > 1) {
        // For landscape images: Width limits scaling
        earthWidth = maxDiameter;
        earthHeight = maxDiameter / aspectRatio;
    } else {
        // For portrait images: Height limits scaling
        earthHeight = maxDiameter;
        earthWidth = maxDiameter * aspectRatio;
    }

    // Render the Earth image centered on the canvas
    imageMode(CENTER); // Center the image when drawing
    image(
        earthImage, 
        canvasWidth / 2, // Center horizontally
        canvasHeight / 2, // Center vertically
        earthWidth, // Scaled width
        earthHeight // Scaled height
    );
}
