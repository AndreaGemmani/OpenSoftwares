// Andrea Gemmani 17/4/2018, fruible under MIT license
// GitHub Gimmmy97	https://github.com/Gimmmy97

// salvare il labirinto 
// cambiare massimo numero di passaggi prima di vicolo cieco
// mettere var nBianco che ora è 0.9 e anche altri

var labirinto;

// var X = 30; // 60 fps
// var Y = 20;

// var X = 50; // 30 fps (ottimo rapporto dimensioni/fps)
// var Y = 30;

var X = 60; // 20 fps (labirinto abbastanza grande, buone prestazioni)
var Y = 40;

// var X = 80; // 15 fps
// var Y = 50;

// var X = 100; // 12 fps
// var Y = 50;

// var X = 150; // 7 fps, molto orizzontale
// var Y = 40;

// var X = 250; // 2 fps
// var Y = 150;


var perc = 0.1;	// 95/100 risolve
// var perc = 0.2;	// 85/100 risolve
// var perc = 0.3;	// 65/100 risolve
// var perc = 0.33;	// 65/100 risolve
var perc = 0.35;	// 45/100 risolve
// var perc = 0.4;	// non ancora riuscito 
// var perc = 0.45;	// impossibile probabilmente
// var perc = 0.5;	// impossibile^2, ottimo per debug iniziale veloce
// var perc = 0.8;	// impossibile^10, quasi tutto nero

var m = 0;
var n = 0;

var dim = Math.round(800/X);

var arrAttorno = [];
var quale;
var sommina = 0;

var Xtarg,Ytarg;
var Xstart,Ystart = 0;
var dx,dy;
var Est,Sud,Ovest,Nord;
var dirPref, dirSec;


function setup() {

	labirinto = [];

	randomMappa();
	// caricaMappa(2);

	dim = min(round(800/X),round(600/Y)); // dimensioni schermo Mac attuali 
	createCanvas((X*1.2)*dim, Y*dim);

	randomTarget();

}

randomMappa = function() {
	for(let i = 0; i < Y; i++) {
		labirinto[i] = new Array();
		for(let k = 0; k < X; k++) {
			labirinto[i][k] = (random(1) > perc) ? 0.9 : 0;
		}
	}

}

randomTarget = function() {
	labirinto[m][n] = 0.77; // partenza che va subito a 0.13
	Xtarg = round(random(X-1));
	Ytarg = round(random(Y-1));
	labirinto[Ytarg][Xtarg] = 1; // arrivo
}

draw = function() {
// 0 muro, 0.1 vc, 0.15-0.85 passato, 0.9 libero, 1 arrivo
// partenza 0.15
	
	background(230);
	// frameRate(5);
	// frameRate(15);

	noStroke();
	rectMode(CENTER);

	// let risultato = trovaStrada();

	push();
		textSize(width/80);
		textAlign(RIGHT,CENTER);
		switch( trovaStrada() ) {
			case 1:
			case true:
				fill(0,200,0);
				text("Vittoria!",width-dim/4,height*11/20);
				noLoop();
				break;
			case -1:
				fill(200,0,0);
				text("Impossibile!",width-dim/4,height*11/20);
				noLoop();
				break;
			case 0:
			case false:
				fill(120);
				text("In corso...",width-dim/4,height*11/20);
				break;
			default: break;
		}
	pop();

	for(let i = 0; i < Y; i++) {
		for(let k = 0; k < X; k++) {
			if(labirinto[i][k] == 0) fill(0); // muro (nero)
			if(labirinto[i][k] == 0.1) fill(255,0,0); // vicolo cieco (rosso)
			if(labirinto[i][k] > 0.1 && labirinto[i][k] < 0.9) fill(0,0,255*( labirinto[i][k])) ; // passaggio (scala blu)
			if(labirinto[i][k] == 0.72) fill(180,0,180); // partenza dopo primo passo (viola)
			if(labirinto[i][k] == 0.9) fill(255); // libero (bianco)
			if(labirinto[i][k] == 1) fill(0,255,0); // arrivo (verde)
			if(i == m && k == n) fill(255,255,0); // corrente (giallo)
			rect(k*dim+dim/2,i*dim+dim/2,dim,dim);

		}
	}

	// if(trovaStrada() == 1) noLoop();

	push();
	textSize(width/80);
	fill(0);
	textAlign(RIGHT,CENTER);
	text(round(millis()/1000) + " s",width-dim/4,height/20);
	text(round(frameCount) + " mov",width-dim/4,height*3/20);
	text(round(frameRate()) + " fps",width-dim/4,height*5/20);
	text(X + " / " + Y,width-dim/4,height*7/20);
	text(perc*100 + "% muri",width-dim/4,height*9/20);
	pop();

}

var trovaStrada = function() {
	labirinto[m][n] -= 0.05;
	labirinto[m][n] = round(labirinto[m][n] *1000)/1000;
	return compara(m,n);
}

