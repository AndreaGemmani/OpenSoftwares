// Andrea Gemmani 3/3/2018
// GitHub Gimmmy97	https://github.com/Gimmmy97

// Clash of Clans like game 



// scelta obbiettivo non random ma più vicino
// scelta obbiettivo per tipo (es: difese)
// avvicinamento 
// re: DONE

// mostrare vita
// colpi (definire cadenza)
// re: wow fatto senza leggere e neanche pensavo di averci già pensato



// despawn con elisir a fine partita o morte, lapidi
// difese reali
// colpi, mostra colpi e renderli più discontinui con timing 



// bugs irrisolti:

// !! solo quando attaccante (gigante/mongolf) arriva (alla (ultima) difesa) si accorge che non c'è più

// debuggo cancellando attaccanti con     a.arrAttaccanti.splice(0,1);
// debuggo cancellando obbiettivi con     c.arrObb.splice(0,1);

var a, c;

function setup() {

	createCanvas(1200, 600);

	c = new Campo(28);
	// a = new Attacco(0,0,4,0,3);
	a = new Attacco(6,8,4,5,3);


}

draw = function() {

	background(0);
	// frameRate(10);
	// console.log(round(frameRate()));

	c.mostra();
	a.mostra();


}


