let nParticlesSld;
let velocitySld;
let sizeSld;
let pathSld;
let angleSld;
let gravitySld;
let timeChangesSld;
let color1;
let color2;

function setup() {
	textFont("Sarpanch");
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Create UI elements
	nParticlesSld = new Slider(start=1, end=20, value=10, 0, 0, width/12, height/60, 1, "Particles", true, 0);
	velocitySld = new Slider(start=1, end=100, value= 20, 0,0, width/12, height/60, null, "Speed", false);
	sizeSld = new Slider(start=0.5, end=5, value= 3, 0,0, width/12, height/60, null, "Size", false);
	randomnessSld = new Slider(start=0, end=1, value=0.2, 0,0, width/12, height/60, null, "Randomness");
	pathSld = new Slider(start=0, end=255, value= 200, 0,0, width/12, height/60, null, "Path", false);
	angleSld = new Slider(start=0, end=PI/4, value= PI/24, 0,0, width/12, height/60, null, "Angle", false);
	gravitySld = new Slider(start=0, end=5, value= 0.6, 0,0, width/12, height/60, null, "Gravity", false);
	timeChangesSld = new Slider(start=0, end=1, value = 0.5, 0,0, width/12, height/60, null, "Changes in time", true, 2);
	color1 = new ColorPicker(0,0, width/12, height/30, null, "Color1");
	color2 = new ColorPicker(0,0, width/12, height/30, null, "Color2");

	// Start UI
	UI.heightMargin = height/30;
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	background(32, 32, 32, 255 - pathSld.value);		
	translate(width/2 + width/12, height);
	scale(1,-1);
	// Add new particles
	colorMode(HSL, 1);
	for(let i = 0; i < nParticlesSld.value; i++) {
		Particle.add(new Particle(createVector(random(-1,1)*width/120, 0),
						velocitySld.value + velocitySld.value*random(-1,1)*randomnessSld.value +
						velocitySld.value*(noise(frameCount/50)*2-1)*timeChangesSld.value,
						random(-1,1)*angleSld.value,
						lerpColor(color1.getColor(), color2.getColor(), random()),
						sizeSld.value + sizeSld.value*random(-1,1)*randomnessSld.value));
	}

	//Update particles
	Particle.update(createVector(0, -gravitySld.value));
	
	// Draw particles
	Particle.draw();
	
	colorMode(RGB, 255);

	// Draw UI
	scale(1,-1);
	translate(-width/2 - width/12, -height);
	// Redraw the frame only in the UI part
	let uiWidth = randomnessSld.getWidth() + UI.widthMargin*2 + width/32;
	fill(32);
	noStroke();
	rect(0,0, uiWidth, height);
	// Sparator from UI
	stroke(100);
	strokeWeight(1);
	line(uiWidth, 0, uiWidth, height);
	UI.update();
	UI.draw();
}
