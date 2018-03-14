// Andrea Gemmani 11/3/2018
// GitHub Gimmmy97	https://github.com/Gimmmy97

var s;
var ia;

function preload() {
	caricatorePezzi();
}

function setup() {

	createCanvas(600, 600);

	s = new Scacchiera(width/8);
	s.calcolaPosPezzi(); // è necessario farlo qua, fuori dalla libreria perchè ha necessità
	// di usare s. che però ancora non esiste se constructor non è consluso
	// spero di trovare una soluzione più carina prima o poi 

	ia = new ChessIA(1,1,1);

}

draw = function() {

	background(0);
	frameRate(0.5);

	ia.gioca();
	s.mostra();

}


