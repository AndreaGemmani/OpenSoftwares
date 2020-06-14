// Andrea Gemmani 11/3/18

// cose d fare o migliorare:
// posso creare un array con i punti in cui sono i pezzi
// quando sposto un pezzo !filtro la sua vecchia posizione eliminandola e pusho la nuova


// posso togliere controlli nei loop su spostamenti, appoggiandomi ad handler a filter successivi


class Scacchiera {

	// x va verso dx  da 1 a 8 
	// y va verso giù da 1 a 8

	// bianchi 0, neri 1       => turno true è nero
	// pezzi da 1 a 6:	pedone  alfiere  cavallo  torre  re  regina

	constructor(dim) {
		this.nPezzi = 16;
		this.arrBian = [];
		this.arrNeri = [];

		this.arrPosNeri = [];
		this.arrPosBian = [];

		this.turno = 0; // a chi tocca muovere 

		this.caselleVerdi = [];
		this.caselleRosse = [];
		this.pezzoAttuale = [];

		this.dim = dim;

		// this.loaddaImmagini();
		// if(this.loadFinito == 12)

			this.creaInizio();
			// this.altreMappe(1);

	}

	loaddaImmagini() {
	}

	creaInizio() { // creo una normale partita 
		this.arrBian = [];
		this.arrNeri = [];
		// pedoni
		for(let p = 0; p < 8; p++) {
			this.arrNeri.push(new Pezzo(1,p+1,2,1));
			this.arrBian.push(new Pezzo(1,p+1,7,0));
		}
		// alfieri
		this.arrNeri.push(new Pezzo(2,3,1,1));
		this.arrNeri.push(new Pezzo(2,6,1,1));
		this.arrBian.push(new Pezzo(2,3,8,0));
		this.arrBian.push(new Pezzo(2,6,8,0));
		// cavalli
		this.arrNeri.push(new Pezzo(3,2,1,1));
		this.arrNeri.push(new Pezzo(3,7,1,1));
		this.arrBian.push(new Pezzo(3,2,8,0));
		this.arrBian.push(new Pezzo(3,7,8,0));
		// torri
		this.arrNeri.push(new Pezzo(4,1,1,1));
		this.arrNeri.push(new Pezzo(4,8,1,1));
		this.arrBian.push(new Pezzo(4,1,8,0));
		this.arrBian.push(new Pezzo(4,8,8,0));
		// re e regina 
		this.arrNeri.push(new Pezzo(5,5,1,1));
		this.arrNeri.push(new Pezzo(6,4,1,1));
		this.arrBian.push(new Pezzo(5,5,8,0));
		this.arrBian.push(new Pezzo(6,4,8,0));

		// this.calcolaPosPezzi();
	}

	altreMappe(n) {
		switch(n) {
			case(1): // due cavalli a centro mappa 
			this.arrBian.push(new Pezzo(3,5,3,0));
			this.arrNeri.push(new Pezzo(3,4,5,1));
			break;
			default: console.log("Nessuna mappa-scacchiera compatibile");
		}
	}

	calcolaPosPezzi() {
		this.arrPosBian = [];
		this.arrPosNeri = [];
		for(let b = 0; b < this.arrBian.length; b++) {
			this.arrPosBian.push({j:this.arrBian[b].x,k:this.arrBian[b].y,n:this.arrBian[b].nome});
		}

		for(let n = 0; n < this.arrNeri.length; n++) {
			this.arrPosNeri.push({j:this.arrNeri[n].x,k:this.arrNeri[n].y,n:this.arrNeri[n].nome});
		}
		// ad ogni spostamento ricontrollo tutte le caselle di mangio e di spostamento, molto pesante
		// e migliorabile controllando solo cose entangled ma difficile da trovare con sicurezzs
		for(let b = 0; b < this.arrBian.length; b++) {
			this.arrBian[b].possibili();
		}
		for(let n = 0; n < this.arrNeri.length; n++) {
			this.arrNeri[n].possibili();
		}
	}

	// this.calcolaPosPezzi();

	mostra() {
		this.mostraScacchiera();
		for(let n = 0; n < this.arrNeri.length; n++) {
			this.arrNeri[n].mostra();
		}
		for(let b = 0; b < this.arrBian.length; b++) {
			this.arrBian[b].mostra();
		}
	}

