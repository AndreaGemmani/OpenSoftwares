var quadrato = function(j,k,valore) {

	this.dimS = dimS;
	this.dimS2 = dimS2;

	this.J = j;
	this.K = k;


	this.calcolaSommaPos = function() {
		let sum = 0;
		for(let i = 0; i <= this.dimS2; i++) {
			sum += i;
		}
		return sum;
	}

	this.creaJ3K3 = function() {
		// if minore di dimS da 0 a dimS
		// else if minore di this.Jgrande dimS da this.Jgrande-1 dimS a this.Jgrande dimS
		this.Jgrande = floor(this.J/this.dimS);
		this.Jpiccolo = this.J % this.dimS;
		this.arrJvicini = Array(this.dimS);
		for(let i = 0; i < this.arrJvicini.length; i++) {
			this.arrJvicini[i] = this.Jgrande * this.dimS + i;
		}
		this.Kgrande = floor(this.K/this.dimS);
		this.Kpiccolo = this.K % this.dimS;
		this.arrKvicini = Array(this.dimS);
		for(let i = 0; i < this.arrKvicini.length; i++) {
			this.arrKvicini[i] = this.Kgrande * this.dimS + i;
		}
	}


	// if(this.J < this.dimS) this.arrJvicini = [0,1,2];
	// else {
	// 	if(this.J < 6) this.arrJvicini = [3,4,5];
	// 	else this.arrJvicini = [6,7,8];
	// }

	// if(this.K < this.dimS) this.arrKvicini = [0,1,2];
	// else {
	// 	if(this.K < 6) this.arrKvicini = [3,4,5];
	// 	else this.arrKvicini = [6,7,8];
	// }

	this.creaJ3K3();

	this.n = j*this.dimS2+k;
	this.aggiunto = false;
	this.aggiuntoDiRecente = false;
	this.sbagliato = false;
	this.possibili = this.dimS2;
	this.sommapos = this.calcolaSommaPos();
	// this.valore = Array(this.dimS2 + 1).fill(1); // il primo mi da il valore certo, 0 se incerto
	this.valore = Array(this.dimS2 + 1).fill(1);
	this.valore[0] = 0;

	if( valore != undefined ) {
		if( valore > 0 && valore < this.dimS2 + 1) {
			this.valore[0] = valore;
			this.possibili = 1;
		}
		else console.log("valore non valido");
	}


	// per draw
	this.dim = width/this.dimS2 -1;
	this.pos = createVector(height/this.dimS2 * this.J + this.dim/2,width/this.dimS2 * this.K + this.dim/2);
	this.arrDimTxt = 	[0,60,50,35,21,12]; // sad bruteforce but working atm, finché non cambio dim canvas
	this.arrDimPoss = 	[0,60,50,15,6,3];
	// this.dimTesto = round(105 / this.dimS); 	// 35 per 3 (9)    	21 per 4 (16)
	// this.dimPoss = round(135 / this.dimS2); 	// 15 per 3 (9)		6 per 4 (16)
	this.dimTesto = this.arrDimTxt[this.dimS]; 	// 35 per 3 (9)    	21 per 4 (16)
	this.dimPoss = this.arrDimPoss[this.dimS];	// 15 per 3 (9)		6 per 4 (16)
	// this.dimTesto = 35; 	// 35 per 3 (9)    	21 per 4 (16)
	// this.dimPoss = 15; 	// 15 per 3 (9)		6 per 4 (16)
	this.rappTSt = 2 / 3;

	this.altriNomi = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G"];
	// this.altriNomi = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"]; 
	this.altriNomiFlag = true;

	this.ultimoModificato = false;
	this.opacit = random(120,255);

	this.mostra = function() {
		push();
		fill(0);	// MATRIX
		rectMode(CENTER);
		rect(this.pos.x,this.pos.y,this.dim,this.dim); // disegno quadrato
		textAlign(CENTER,CENTER);
		textSize(this.dimTesto);
		if(testoStronzo) textSize(this.dimTesto * this.rappTSt);

		if(this.valore[0] != 0) {
			if(this.sbagliato) fill(240, 255, 170, this.valore[0] * this.opacit); // MATRIX
			else {
				if(this.aggiunto) fill(140, 255, 170, this.opacit); // MATRIX
				else fill(0, 255, 70, this.opacit); // MATRIX
			}
			if(! this.altriNomiFlag) {
				text(this.valore[0],this.pos.x,this.pos.y);
			}
			else {
				text(this.altriNomi[this.valore[0]],this.pos.x,this.pos.y);
			}
		}
		pop();
	}

	this.mostraTuttiPossibili = function() {
		push();
		fill(0,150,180);
		textAlign(CENTER,CENTER);
		textSize(this.dimPoss);
		if(testoStronzo) textSize(this.dimPoss * this.rappTSt);

		if(this.valore[0] == 0) {
			let spzX = this.dim / (this.dimS + 1/2);
			// let spzY = this.dim / (this.dimS + 1/2);
			let spzM = this.dimS % 2 ? 0 : -spzX/2; // tolgo metà spaziatura se dimS pari (chi me l'ha fatto fare)
			for(let j = 0; j < this.dimS; j++) {
				for(let k = 0; k < this.dimS; k++) {
					let i = k + 1 + j * this.dimS;
					if(this.valore[i] == 1) {
						if(! this.altriNomiFlag) {
							text(i, this.pos.x + (k-1) * spzX, this.pos.y + (j-1) * spzX);
						}
						else {
							text(this.altriNomi[i], this.pos.x + (k-1) * spzX + spzM, this.pos.y + (j-1) * spzX + spzM);
						}
						
					}
				}
			}

		}
		pop();
	}

	this.evidenziaNumeroSelezionato = function() {
		push();
		stroke(0,150,180);
		strokeWeight(2);
		noFill();

		if(this.valore[0] != 0) {
			if( scrivitore != undefined &&
				scrivitore.numeroCorrente &&
				scrivitore.numeroCorrente == this.valore[0] ) {
				ellipse(this.pos.x,this.pos.y,this.dim - 2);
			}
		}
		noStroke();
		pop();
	}


this.modificaAltriNomiFlag = function(strSanf) {
	// this.altriNomiFlag = ! this.altriNomiFlag;
	this.altriNomiFlag = strSanf;
}

this.modificaAltriNomi = function() {
	for(let i = 0; i < Sudoku.altriNomi.length; i++) {
		this.altriNomi[i] = Sudoku.altriNomi[i];
	}
}

this.cambiaVal = function(v) {
	if(v != undefined) {
		if(v > 0 && v < this.dimS2 + 1) {
			this.aggiunto = false;
			this.sbagliato = false;
			this.valore[0] = v;
			this.possibili = 1;
			this.sommapos = v;
		}
	}
}

this.mettiCasFraPoss = function() {
	let arrIndPoss = [];
	for(let i = 1; i < this.dimS2 + 1; i++){
		if(this.valore[i] == 1) arrIndPoss.push(i);
	} 
	let v = random(arrIndPoss);
	this.aggiunto = false;
	this.sbagliato = false;
	this.valore[0] = v;
	this.possibili = 1;
	this.sommapos = v;
}

this.dammiUltimo = function(n1,n2,n3,n4,n5) { // 'na mmerda ma fingiamo di no
	let summ = 0; 
	for(let i = 0; i < this.dimS; i++) {
		summ += i;
	}
	return summ - ( (n1 || 0) + (n2 || 0) + (n3 || 0) + (n4 || 0) + (n5 || 0) );
}

this.provaVal = function(v) {
	if(v != undefined) {
		if(v > 0 && v < this.dimS2 + 1) {
			this.aggiunto = true;
			this.sbagliato = false;
			this.valore[0] = v;
			this.possibili = 1;
			this.sommapos = v;
		}
	}
}

this.clearVal = function() { // resetto il quadrato a vuoto
	this.aggiunto = false;
	this.sbagliato = false;
	this.possibili = this.dimS2;
	this.sommapos = this.calcolaSommaPos();
	this.valore = Array(this.dimS2 + 1).fill(1); 
	this.valore[0] = 0;
		
}

this.clearValSol = function() { // resetto quad solo se è sol
	if( this.valore[0] != 0 && this.aggiunto ||
		this.valore[0] == 0 && ! this.aggiunto) {
		this.aggiunto = false;
		this.sbagliato = false;
		this.possibili = this.dimS2;
		this.sommapos = this.calcolaSommaPos();
		this.valore = Array(this.dimS2 + 1).fill(1);
		this.valore[0] = 0;
	}
}

this.togli = function(n) {
	if(this.valore[n] != 0) {
		this.valore[n] = 0;
		this.possibili--;
		this.sommapos -= n;
		this.valuta();
	}
}

this.quiNonVa = function(n) { // per ora uguale a togli, forse modificabile se necessario
	if(this.valore[n] != 0) {
		this.valore[n] = 0;
		this.possibili--;
		this.sommapos -= n;
		this.valuta();
	}
}

this.azzeraSeVal = function() {
	let n = this.valore[0];
	if(n != 0) {
		for(let i = 1; i < this.dimS2 + 1; i++) {
			if(i == n) this.valore[i] = 1;
			else this.valore[i] = 0;
		}
	}
}

this.valuta = function() {
	if(this.possibili == 1) {
		this.valore[0] = this.sommapos;
		this.aggiunto = true;
	}
}

this.sonoSicuroCheQuestoSia = function(n) {
	this.valore[0] = n;
	this.aggiunto = true;
	this.sbagliato = false; // (?)
	this.possibili = 1;
	this.sommapos = n;

	this.azzeraSeVal();

	// IN TUTTI GLI ALTRI QUAD DI RIGA, COLONNA O 3x3	Sudoku.quadrati[ ].togli(valore[0]);
}


this.RIStogliSeCol = function() {
	// stessa colonna
	for(var i = 0; i < this.dimS2; i++) { // passo ogni quadrato i per riga
		if(this.valore[0] != 0) break;
		if(i != this.K) { // se è questo salto
			if(Sudoku.quadrati[this.J*this.dimS2+i].valore[0] != 0) {
				this.togli(Sudoku.quadrati[this.J*this.dimS2+i].valore[0]);
			}
		}
	}
}

this.RIStogliSeRiga = function() {
	// stessa riga
	for(var i = 0; i < this.dimS2; i++) { // passo ogni quadrato i per riga
		if(this.valore[0] != 0) break;
		if(i != this.J) { // se è questo salto
			if(Sudoku.quadrati[i*this.dimS2+this.K].valore[0] != 0) {
				this.togli(Sudoku.quadrati[i*this.dimS2+this.K].valore[0]);
			}
		}
	}
}


this.RIStogliSeQuad = function() {
	// 3x3
	for(var j = 0; j < this.dimS; j++) { // passo quadrati j per riga
		if(this.valore[0] != 0) break;		
		for(var k = 0; k < this.dimS; k++) {
			if(j != this.J || k != this.K) { // se non questo, controllo
				if(Sudoku.quadrati[ this.arrJvicini[j]*this.dimS2 + this.arrKvicini[k] ].valore[0] != 0) {
					this.togli(Sudoku.quadrati[ this.arrJvicini[j]*this.dimS2 + this.arrKvicini[k] ].valore[0]);
				}
			}
		}
	}
}

this.RISsoloQuiCol = function() {
	// se va solo qui COLONNA		// TROVARE/CREARE VARIABILE QUANTI NUMERI DIVERSI ESISTONO (this.dimS2 qui)
	if(this.valore[0] == 0) { // se valore non è già deciso
		for(let n = 1; n < this.dimS2 + 1; n++) { // per ogni numero n
			if(this.valore[n] == 1) { // se n può andare in questo quad
				for(let i = 0; i < dimS2; i++) { // controllo se può andare in altri quad
					if(this.K != i) { // (se è questo salto)
						if(Sudoku.quadrati[this.J*this.dimS2+i].valore[n] == 1) break; // se può andare anche in altri esco
						
					}
					if(i == this.dimS2) { // se fine loop, quindi unico posto in cui mettere n
						// this.togli(Sudoku.quadrati[this.J*this.dimS2+i].valore[0]);
						this.sonoSicuroCheQuestoSia(n);
					}
				}
			}
		}
	}
}

this.RISsoloQuiRiga = function() {
	// se va solo qui RIGA		// TROVARE/CREARE VARIABILE QUANTI NUMERI DIVERSI ESISTONO (this.dimS2 qui)
	if(this.valore[0] == 0) { // se valore non è già deciso
		for(let n = 1; n < this.dimS2 + 1; n++) { // per ogni numero n
			if(this.valore[n] == 1) { // se n può andare in questo quad
				for(let i = 0; i < this.dimS2; i++) { // controllo se può andare in altri quad
					if(this.J != i) { // (se è questo salto)
						if(Sudoku.quadrati[i*this.dimS2+this.K].valore[n] == 1) break; // se può andare anche in altri esco
						
					}
					if(i == this.dimS2-1) { // se fine loop, quindi unico posto in cui mettere n
						this.sonoSicuroCheQuestoSia(n);
					}
				}
			}
		}
	}
}


this.RISsoloQuiQuad = function() {
	// se va solo qui 3x3 		DA RIVEDERE (rivista, funziona ma potrebbe avere ancora falle)
	if(this.valore[0] == 0)	{
		for(let n = 1; n < this.dimS2 + 1; n++) {
			if(this.valore[n] == 1) {
				let esci = false;
				for(let j = 0; j < dimS && !esci; j++) { // passo quadrati j per riga
					for(let k = 0; k < dimS; k++) {
						// console.log(j + " " + k);
						if(this.arrJvicini[j] != this.J || this.arrKvicini[k] != this.K) { // se non questo, controllo
							if(Sudoku.quadrati[ this.arrJvicini[j]*this.dimS2 + this.arrKvicini[k] ].valore[n] == 1) {
								esci = true;
								// console.log("esco");
								break;
							}
						}
						if(j == dimS-1 && k == dimS-1) this.sonoSicuroCheQuestoSia(n);
					}
				}
			}
		}
	}
}






this.ris = function() {
	this.azzeraSeVal();

	this.RIStogliSeCol();
	this.RIStogliSeRiga();
	this.RIStogliSeQuad();

	this.RISsoloQuiCol();
	this.RISsoloQuiRiga();
	this.RISsoloQuiQuad();

}



this.provestupideRis = function() {

	this.azzeraSeVal();

	// tanto altro da fare per risolverlo davvero
	// per ora controlla solo riga, colonna e 3x3



	// SECONDA PARTE, posso metterla da enable-are 

	// 3x3 PRIMA PROVA
	// for(var j = 0; j < dimS; j++) { // passo quadrati j per riga
	// 	if(this.valore[0] != 0) break;		
	// 	for(var k = 0; k < dimS; k++) {
	// 		if(j != this.J || k != this.K) { // se non questo, controllo
	// 			if(Sudoku.quadrati[ this.arrJvicini[j]*this.dimS2 + this.arrKvicini[k] ].valore[0] == 0) {
	// 				if(Sudoku.quadrati[ this.arrJvicini[j]*this.dimS2 + this.arrKvicini[k] ].valore[n] == 0) 
	// 				this.togli(Sudoku.quadrati[ this.arrJvicini[j]*this.dimS2 + this.arrKvicini[k] ].valore[0]);
	// 			}
	// 		}
	// 	}
	// }


	// SECONDA PROVA, non va comunque atm
/*
	for(var n = 1; n < dimS2+1; n++) {
		if(this.valore[0] != 0) break;
		if(this.valore[n] == 1) { // se n qui è possibile 
			var sz = this.dimS2; // somma dei possibili di n degli altri q 3x3

			// 3x3
			for(var j = 0; j < dimS; j++) { // passo tutti i quadrati 
				// if (sz == 0) {	
					for(var k = 0; k < dimS; k++) {
						if(j != this.J || k != this.K) { // se non questo, controllo
							if(Sudoku.quadrati[ this.arrJvicini[j]*this.dimS2 + this.arrKvicini[k] ].valore[0] == 0) {
								if(Sudoku.quadrati[ this.arrJvicini[j]*this.dimS2 + this.arrKvicini[k] ].valore[n] == 1) {
									sz--;
									// break;
								}
							}
						}
					}
				// }
			}

			if(sz == 1) this.valore[0] = n;




		}
	}
*/

	// TERZA PROVA

	// for(var n = 1; n < dimS2; n++) {
	// 	if(this.valore[0] != 0) break;
	// 	if(this.valore[n] == 1) {
	// 		var sz = 0; // somma dei possibili di n degli altri q 3x3
	// 		for j
	// 			for k
	// 				if(this.valore[n] == 1) break;












// if()
// preso un valore possibile di questo quad 	es; [k = 5, j = 1]
// se in una delle caselle a arrKvicini diversi [0,1,2,6,7,8] e arrJvicini diversi [0,2] c'è lo stesso valore
// sicuro 	es: [k = 1, j = 2] ha lo stesso val sicuro di questo possibile
// se tutte le tre caselle a arrKvicini diverso [6,7,8] e arrJvicini diverso [0] sono occupate
// (o se non posso mettere n in quelle caselle)
// allora qui non può andare n
// 






	// 9/04/2019


	// per righe
	// per ogni possibile qui, se esiste in un altro 3x3 di riga
	// controllo che possa andare in almeno uno dei 3 quadrati nella riga rimasta
	// nell 3x3 rimasto, altrimenti qui questo non può andare

	// for(let i = 0; i < this.possibili; i++) {

	// }

	// per ora la faccio leggermente più pesante per essere sicuro e scrivere più easy

	// for(let i = 1; i < this.dimS2 + 1; i++) {
	// 	if(this.valore[n] == 1) {
	// 		for(let kf = 0; kf < this.dimS2; kf++) {
	// 			if()
	// 		}
	// 	}
	// }



	// 9/04/2019

	// for(let i = 1; i < this.dimS2 + 1; i++) {
	// 	if(this.valore[0] == 0 && this.valore[n] == 1) { // se è fra i possibili
	// 		let superBreak = false;
	// 		let flagMini = 0;
	// 		for(let superJ = 0; superJ < this.dimS; superJ++) {
	// 			if(superJ != this.Jgrande) {
	// 				for(let kf = 0; kf < this.dimS; kf++) {
	// 					if(this.arrKvicini[kf] != this.K) {
	// 						for(let jf = 0; jf < this.dimS; jf++) { // 3v controllando che sia diverso
	// 							let indicino = ( superJ * this.dimS + jf ) + ( this.dimS2 * this.arrKvicini[kf] );
	// 							if(this.K != Sudoku.quadrati[indicino].k) { // non necessario
	// 								// if(	Sudoku.quadrati[indicino].valore[0] != i &&
	// 								// 	Sudoku.quadrati[indicino].valore[i] == 0) flagMini++;
	// 								// else superBreak = true;
	// 								if(Sudoku.quadrati[indicino].valore[0] == i) {

	// 									let altroK = this.dammiUltimo(this.arrKvicini[kf],Sudoku.quadrati[indicino].arrKvicini[kf]);
	// 									let altroJ = ;

	// 									// CHE BORDELLO, TUTTO UN GRAN CASINO
	// 									// non penso ne uscirò vivo in questo modo

	// 									for(let kg = 0; kg < this.dimS; kg++) {
	// 										for(let jg = 0; jg < this.dimS; jg++) {
	// 											let inidicinoFinale = ( altroJ * this.dimS + jg ) + ( this.dimS2 * altroK )
	// 											if()			;									
	// 										}
	// 									}


	// 								}

	// 							}
	// 						}							
	// 					}
	// 				}					
	// 			}
	// 		}
	// 	}


	// 	if(flagMini == this.dimS * (this.dimS - 1) ) this.quiNonVa(i);
	// }






}


this.contrErr = function() {

	if(this.valore[0] != 0) {

		this.sbagliato = false; // inizializzo e cambio dopo eventuamente

		// stessa colonna
		for(var i = 0; i < this.dimS2; i++) { // passo ogni quadrato i per riga
			if(i != this.K) { // se è questo salto
				if(Sudoku.quadrati[this.J*this.dimS2+i].valore[0] == this.valore[0]) {
					this.sbagliato = true;
				}
			}
		}



		// stessa riga
		for(var i = 0; i < this.dimS2; i++) { // passo ogni quadrato i per riga
			if(i != this.J) { // se è questo salto
				if(Sudoku.quadrati[i*this.dimS2+this.K].valore[0] == this.valore[0]) {
					this.sbagliato = true;
				}
			}
		}


		// 3x3
		for(var jz = 0; jz < dimS; jz++) { // passo quadrati j per riga
			for(var kz = 0; kz < dimS; kz++) {
				if(this.arrJvicini[jz] != this.J || this.arrKvicini[kz] != this.K) { // se non questo, controllo
					if(Sudoku.quadrati[ this.arrJvicini[jz]*this.dimS2 + this.arrKvicini[kz] ].valore[0] == this.valore[0] ) {
						// console.log(this.arrJvicini[jz]*this.dimS2 + this.arrKvicini[kz]);
						this.sbagliato = true;
					}
				}
			}
		}


	}

}


this.cancelErr = function() {

	if(this.valore[0] != 0) {
		this.sbagliato = false;

		// stessa colonna
		for(var i = 0; i < this.dimS2; i++) { // passo ogni quadrato i per riga
			if(i != this.K) { // se è questo salto
				if(Sudoku.quadrati[this.J*this.dimS2+i].valore[0] == this.valore[0]) {
					this.clearVal();
				}
			}
		}



		// stessa riga
		for(var i = 0; i < this.dimS2; i++) { // passo ogni quadrato i per riga
			if(i != this.J) { // se è questo salto
				if(Sudoku.quadrati[i*this.dimS2+this.K].valore[0] == this.valore[0]) {
					this.clearVal();
				}
			}
		}


		// 3x3
		for(var jz = 0; jz < dimS; jz++) { // passo quadrati j per riga
			for(var kz = 0; kz < dimS; kz++) {
				if(this.arrJvicini[jz] != this.J || this.arrKvicini[kz] != this.K) { // se non questo, controllo
					if(Sudoku.quadrati[ this.arrJvicini[jz]*this.dimS2 + this.arrKvicini[kz] ].valore[0] == this.valore[0] ) {
						// console.log(this.arrJvicini[jz]*this.dimS2 + this.arrKvicini[kz]);
						this.clearVal();
					}
				}
			}
		}


	}

}





}