var sudoku = function(dimS) {

this.dimS = dimS;
this.dimS2 = this.dimS * this.dimS;
this.quadrati = [];
this.risolto = false;
this.nRisolti = 0;
this.mostraTuttiPossibiliFlag = false;

this.evidenziaNumeroFlag = false;

this.valutazioneDifficolta = 0;

this.collectorSudoku = new TuttiSudoku();


this.crea = function() {

	for(var j = 0; j < this.dimS2; j++) {
		for(var k = 0; k < this.dimS2; k++) {
			this.quadrati[j*this.dimS2+k] = new quadrato(j,k); // || j+1,k+1
		}
	}

	this.collectorSudoku = new TuttiSudoku();

}

this.ottieniSoluz = function() {
	this.risolvi();
	while(this.nRisolti != this.dimS2 * this.dimS2) {
		this.nuovoRandom("vuoto");
		for(let i = 0; i < 10; i++) this.ultraFilla();
	}
	
}

this.ultraFilla = function() {
	for(let i = 0; i < this.dimS2 * this.dimS2; i++) {
		// if(random(1) > 0.8) {
			if(this.quadrati[i].valore[0] == 0) this.quadrati[i].mettiCasFraPoss();
		// }
		this.nRisolti = 0;
		this.risolvi();
		// this.risolvi();
		// this.risolvi();
		this.controllaErrori();
		this.eliminaErrori();	
	}
	// for(let i = 0; i < this.dimS2 * this.dimS2; i++) {
	// 	if(random(1) > 0.7) this.quadrati[i].cambiaVal(round(random(1,this.dimS2)));
	// }
}

this.cambia = function(j,k,v) {
	if(v != undefined) {
		if(v > 0 && v < this.dimS2 + 1) {
			this.quadrati[j*this.dimS2+k].cambiaVal(v);
			// console.log(this.quadrati[j*this.dimS2+k].valore[0]);
		}
		else console.log("NaN!");
	}
	else console.log("errore, valore indefinito");
}

this.provaSol = function(j,k,v) {
	if(v != undefined) {
		if(v > 0 && v < this.dimS2 + 1) {
			this.quadrati[j*this.dimS2+k].provaVal(v);
			// console.log(this.quadrati[j*this.dimS2+k].valore[0]);
		}
		else console.log("NaN!");
	}
	else console.log("errore, valore indefinito");
}

this.inserisciSudokuCompletoArray = function(arrS) {
	// sanity check da implementare !!!
	for(let j = 0; j < this.dimS2; j++) {
		for(let k = 0; k < this.dimS2; k++) {
			// this.quadrati[j*this.dimS2 + k].cambiaVal(arrS[j*this.dimS2 + k]); // come dovrebbe essere 
			this.quadrati[j*this.dimS2 + k].cambiaVal(arrS[k*this.dimS2 + j]);
		}
	}
	console.log("Sudoku completo inserito!");
}

this.inserisciCol = function(nR,arrQr) {
	for(i = 0; i < arrQr.length; i++) {
		if(arrQr[i] != undefined) {
			if(arrQr[i] > 0 && arrQr[i] < this.dimS2 + 1) this.quadrati[this.dimS2 * nR + i].cambiaVal(arrQr[i]);
		}
		else this.clearS(nR,i);
	}
}

this.inserisciRiga = function(nR,arrQr) {
	for(i = 0; i < arrQr.length; i++) {
		if(arrQr[i] != undefined) {
			if(arrQr[i] > 0 && arrQr[i] < this.dimS2 + 1) this.quadrati[this.dimS2 * i + nR].cambiaVal(arrQr[i]);
		}
		else this.clearS(i,nR);
	}
}

// this.inserisciCol = function(nR,a,b,c,d,e,f,g,h,i) {
// 	if(a != undefined) {
// 		if(a > 0 && a < this.dimS2 + 1) this.quadrati[nR*this.dimS2+0].cambiaVal(a);
// 		else this.clearS(nR,0); }
// 	if(b != undefined) {
// 		if(b > 0 && b < this.dimS2 + 1) this.quadrati[nR*this.dimS2+1].cambiaVal(b);
// 		else this.clearS(nR,1); }
// 	if(c != undefined) {
// 		if(c > 0 && c < this.dimS2 + 1) this.quadrati[nR*this.dimS2+2].cambiaVal(c);
// 		else this.clearS(nR,2); }
// 	if(d != undefined) {
// 		if(d > 0 && d < this.dimS2 + 1) this.quadrati[nR*this.dimS2+3].cambiaVal(d);
// 		else this.clearS(nR,3); }
// 	if(e != undefined) {
// 		if(e > 0 && e < this.dimS2 + 1) this.quadrati[nR*this.dimS2+4].cambiaVal(e);
// 		else this.clearS(nR,4); }
// 	if(f != undefined) {
// 		if(f > 0 && f < this.dimS2 + 1) this.quadrati[nR*this.dimS2+5].cambiaVal(f);
// 		else this.clearS(nR,5); }
// 	if(g != undefined) {
// 		if(g > 0 && g < this.dimS2 + 1) this.quadrati[nR*this.dimS2+6].cambiaVal(g);
// 		else this.clearS(nR,6); }
// 	if(h != undefined) {
// 		if(h > 0 && h < this.dimS2 + 1) this.quadrati[nR*this.dimS2+7].cambiaVal(h);
// 		else this.clearS(nR,7); }
// 	if(i != undefined) {
// 		if(i > 0 && i < this.dimS2 + 1) this.quadrati[nR*this.dimS2+8].cambiaVal(i);
// 		else this.clearS(nR,8); }
// }

// this.inserisciRiga = function(nR,a,b,c,d,e,f,g,h,i) {
// 	if(a != undefined) {
// 		if(a > 0 && a < this.dimS2 + 1) this.quadrati[0*this.dimS2+nR].cambiaVal(a);
// 		else this.clearS(0,nR); }
// 	if(b != undefined) {
// 		if(b > 0 && b < this.dimS2 + 1) this.quadrati[1*this.dimS2+nR].cambiaVal(b);
// 		else this.clearS(1,nR); }
// 	if(c != undefined) {
// 		if(c > 0 && c < this.dimS2 + 1) this.quadrati[2*this.dimS2+nR].cambiaVal(c);
// 		else this.clearS(2,nR); }
// 	if(d != undefined) {
// 		if(d > 0 && d < this.dimS2 + 1) this.quadrati[3*this.dimS2+nR].cambiaVal(d);
// 		else this.clearS(3,nR); }
// 	if(e != undefined) {
// 		if(e > 0 && e < this.dimS2 + 1) this.quadrati[4*this.dimS2+nR].cambiaVal(e);
// 		else this.clearS(4,nR); }
// 	if(f != undefined) {
// 		if(f > 0 && f < this.dimS2 + 1) this.quadrati[5*this.dimS2+nR].cambiaVal(f);
// 		else this.clearS(5,nR); }
// 	if(g != undefined) {
// 		if(g > 0 && g < this.dimS2 + 1) this.quadrati[6*this.dimS2+nR].cambiaVal(g);
// 		else this.clearS(6,nR); }
// 	if(h != undefined) {
// 		if(h > 0 && h < this.dimS2 + 1) this.quadrati[7*this.dimS2+nR].cambiaVal(h);
// 		else this.clearS(7,nR); }
// 	if(i != undefined) {
// 		if(i > 0 && i < this.dimS2 + 1) this.quadrati[8*this.dimS2+nR].cambiaVal(i);
// 		else this.clearS(8,nR); }
// }

this.clearS = function(jj,kk) {
	if(jj != undefined) {
			this.quadrati[jj*this.dimS2+kk].clearVal();
			console.log("(" + jj + "," + kk + ") resettato");
	}
	else {
		for(var j = 0; j < this.dimS2; j++) {
			for(var k = 0; k < this.dimS2; k++) {
				this.quadrati[j*this.dimS2+k].clearVal(); 
			}
		}
		console.log("Sudoku azzerato");
	}
}

// this.clearSoluzione = function() {

// 	for(var j = 0; j < this.dimS2; j++) {
// 		for(var k = 0; k < this.dimS2; k++) {
// 			if(this.quadrati[j*this.dimS2+k].aggiunto) this.quadrati[j*this.dimS2+k].clearVal(); 
// 		}
// 	}
// } 

this.clearSoluzione = function() {

	for(var j = 0; j < this.dimS2; j++) {
		for(var k = 0; k < this.dimS2; k++) {
			this.quadrati[j*this.dimS2+k].clearValSol(); 
		}
	}
} 

this.clearQuadSol = function(jj,kk) {

	if(this.quadrati[jj*this.dimS2+kk].aggiunto) this.quadrati[jj*this.dimS2+kk].clearVal(); 
		
} 
this.clearQuad = function(jj,kk) {

	if(! this.quadrati[jj*this.dimS2+kk].aggiunto) this.quadrati[jj*this.dimS2+kk].clearVal(); 
	// this.quadrati[jj*this.dimS2+kk].clearVal(); // senza if()
		
}

this.togliPoss = function(j,k,v) {
	if(v != undefined) {
		if(v > 0 && v < this.dimS2 + 1) {
			this.quadrati[j*this.dimS2+k].togli(v);
			// console.log(this.quadrati[j*this.dimS2+k].valore[0]);
		}
		else console.log("NaN!");
	}
	else console.log("errore, valore indefinito");
}

this.controllaErrori = function() {
	for(var j = 0; j < this.dimS2; j++) {
		for(var k = 0; k < this.dimS2; k++) {
			this.quadrati[j*this.dimS2+k].contrErr(); 
		}
	}
		// console.log("Sudoku azzerato"); // mostra numero errori 
}

this.eliminaErrori = function() {
	// this.controllaErrori();
	for(var j = 0; j < this.dimS2; j++) {
		for(var k = 0; k < this.dimS2; k++) {
			this.quadrati[j*this.dimS2+k].cancelErr(); 
		}
	}
	this.ricalcola();
		// console.log("Sudoku azzerato"); // mostra numero errori 
}

this.ricalcola = function() {
	this.nRisolti = 0;
	this.risolto = false;
	for(let i = 0; i < this.dimS2 * this.dimS2; i++) {
		if(this.quadrati[i].valore[0] != 0) this.nRisolti++;
	}
	
} 

this.consoleSudoku = function() { // VECCHIO, PER INSERIRE IN tuttiSudoku() in Array, deprecated
	var stringaCompleta = "";
	stringaCompleta += "[[";
	for(var j = 0; j < this.dimS2; j++) {
		stringaCompleta += "\t";
		for(var k = 0; k < this.dimS2; k++) {
			stringaCompleta += this.quadrati[k*this.dimS2+j].valore[0]; // Attenzione!! Switch indici!!!
			if(k != this.dimS2 -1 || (j != this.dimS2 -1) ) {
				stringaCompleta += ",";
			}
		}
		if(j != this.dimS2 -1) stringaCompleta += "\n";
	}

	stringaCompleta += "\t], 2\t],";
	console.log(stringaCompleta);
}

this.nuovoRandom = function(n) {
	this.clearS(); // elimino sudoku precedenti
	if(! isNaN(n) || n == undefined) {
		this.crea();
		this.collectorSudoku.insSudCasObj(n);
	}
	this.azzeraSeVal();
}
this.nuovoDiff = function(diff) {
	this.clearS(); // elimino sudoku precedenti
	if(! isNaN(n) || n == undefined) {
		this.crea();
		this.collectorSudoku.insSudDif(diff);
	}
	this.azzeraSeVal();
}


this.controllo = function() {

	console.log(this.quadrati);

}


this.mostra = function() {

	for(var j = 0; j < this.dimS2; j++) {
		for(var k = 0; k < this.dimS2; k++) {
			this.quadrati[j*this.dimS2+k].mostra(); 
		}
	}

	if(this.mostraTuttiPossibiliFlag) {
		this.mostraTuttiPossibili();
	}

	if(this.evidenziaNumeroFlag) {
		this.evidenziaNumeroSelezionato();
	}

	push();
		stroke(0);
		noFill();
		strokeWeight(4);

		for(let i = 0; i < this.dimS; i++) {
			line(width * i / this.dimS, 0, width * i / this.dimS, height);
			line(0, height * i / this.dimS, width, height * i / this.dimS);
		}

		strokeWeight(8);
		rectMode(CORNER);
		rect(0,0,width,height);
	pop();

}


this.mostraTuttiPossibili = function() {
	for(var j = 0; j < this.dimS2; j++) {
		for(var k = 0; k < this.dimS2; k++) {
			this.quadrati[j*this.dimS2+k].mostraTuttiPossibili(); 
		}
	}
}

this.evidenziaNumeroSelezionato = function() {
	for(var j = 0; j < this.dimS2; j++) {
		for(var k = 0; k < this.dimS2; k++) {
			this.quadrati[j*this.dimS2+k].evidenziaNumeroSelezionato(); 
		}
	}
}

this.randColonna = function(nR) {
	for(var g = 0; g < this.dimS2; g++) {
		this.cambia(nR,g,g);
	}
}
this.randRiga = function(nR) {
	for(var g = 0; g < this.dimS2; g++) {
		this.cambia(g,nR,g);
	}
}
this.randS = function(nR) {
	for(var j = 0; j < this.dimS2; j++) {
		for(var k = 0; k < this.dimS2; k++) {
			if(random(1) > 0.8) this.cambia(j,k,round(random(1,this.dimS2))); 
		}
	}
}

this.azzeraSeVal = function() {
	for(var j = 0; j < this.dimS2; j++) {
		for(var k = 0; k < this.dimS2; k++) {
			this.quadrati[j*this.dimS2+k].azzeraSeVal();
		}
	}
}

this.risolvi = function() {

	this.risolto = false;
	this.nRisolti = 0;

	this.azzeraSeVal();

	for(var j = 0; j < this.dimS2; j++) {
		for(var k = 0; k < this.dimS2; k++) {
			this.quadrati[j*this.dimS2+k].ris(); // || j+1,k+1
			// this.quadrati[j*this.dimS2+k].colonna();
			if(this.quadrati[j*this.dimS2+k].valore[0] != 0) this.nRisolti++;
		}
	}

	if(this.nRisolti == this.dimS2*this.dimS2) {
		this.risolto = true;
		// console.log("TADAAA RISOLTO :D");
	}

}



this.crea();
// this.controllo();
// this.mostra();


}