	coloraDiVerde(arr) {
		if(arr == 0) this.caselleVerdi = [];
		this.caselleVerdi = arr;
	}
	coloraDiRosso(arr) {
		if(arr == 0) this.caselleRosse = [];
		this.caselleRosse = arr;
	}
	coloraQuesto(x,y) {
		this.pezzoAttuale = {x:x,y:y};
	}
	stopMostraPossibili() {
		if (this.caselleVerdi.length != 0 && this.caselleRosse.length != 0) console.log("Nessuna casella da mostrare");
		this.caselleVerdi = [];
		this.caselleRosse = [];
		this.pezzoAttuale = [];
	}

	mostraScacchiera() {
		push();
			stroke(230,150,50); // marrone chiaro
			strokeWeight(3);
			rectMode(CENTER);
			for(let y = 1; y <= 8; y++) {
				for(let x = 1; x <= 8; x++) {
					fill((x+y+1) %2 * 255); // alterno bianco e nero
					if(x == this.pezzoAttuale.x && y == this.pezzoAttuale.y) fill(0,0,100);
					// if(this.coloraDiVerde)
					rect(x*this.dim - this.dim/2,y*this.dim -this.dim/2,this.dim,this.dim);
				}
			}
			// mostro le prossime caselle possibili in verde
			for(let v = 0; v < this.caselleVerdi.length; v++) {
				// fill(0,255,0,90); // la trasparenza potrebbe costare cpu
				fill(0,150,0);
				rect(this.caselleVerdi[v].j*this.dim - this.dim/2,this.caselleVerdi[v].k*this.dim -this.dim/2,this.dim,this.dim);
			}
			for(let r = 0; r < this.caselleRosse.length; r++) {
				// fill(0,255,0,90); // la trasparenza potrebbe costare cpu
				fill(200,0,0);
				rect(this.caselleRosse[r].j*this.dim - this.dim/2,this.caselleRosse[r].k*this.dim -this.dim/2,this.dim,this.dim);
			}

			// // mostro caselle occupate
			// for(let v = 0; v < this.arrPosBian.length; v++) { // metto verde su quelli possibili
			// 	// fill(0,255,0,90); // la trasparenza potrebbe costare cpu
			// 	fill(0,0,150);
			// 	rect(this.arrPosBian[v].j*this.dim - this.dim/2,this.arrPosBian[v].k*this.dim -this.dim/2,this.dim,this.dim);
			// }
			// for(let v = 0; v < this.arrPosNeri.length; v++) { // metto verde su quelli possibili
			// 	// fill(0,255,0,90); // la trasparenza potrebbe costare cpu
			// 	fill(200,200,0);
			// 	rect(this.arrPosNeri[v].j*this.dim - this.dim/2,this.arrPosNeri[v].k*this.dim -this.dim/2,this.dim,this.dim);
			// }
		pop();
	}




}


class Pezzo {

	constructor(tipo,x,y,colore) {
		this.tipo = tipo;
		this.x = x;
		this.y = y;
		this.colore = colore;

		this.dim = width/8;
		this.dimPezzo = 30;

		this.mossoPrimaVolta = false;

		this.mossePossibili = [];
		this.prossimeCaselle = [];
		this.mangiabili = [];

		switch(this.tipo) {
			case 1: if(this.colore) {	
						this.img = PN;
						this.nome = "Pedone nero";				
						break;	}
						this.img = PB;
						this.nome = "Pedone Bianco";
						break;
			case 2: if(this.colore) {
						this.img = AN; 
						this.nome = "Alfiere Nero";
						break;	}
						this.img = AB; 
						this.nome = "Alfiere Bianco";
						break;
			case 3: if(this.colore) {
						this.img = CN; 
						this.nome = "Cavallo Nero";
						break;	}
						this.img = CB; 
						this.nome = "Cavallo Bianco";
						break;
			case 4: if(this.colore) {
						this.img = TN; 
						this.nome = "Torre Nera";
						break;	}
						this.img = TB; 
						this.nome = "Torre Bianca";
						break;
			case 5: if(this.colore) {
						this.img = RN; 
						this.nome = "Re Nero";
						break;	}
						this.img = RB; 
						this.nome = "Re Bianco";
						break;
			case 6: if(this.colore) {
						this.img = RgN;
						this.nome = "Regina Nera";
						 break;	}
						this.img = RgB; 
						this.nome = "Regina Bianca";
						break;
		} // switch

		// this.possibili();
	}

