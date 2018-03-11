// Andrea Gemmani 11/3/2018
// GitHub Gimmmy97	https://github.com/Gimmmy97

var s;

function preload() {
	caricatorePezzi();
}

function setup() {

	createCanvas(600, 600);

	s = new Scacchiera(width/8);

}

draw = function() {

	background(0);
	// frameRate(10);

	s.mostra();

}


