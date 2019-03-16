// Andrea Gemmani 17/4/2018, fruible under MIT license
// GitHub Gimmmy97	https://github.com/Gimmmy97


// TODOs:
// salvare il labirinto 
// cambiare massimo numero di passaggi prima di vicolo cieco
// mettere var nBianco che ora è 0.9 e anche altri
// modalità ricerca
// restart su impossibili in partenza



// Known Issues:






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


var perc = 0.1;	// 98/100 risolve
// var perc = 0.2;	// 85/100 risolve
// var perc = 0.3;	// 65/100 risolve
// var perc = 0.33;	// 65/100 risolve
var perc = 0.35;	// 45/100 risolve
// var perc = 0.4;	// non ancora riuscito (2/100)
// var perc = 0.45;	// impossibile probabilmente
// var perc = 0.5;	// impossibile^2, ottimo per debug iniziale veloce
// var perc = 0.8;	// impossibile^10, nessun passaggio fra caselle non adiacenti

var m = 0;
var n = 0;

var dim = Math.round(800/X);
var maxFPS = 15;

var arrAttorno = [];
var quale;
var sommina = 0;

var Xtarg,Ytarg;
var Xstart = 0;
var Ystart = 0;
var dx,dy;
var Est,Sud,Ovest,Nord;
var dirPref, dirSec;

var trovato = false;
var imposs = false;
var rimozioneInCorso = false;
var nMosse = 0;
var millisStart = 0;
var nSec = 0;
var fps = 0;

var res = 0;
var VCallowed = true;

var n32 = true;

var arrPassaggi;

var mouseSuQX = 0;
var mouseSuQY = 0;

var tastoModifica = 68; // "d"
var modificaAbilitata = false; // per ora nulla, da creare bottone switch per dispositivi mobili

