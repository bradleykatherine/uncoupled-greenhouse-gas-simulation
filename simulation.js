// simulation.js: Main logic for the Methane Simulation

// Global variables for simulation controls
let methaneSlider, co2Slider, particleSlider; // Sliders for methane, CO₂, and particles
let totalConcentration = 100; // Total concentration percentage (constant)
let baseTemperature = 15; // Base temperature in Celsius
let temperatureC = baseTemperature; // Current temperature in Celsius
let temperatureF = (temperatureC * 1.8) + 32; // Current temperature in Fahrenheit
const maxTemperature = 50; // Maximum temperature for temperature-dependent effects

// Preload function: Called before setup to load assets
function preload() {
  preloadEarthImage(); // Load Earth image (defined in earthVisualization.js)
}

// Setup function: Called once to initialize the canvas
function setup() {
  // Create the canvas and attach it to the simulation container
  let canvas = createCanvas(600, 400);
  canvas.parent('simulation-container');

  // Reference sliders from the HTML document
  methaneSlider = select('#methane-slider');
  co2Slider = select('#co2-slider');
  particleSlider = select('#particle-slider');

  // Add event listeners to sliders to update calculations when adjusted
  methaneSlider.input(() => updateCoupledSliders('methane'));
  co2Slider.input(() => updateCoupledSliders('co2'));
  particleSlider.input(calculateTemperature); // Recalculate temperature when particles change

  calculateTemperature(); // Initial temperature calculation
}

// Draw function: Continuously renders the simulation visuals
function draw() {
  background(0); // Set background to black

  // Draw the Earth image at the center of the canvas
  drawEarth(width, height); // Function defined in earthVisualization.js

  // Render the temperature overlay on top of the Earth image
  renderTemperatureOverlay(width, height, temperatureC, baseTemperature, maxTemperature);

  // Draw particles representing methane (green) and CO₂ (red)
  drawParticles(methaneSlider.value(), color(0, 255, 0, 150)); // Methane particles
  drawParticles(co2Slider.value(), color(255, 0, 0, 150)); // CO₂ particles

  // Display temperature and slider values on the canvas
  displayTemperature();
  displaySliderValues();
}

// Function to calculate the temperature based on slider values
function calculateTemperature() {
  let methaneLevel = methaneSlider.value(); // Methane percentage
  let co2Level = co2Slider.value(); // CO₂ percentage
  let particleCount = particleSlider.value(); // Number of particles

  // Define the warming impacts of each factor
  let methaneImpact = 0.03; // °C per % methane
  let co2Impact = 0.01; // °C per % CO₂
  let particleImpact = 0.001; // °C per particle

  // Calculate new temperature in Celsius
  temperatureC = baseTemperature +
                 methaneLevel * methaneImpact +
                 co2Level * co2Impact +
                 particleCount * particleImpact;

  // Convert temperature to Fahrenheit
  temperatureF = (temperatureC * 1.8) + 32;
}

// Function to update the coupled sliders for methane and CO₂
// The slider adjusted by the user dictates the total concentration
function updateCoupledSliders(changedSlider) {
  if (changedSlider === 'methane') {
    co2Slider.value(totalConcentration - methaneSlider.value());
  } else if (changedSlider === 'co2') {
    methaneSlider.value(totalConcentration - co2Slider.value());
  }
  calculateTemperature();
}

// Function to display the current temperature on the canvas
function displayTemperature() {
  fill(255); // White text
  textSize(16);
  textAlign(LEFT);
  text(`Temperature: ${temperatureC.toFixed(2)}°C / ${temperatureF.toFixed(2)}°F`, 10, 20);
}

// Function to display the current slider values on the canvas
function displaySliderValues() {
  text(`Methane Level: ${methaneSlider.value()}%`, 10, height - 60);
  text(`CO₂ Level: ${co2Slider.value()}%`, 10, height - 40);
  text(`Particle Count: ${particleSlider.value()}`, 10, height - 20);
}

// Function to draw particles representing methane or CO₂
function drawParticles(concentration, colorVal) {
  let particleCount = particleSlider.value() * (concentration / totalConcentration); // Scaled particle count
  fill(colorVal);

  for (let i = 0; i < particleCount; i++) {
    let x, y;
    do {
      x = random(width); // Random x-coordinate
      y = random(height); // Random y-coordinate
    } while (dist(x, y, width / 2, height / 2) > height / 2); // Ensure particles are within a circular area

    ellipse(x, y, 5, 5); // Draw particle as a small circle
  }
}