	mostra() {
		push();
		fill(this.colore * 255);
		stroke(230,150,50);
		strokeWeight(3);

		// caccio la texture del pezzo  
		image(this.img,this.x*this.dim - this.dim/2 - this.dimPezzo/2,this.y*this.dim - this.dim/2 - this.dimPezzo/2,this.dimPezzo,this.dimPezzo);
		// image(this.img,this.x*this.dim - this.dim*3/4,this.y*this.dim - this.dim*3/4);
		// image(s.PB,50,50,this.dimPezzo,this.dimPezzo);

		// ellipse(this.x*this.dim - this.dim/2,this.y*this.dim -this.dim/2,this.dimPezzo,this.dimPezzo);
		pop();
	}

	mostraPossibili() {
		console.log("Caselle " + this.nome + " ");
		s.coloraDiVerde(this.prossimeCaselle);
		s.coloraDiRosso(this.mangiabili);
		s.coloraQuesto(this.x,this.y);
	}

	possibili() {
		this.prossimeCaselle = [];	// azzero gli array per poi refillarli
		this.mangiabili = [];
		if(this.tipo == 1) {
			this.prossimeCaselle = this.movPed(this.x,this.y);
		}
		if(this.tipo == 2) {
			this.prossimeCaselle = this.movAlf(this.x,this.y);
		}
		if(this.tipo == 3) { // !!! no 3
			this.prossimeCaselle = this.movCav(this.x,this.y);
		}
		if(this.tipo == 4) { // !!! no 3
			this.prossimeCaselle = this.movTorre(this.x,this.y);
		}
		if(this.tipo == 5) {
			this.prossimeCaselle = this.movRe(this.x,this.y);
		}
		if(this.tipo == 6) { // regina
			// this.prossimeCaselle = this.movAlf(this.x,this.y);
			// this.prossimeCaselle = this.movTorre(this.x,this.y);	
			this.prossimeCaselle = this.movReg(this.x,this.y);
		}

		// handlo eventuali errori per uscita dalla scacchiera e non-moves
		this.prossimeCaselle = this.prossimeCaselle.filter(z => (z.j > 0 && z.j < 9 && z.k > 0 && z.k < 9));
		this.prossimeCaselle = this.prossimeCaselle.filter(z => (z.j != this.x || z.k != this.y));
	}


