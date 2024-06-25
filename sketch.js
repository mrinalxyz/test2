let points = [];
let numPoints = 300; // Number of points to draw
let maxDist;

function setup() {
  createCanvas(800, 800);
  maxDist = dist(0, 0, width / 2, height / 2);
  angleMode(DEGREES);
  
  // Initialize points with random positions
  for (let i = 0; i < numPoints; i++) {
    let angle = random(360);
    let radius = random(10, maxDist);
    let x = width / 2 + cos(angle) * radius;
    let y = height / 2 + sin(angle) * radius;
    points.push(createVector(x, y));
  }
}

function draw() {
  background(255, 10); // Slightly translucent background for trailing effect
  translate(width / 2, height / 2);

  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    // Update positions using Perlin noise
    let angle = noise(p.x * 0.01, p.y * 0.01, frameCount * 0.01) * 360;
    let radius = noise(p.y * 0.01, p.x * 0.01, frameCount * 0.01) * 50;
    p.x += cos(angle) * 2;
    p.y += sin(angle) * 2;

    // Keep points within canvas
    p.x = constrain(p.x, -width / 2, width / 2);
    p.y = constrain(p.y, -height / 2, height / 2);

    // Draw shapes
    fill(0, 150);
    noStroke();
    ellipse(p.x, p.y, 5, 5);

    // Mirror shapes across different axes
    ellipse(-p.x, p.y, 5, 5);
    ellipse(p.x, -p.y, 5, 5);
    ellipse(-p.x, -p.y, 5, 5);

    // Draw connecting lines for abstract effect
    stroke(0, 50);
    line(p.x, p.y, -p.x, p.y);
    line(p.x, p.y, p.x, -p.y);
    line(p.x, p.y, -p.x, -p.y);
  }

  // Draw random lines for added complexity
  for (let i = 0; i < 10; i++) {
    stroke(0, 50);
    line(random(-width / 2, width / 2), random(-height / 2, height / 2),
         random(-width / 2, width / 2), random(-height / 2, height / 2));
  }
}