var caricaMappa = function(z) {
	let Mappa = [];
	Mappa[0] = [20,20,
	0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2];

	Mappa[1] = [40,27,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
	1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	Mappa[2] = [40,27,
	0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,2,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1];





	Y = Mappa[z][1];
	X = Mappa[z][0];

	let nMuri = 0;

	for(let i = 0; i < Y; i++) {
		labirinto[i] = new Array();
		for(let k = 0; k < X; k++) {
			switch(Mappa[z][X*i+k+2]) {
				case 0:
					labirinto[i][k] = 0.9; // libero
					break;
				case 1:
					labirinto[i][k] = 0; // muro
					nMuri++;
					break;
				case 2:
					labirinto[i][k] = 1; // target
					Xtarg = k;
					Ytarg = i;
					break;
			}
		}
	}
	perc = round(nMuri/(X*Y)*100)/100;
}

var compara = function(j,k) {
	arrAttorno = [];
	let massimino = 1;
	sommina = 0;

	// if(k < X-1) arrAttorno[0] = (labirinto[j][k+1]);
	// else arrAttorno[0] = -0.01;
	// if(j < Y-1) arrAttorno[1] = (labirinto[j+1][k]);
	// else arrAttorno[1] = -0.01;
	// if(k > 0) arrAttorno[2] = (labirinto[j][k-1]);
	// else arrAttorno[2] = -0.01;
	// if(j > 0 ) arrAttorno[3] = (labirinto[j-1][k]);
	// else arrAttorno[3] = -0.01;

	Est = (k < X-1) ? (labirinto[j][k+1]) : -0.01;
	Sud = (j < Y-1) ? (labirinto[j+1][k]) : -0.01;
	Ovest = (k > 0) ? (labirinto[j][k-1]) : -0.01;
	Nord = (j > 0) ? (labirinto[j-1][k]) : -0.01;

	seekBersaglio();

	massimino = max(arrAttorno);
	sommina = arrAttorno[0] + arrAttorno[1] + arrAttorno[2] + arrAttorno[3];
	sommina = round(sommina*100)/100;
	// if(sommina <= 0.8) labirinto[m][n] = 0.1; // vicolo cieco da vicoli ciechi, 0.8 labile
	if(sommina <= 0.95) labirinto[m][n] = 0.1; // vicolo cieco da vicoli ciechi, 0.95 preciso, maybe bug
	if(sommina <= 0.3) return (-1); // forse da mettere 0.4 ma non sono sicuro, potrebbe buggare
	quale = arrAttorno.indexOf(massimino);
	// quale = arrAttorno.indexOf(max(arrAttorno));

	switch(quale) {
		case 0:
			switch(dirPref) {
				case "Est": k++; break;
				case "Ovest": k--; break;
				case "Sud": j++; break;
				case "Nord": j--; break;
			}
			break;
		case 1:
			switch(dirSec) {
				case "Est": k++; break;
				case "Ovest": k--; break;
				case "Sud": j++; break;
				case "Nord": j--; break;
			}
			break;
		case 2:
			switch(dirSec) {
				case "Est": k--; break;
				case "Ovest": k++; break;
				case "Sud": j--; break;
				case "Nord": j++; break;
			}
			break;
		case 3:
			switch(dirPref) {
				case "Est": k--; break;
				case "Ovest": k++; break;
				case "Sud": j--; break;
				case "Nord": j++; break;
			}
			break;
	}

	// switch(dirPref) {
	// 	case "Est":
	// 	switch(quale) { // !!!!!!!!!!!!
	// 		case 0: k++; break; // E
	// 		case 1: j++; break; // S
	// 		case 2: j--; break; // N
	// 		case 3: k--; break; // O
	// 		default: break;
	// 	}
	// 	break;
	// 	case "Ovest":
	// 	switch(quale) { // !!!!!!!!!!!!
	// 		case 0: k--; break; // O
	// 		case 1: j++; break; // S
	// 		case 2: j--; break; // N
	// 		case 3: k++; break; // E
	// 		default: break;
	// 	}
	// 	break;
	// 	case "Sud":
	// 	switch(quale) { // !!!!!!!!!!!!
	// 		case 0: j++; break; // S
	// 		case 1: k++; break; // E
	// 		case 2: k--; break; // O
	// 		case 3: j--; break; // N
	// 		default: break;
	// 	}
	// 	break;
	// 	case "Nord":
	// 	switch(quale) { // !!!!!!!!!!!!
	// 		case 0: j--; break; // N
	// 		case 1: k++; break; // E
	// 		case 2: k--; break; // O
	// 		case 3: j++; break; // S
	// 		default: break;
	// 	}
	// 	break;
	// 	default: break;
	// }

	m = j; // y
	n = k; // x

	return (labirinto[m][n]) == 1;
}

var seekBersaglio = function() {
	dx = max(n - Xtarg, Xtarg - n);
	dy = max(m - Ytarg, Ytarg - m);
	// let temp;

	if(dx > dy) { // preferisco muovermi in orizzontale
		if(Xtarg > n) { // vado verso dx
			arrAttorno[0] = Est;
			arrAttorno[3] = Ovest;
			dirPref = "Est";
		}
		else { // vado verso sx
			arrAttorno[0] = Ovest;
			arrAttorno[3] = Est;
			dirPref = "Ovest";
		}
		if(Ytarg > m) { // vado verso giù
			arrAttorno[1] = Sud;
			arrAttorno[2] = Nord;
			dirSec = "Sud";
		}
		else {
			arrAttorno[1] = Nord;
			arrAttorno[2] = Sud;
			dirSec = "Nord";
		}

	}
	else { // preferisco muovermi in verticale 
		if(Ytarg > m) { // vado verso giù
			arrAttorno[0] = Sud;
			arrAttorno[3] = Nord;
			dirPref = "Sud";
		}
		else { // vado verso su
			arrAttorno[0] = Nord;
			arrAttorno[3] = Sud;
			dirPref = "Nord";
		}
		if(Xtarg > n) { // vado verso dx
			arrAttorno[1] = Est;
			arrAttorno[2] = Ovest;
			dirSec = "Est";
		}
		else { // vado verso sx
			arrAttorno[1] = Ovest;
			arrAttorno[2] = Est;
			dirSec = "Ovest";
		}
	}
}