	movPed(x,y) { // pedone mouve non-simmetrico quindi divido bianchi e neri
		var daRit = [];
		if(this.colore) { // se nero
			if(! this.mossoPrimaVolta) { // prima mossa doppia
				daRit.push({j:x,k:y+2});
			}
			daRit.push({j:x,k:y+1});

			// molto ripetitiva, probabilmente migliorabile.:
			// controllo se nelle caselle di mangio esistono pezzi avversari
			let c = s.arrPosBian.filter(z => (z.j == x+1 && z.k == y+1));
			if(c.length != 0) this.mangiabili.push(s.arrPosBian[ s.arrPosBian.indexOf(c[0]) ] );
			let d = s.arrPosBian.filter(z => (z.j == x-1 && z.k == y+1));
			if(d.length != 0) this.mangiabili.push(s.arrPosBian[ s.arrPosBian.indexOf(d[0]) ] );
		}
		else { // se bianco
			if(! this.mossoPrimaVolta) { // prima mossa doppia
				daRit.push({j:x,k:y-2});
			}
			daRit.push({j:x,k:y-1});

			let c = s.arrPosNeri.filter(z => (z.j == x+1 && z.k == y-1));
			if(c.length != 0) this.mangiabili.push(s.arrPosNeri[ s.arrPosNeri.indexOf(c[0]) ] );
			let d = s.arrPosNeri.filter(z => (z.j == x-1 && z.k == y-1));
			if(d.length != 0) this.mangiabili.push(s.arrPosNeri[ s.arrPosNeri.indexOf(d[0]) ] );
		}
		return daRit;
	}
	movAlf(x,y) { // x + y ? % x+y !!! && x-y
		var daRit = [];
		var diag1 = x + y;
		var diag2 = x - y;

		for(let k = 1; k <= 8; k++) {
			for(let j = 1; j <= 8; j++) {
				if(j != x && k != y) {
					if(j+k == diag1) { // se non va rimettere:     (!( (j+k) % diag1))
						daRit.push({j,k});
					}
					if(j-k == diag2) {
						daRit.push({j,k});
					}
				}
			}
		}
		return daRit;
	}
	movCav(j,k) { // potrei renderlo con x e y come gli altri
		var daRit = [];
		if(this.colore) { // nero 
			if(s.arrNeri.filter( z => z.x == j-2 && z.y == k+1 ).length == 0) {
				if(s.arrBian.filter( z => z.x == j-2 && z.y == k+1 ).length == 0) daRit.push({j:j-2,k:k+1});
				// else this.mangiabili.push
			}
			if(s.arrNeri.filter( z => z.x == j-2 && z.y == k-1 ).length == 0) {
				if(s.arrBian.filter( z => z.x == j-2 && z.y == k-1 ).length == 0) daRit.push({j:j-2,k:k-1});
			}
			if(s.arrNeri.filter( z => z.x == j-1 && z.y == k+2 ).length == 0) {
				if(s.arrBian.filter( z => z.x == j-1 && z.y == k+2 ).length == 0) daRit.push({j:j-1,k:k+2});
			}
			if(s.arrNeri.filter( z => z.x == j-1 && z.y == k-2 ).length == 0) {
				if(s.arrBian.filter( z => z.x == j-1 && z.y == k-2 ).length == 0) daRit.push({j:j-1,k:k-2});
			}
			if(s.arrNeri.filter( z => z.x == j+2 && z.y == k+1 ).length == 0) {
				if(s.arrBian.filter( z => z.x == j+2 && z.y == k+1 ).length == 0) daRit.push({j:j+2,k:k+1});
			}
			if(s.arrNeri.filter( z => z.x == j+2 && z.y == k-1 ).length == 0) {
				if(s.arrBian.filter( z => z.x == j+2 && z.y == k-1 ).length == 0) daRit.push({j:j+2,k:k-1});
			}
			if(s.arrNeri.filter( z => z.x == j+1 && z.y == k+2 ).length == 0) {
				if(s.arrBian.filter( z => z.x == j+1 && z.y == k+2 ).length == 0) daRit.push({j:j+1,k:k+2});
			}
			if(s.arrNeri.filter( z => z.x == j+1 && z.y == k-2 ).length == 0) {
				if(s.arrBian.filter( z => z.x == j+1 && z.y == k-2 ).length == 0) daRit.push({j:j+1,k:k-2});
			}
		}
		else { // bianco
			if(s.arrBian.filter( z => z.x == j-2 && z.y == k+1 ).length == 0) {
				if(s.arrNeri.filter( z => z.x == j-2 && z.y == k+1 ).length == 0) daRit.push({j:j-2,k:k+1});
				// else this.mangiabili.push
			}
			if(s.arrBian.filter( z => z.x == j-2 && z.y == k-1 ).length == 0) {
				if(s.arrNeri.filter( z => z.x == j-2 && z.y == k-1 ).length == 0) daRit.push({j:j-2,k:k-1});
			}
			if(s.arrBian.filter( z => z.x == j-1 && z.y == k+2 ).length == 0) {
				if(s.arrNeri.filter( z => z.x == j-1 && z.y == k+2 ).length == 0) daRit.push({j:j-1,k:k+2});
			}
			if(s.arrBian.filter( z => z.x == j-1 && z.y == k-2 ).length == 0) {
				if(s.arrNeri.filter( z => z.x == j-1 && z.y == k-2 ).length == 0) daRit.push({j:j-1,k:k-2});
			}
			if(s.arrBian.filter( z => z.x == j+2 && z.y == k+1 ).length == 0) {
				if(s.arrNeri.filter( z => z.x == j+2 && z.y == k+1 ).length == 0) daRit.push({j:j+2,k:k+1});
			}
			if(s.arrBian.filter( z => z.x == j+2 && z.y == k-1 ).length == 0) {
				if(s.arrNeri.filter( z => z.x == j+2 && z.y == k-1 ).length == 0) daRit.push({j:j+2,k:k-1});
			}
			if(s.arrBian.filter( z => z.x == j+1 && z.y == k+2 ).length == 0) {
				if(s.arrNeri.filter( z => z.x == j+1 && z.y == k+2 ).length == 0) daRit.push({j:j+1,k:k+2});
			}
			if(s.arrBian.filter( z => z.x == j+1 && z.y == k-2 ).length == 0) {
				if(s.arrNeri.filter( z => z.x == j+1 && z.y == k-2 ).length == 0) daRit.push({j:j+1,k:k-2});
			}

			// if(s.arrBian.filter( z => z.j == j-2 && z.k == k+1 ).length == 0) {
			// 	if(s.arrNeri.filter( z => z.j == j-2 && z.k == k+1 ).length == 0) daRit.push({j:j-2,k:k+1});
			// 	// else this.mangiabili.push
			// }
			// if(s.arrBian.filter( z => (z.j == j-2) && (z.k == k-1) ).length == 0) daRit.push({j:j-2,k:k-1});
			// if(s.arrBian.filter( z => z.j == j-1 && z.k == k+2 ).length == 0) daRit.push({j:j-1,k:k+2});
			// if(s.arrBian.filter( z => z.j == j-1 && z.k == k-2 ).length == 0) daRit.push({j:j-1,k:k-2});

			// if(s.arrBian.filter( z => z.j == j+2 && z.k == k+1 ).length == 0) daRit.push({j:j+2,k:k+1});
			// if(s.arrBian.filter( z => z.j == j+2 && z.k == k-1 ).length == 0) daRit.push({j:j+2,k:k-1});
			// if(s.arrBian.filter( z => z.j == j+1 && z.k == k+2 ).length == 0) daRit.push({j:j+1,k:k+2});
			// if(s.arrBian.filter( z => z.j == j+1 && z.k == k-2 ).length == 0) daRit.push({j:j+1,k:k-2});

		}
		return daRit;
	}
	movTorre(x,y) {
		var daRit = [];
		for(let m = 1; m <= 8; m++) {
			if(m != x) {
				daRit.push({j:m,k:y});
			}
		}
		for(let m = 1; m <= 8; m++) {
			if(m != y) {
				daRit.push({j:x,k:m});
			}
		}
		return daRit;
	}
	movRe(x,y) {
		var daRit = [];
		for(let k = this.y -1; k <= this.y+1; k++) {
			for(let j = this.x -1; j <= this.x+1; j++) {
				daRit.push({j,k});
			}
		}
		return daRit;
	}
	movReg(x,y) { // x + y ? % x+y !!! && x-y
		var daRit = [];
		var diag1 = x + y;
		var diag2 = x - y;

		for(let k = 1; k <= 8; k++) {
			for(let j = 1; j <= 8; j++) {
				if(j != x && k != y) {
					if(j+k == diag1) { // se non va rimettere:     (!( (j+k) % diag1))
						daRit.push({j,k});
					}
					if(j-k == diag2) {
						daRit.push({j,k});
					}
				}
			}
		}
		for(let m = 1; m <= 8; m++) {
			if(m != x) {
				daRit.push({j:m,k:y});
			}
		}
		for(let m = 1; m <= 8; m++) {
			if(m != y) {
				daRit.push({j:x,k:m});
			}
		}
		return daRit;
	}


	sposta(nX,nY) {
		if(nX > 0 && nX < 9 && nY > 0 && nY < 9) {
			if(s.turno == this.colore) { // controllo turno 
				if(this.prossimeCaselle.filter(x => (x.j == nX && x.k == nY)).length != 0) {
					// sono orgoglioso di questa funzione
					// this.prossimeCaselle.filter(x => this.primoFiltro(x,nX,nY));
					this.x = nX;
					this.y = nY;
					this.mossoPrimaVolta = true;
					s.calcolaPosPezzi();
					// this.possibili(); // c'è già in calcolaPosPezzi()
					s.turno = ! s.turno; // cambio turno dopo ogni mossa 
					console.log(this.nome + ( (this.tipo == 4 || this.tipo == 6) ? " mossa in " : " mosso in " ) + this.x + "," + this.y);
					s.stopMostraPossibili();
				}
				else console.log("Mossa non valida!");
			}
			else console.log("Turno del giocatore " + (s.turno ? "nero" : "bianco") + "!");
		}
		else console.log("Mossa non valida! (OutOfCanvas)");
	}



}