function setup() {

	labirinto = [];
	arrPassaggi = [];

	randomMappa();
	// caricaMappa(2);

	dim = min(round(800/X),round(600/Y)); // dimensioni schermo Mac attuali 
	createCanvas((X*1.2)*dim, Y*dim);

	labirinto[Ystart][Xstart] = 0.77; // partenza che va subito a 0.72
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

riparti = function() {
	nMosse = 0;
	millisStart = millis();
	arrPassaggi = [];
	rimozioneInCorso = false;

	Xstart = 0;
	Ystart = 0;
	m = 0;
	n = 0;
	// m = Xstart;
	// n = Ystart;
	randomMappa();
	dim = min(round(800/X),round(600/Y));
	createCanvas((X*1.2)*dim, Y*dim); // non so se posso, spero

	labirinto[Ystart][Xstart] = 0.77; // partenza che va subito a 0.72

	randomTarget();

	trovato = false;
	imposs = false;
}

azzera = function() {
	nMosse = 0;
	millisStart = millis();
	arrPassaggi = [];
	rimozioneInCorso = false;
	for(let i = 0; i < Y; i++) {
		for(let k = 0; k < X; k++) {
			switch(labirinto[i][k]) {
				case 0: break; // muro rimane
				case 0.9: break; // libero rimane
				default: labirinto[i][k] = 0.9; // ritorna libero
			}
		}
	}

	labirinto[Ystart][Xstart] = 0.77; // partenza che va subito a 0.72
	labirinto[Ytarg][Xtarg] = 1; // arrivo

	m = Ystart;
	n = Xstart;

	trovato = false;
	imposs = false;

}

ritorno = function() {
	if(trovato) rimozioneInCorso = true;
	
}

rimuovi = function() {
	if(trovato) {
		let t = arrPassaggi.length; // lunghezza iniziale 
		rimuoviGiro(); // rimuovo ogni overlap
		rimuoviLaterali(); // rimuovo passaggi circolari vicini
		for(let c = 0; c < arrPassaggi.length; c++) {
			labirinto[arrPassaggi[c].m][arrPassaggi[c].n] = 5; // colore percorso più breve
		}
		rimozioneInCorso = false;
		console.log("Passi risparmiati: " + (t - arrPassaggi.length));
		console.log("% passi risparmiati: " + round((t - arrPassaggi.length)*100/t) + "%");
	}
}

rimuoviGiro = function() {
	for(let a = 0; a < arrPassaggi.length; a++) {
		for(let b = 0; b < arrPassaggi.length; b++) {
			if(	arrPassaggi[a].m == arrPassaggi[b].m && 
				arrPassaggi[a].n == arrPassaggi[b].n) {
				if(a != b) {
					arrPassaggi.splice(a+1,b-a); // tolgo uno in più perché stessa casella
				}
			}
		}
	}
}


rimuoviLaterali = function() {
	for(let a = 0; a < arrPassaggi.length; a++) {
		for(let b = 0; b < arrPassaggi.length; b++) {
			let Am = arrPassaggi[a].m;
			let An = arrPassaggi[a].n;
			let Bm = arrPassaggi[b].m;
			let Bn = arrPassaggi[b].n;
			if(	(Am == Bm && An == Bn + 1 ) ||
				(Am == Bm && An == Bn - 1 ) ||
				(Am == Bm + 1 && An == Bn ) ||
				(Am == Bm - 1 && An == Bn ) ) {
				if( (a != b+1) && (a != b-1) ) {
					arrPassaggi.splice(a+1,b-a-1); // tolgo uno in meno perché collegati
				}
			}
		}
	}
}

randomTarget = function() {
	Xtarg = round(random(X-1));
	Ytarg = round(random(Y-1));
	labirinto[Ytarg][Xtarg] = 1; // arrivo
}

draw = function() {
// 0 muro, 0.1 vc, 0.15-0.85 passato, 0.9 libero, 1 arrivo
// partenza 0.15
	
	background(230);
	// frameRate(5);
	frameRate(maxFPS);

	noStroke();
	rectMode(CENTER);

	push();
		textSize(width/80);
		textAlign(RIGHT,CENTER);
		if( ! trovato && ! imposs ) {
			res = trovaStrada(); // cerco qua
		}
		if( ! trovato ) {
			switch( res ) {
				case 1:
				case true:
					fill(0,200,0);
					text("Vittoria!",width-dim/4,height*11/20);
					// noLoop();
					trovato = true;
					break;
				case -1:
					fill(200,0,0);
					text("Impossibile!",width-dim/4,height*11/20);
					// noLoop();
					// trovato = true; // non proprio ma poi rimedierò
					imposs = true;
					break;
				case 0:
				case false:
					fill(120);
					if(VCallowed) text("In corso...",width-dim/4,height*11/20);
					else text("(Non si perde!)",width-dim/4,height*11/20);
					break;
				default: break;
			}
		}

		if(trovato && rimozioneInCorso) rimuovi();


		// if( trovato && ! trovato2) {
		// 	if(n32 == true) {
		// 		ritorno();
		// 		n32 = false;
		// 	}
		// 	res = trovaStrada(); // cerco qua
			
		// 	switch( res ) {
		// 		case 1:
		// 		case true:
		// 			fill(0,200,0);
		// 			text("Vittoria!",width-dim/4,height*11/20);
		// 			// noLoop();
		// 			trovato2 = true;
		// 			break;
		// 		case -1:
		// 			fill(200,0,0);
		// 			text("Impossibile!",width-dim/4,height*11/20);
		// 			// noLoop();
		// 			trovato2 = true; // non proprio ma poi rimedierò
		// 			break;
		// 		case 0:
		// 		case false:
		// 			fill(120);
		// 			if(VCallowed) text("In corso...",width-dim/4,height*11/20);
		// 			else text("(Non si perde!)",width-dim/4,height*11/20);
		// 			break;
		// 		default: break;
		// 	}
		// }
	pop();

	for(let i = 0; i < Y; i++) {
		for(let k = 0; k < X; k++) {
			if(labirinto[i][k] == 0) fill(0); // muro (nero)
			if(labirinto[i][k] == 0.1) fill(255,0,0); // vicolo cieco (rosso)
			if(labirinto[i][k] > 0.1 && labirinto[i][k] < 0.9) fill(0,0,255*( labirinto[i][k])) ; // già passato (scala blu)
			if(labirinto[i][k] == 0.72) fill(180,0,180); // partenza dopo primo passo (viola)
			if(labirinto[i][k] == 0.9) fill(255); // libero (bianco)
			if(labirinto[i][k] == 1) fill(0,255,0); // arrivo (verde)
			if(labirinto[i][k] == 5) fill(220,120,30); // best strada arancio
			if(i == m && k == n) fill(255,255,0); // corrente (giallo)
			rect(k*dim+dim/2,i*dim+dim/2,dim,dim);

		}
	}

	// if(trovaStrada() == 1) noLoop();

	push();
	textSize(width/80);
	fill(0);
	textAlign(RIGHT,CENTER);
	text(nSec + " s",width-dim/4,height/20);
	text(nMosse + " mov",width-dim/4,height*3/20);
	text(fps + " fps",width-dim/4,height*5/20);
	text(X + " / " + Y,width-dim/4,height*7/20);
	text(perc*100 + "% muri",width-dim/4,height*9/20);

	fill(40);
	rectMode(CENTER);
	rect(width/40*37,height*13/20,dim*9,dim*3);
	textAlign(CENTER,CENTER);
	fill(255);
	text("Nuovo",width/40*37,height*13/20);

	fill(60);
	rect(width/40*37,height*15/20,dim*9,dim*3);
	fill(255);
	text("Riprova",width/40*37,height*15/20);

	if(VCallowed) {
		fill(0,100,0);
		rect(width/40*37,height*17/20,dim*9,dim*3);
		fill(0);
		text("Vicoli ciechi",width/40*37,height*17/20);
	}
	else {
		fill(100,0,0);
		rect(width/40*37,height*17/20,dim*9,dim*3);
		fill(0);
		text("No V.C.",width/40*37,height*17/20);
	}	

	fill(60);
	rect(width/40*37,height*19/20,dim*9,dim*3);
	fill(255);
	text("Incredibol",width/40*37,height*19/20);
	pop();




	push(); // mostro coorinate quadretto su cui è mouse
	textSize(8);
	fill(255,0,0);
	// dim è lato (diametro)
	// mx su suo numero come width a x
	mouseSuQX = round(mouseX*X / width * 1.2);
	mouseSuQY = round(mouseY*Y / height);
	text( mouseSuQX,	mouseX+10,mouseY-5); // manca 1/2 dim da sommare somewhere
	text( mouseSuQY,	mouseX+10,mouseY+5);
	pop();

}

function touchStarted() {
	// console.log("ehhhehe");

	// MODIFICO LABIRINTO cliccando sui quadratini (liberi diventano muri, il resto diventa libero) 
	if( mouseX < X * dim ) {
		if(keyIsDown(tastoModifica) || modificaAbilitata ) {
			// console.log(round(mouseX*X / width * 1.2) + " , " + round(mouseY*Y / height) );
			// console.log(labirinto[mouseSuQY][mouseSuQX]);
			if(labirinto[mouseSuQY][mouseSuQX] == 0.9) labirinto[mouseSuQY][mouseSuQX] = 0;
			else labirinto[mouseSuQY][mouseSuQX] = 0.9;
			console.log("labirinto[" + [mouseSuQY] + "][" + [mouseSuQX] + "] modificato");
		}

		
		// click senza tastoModifica e modificaAbilitata
	}


	if( mouseX > width/40*37 - dim*4.5 &&
		mouseX < width/40*37 + dim*4.5 &&
		mouseY > height*13/20 - dim*1.5 &&
		mouseY < height*13/20 + dim*1.5 ) riparti();
	if( mouseX > width/40*37 - dim*4.5 &&
		mouseX < width/40*37 + dim*4.5 &&
		mouseY > height*15/20 - dim*1.5 &&
		mouseY < height*15/20 + dim*1.5 ) azzera();
	if( mouseX > width/40*37 - dim*4.5 &&
		mouseX < width/40*37 + dim*4.5 &&
		mouseY > height*17/20 - dim*1.5 &&
		mouseY < height*17/20 + dim*1.5 ) VCallowed = ! VCallowed;
	if( mouseX > width/40*37 - dim*4.5 &&
		mouseX < width/40*37 + dim*4.5 &&
		mouseY > height*19/20 - dim*1.5 &&
		mouseY < height*19/20 + dim*1.5 ) ritorno();

	return true;
	// return false; // boh
}

var trovaStrada = function() {
	// console.log("hey");
	nSec = round((millis()-millisStart)/1000);
	fps = round(frameRate());
	nMosse++;
	if(labirinto[m][n] > 0.1 && labirinto[m][n] <= 0.9) labirinto[m][n] -= 0.05;
	labirinto[m][n] = round(labirinto[m][n] *1000)/1000; // arrotondo valore per evitare bit error
	// arrPassaggi.push([m,n]); // nope, non va, devono essere oggetti, non arr
	arrPassaggi.push({m,n});
	return compara(m,n);
}

consoleMappa = function() {

	let arrDaStampare = labirinto;

	console.log(arrDaStampare);

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
	if(VCallowed) {
		if(sommina <= 0.3) return (-1);
	 // forse da mettere 0.4 ma non sono sicuro, potrebbe buggare
	}
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
