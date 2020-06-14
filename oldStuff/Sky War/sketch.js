// Copyright (c) Andrea Gemmani 2018, available under MIT license 
// GitHub Gimmmy97	https://github.com/Gimmmy97

// velocità massima aereo pg potenziabile, che essendo min fra v e spostamento 
// rallenta gli spostamenti al movimento di mouse o dita
// => PG seek mouse

// creare formazioni di aerei 

var fr;

var partita;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	// createCanvas(490,630); // dimensioni browser con min width
	noCursor();

	partita = new Partita();
}

draw = function() {
	// background(0);
	background(180);

	partita.gioca();
}


function touchMoved() {

	return false;
}

function touchStarted() {

	return false;
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight);
	partita.resiza();
}



