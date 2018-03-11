// Andrea Gemmani 11/3/18

// cose d fare o migliorare:
// posso creare un array con i punti in cui sono i pezzi
// quando sposto un pezzo !filtro la sua vecchia posizione eliminandola e pusho la nuova


// posso togliere controlli nei loop su spostamenti, appoggiandomi ad handler a filter successivi


class Scacchiera {

	// x va verso dx  da 1 a 8 
	// y va verso giù da 1 a 8

	// bianchi 0, neri 1
	// pezzi da 1 a 6:	pedone  alfiere  cavallo  torre  re  regina

	constructor(dim) {
		this.nPezzi = 16;
		this.arrBian = [];
		this.arrNeri = [];

		this.caselleVerdi = [];

		this.dim = dim;

		// this.loaddaImmagini();
		// if(this.loadFinito == 12)
			this.creaInizio();

	}

	loaddaImmagini() {
		// this.loadFinito = 0;
		// this.PN = loadImage('src=../../pezziScacchi/pedoneNero.ico',this.loadFinito++);
		// this.PB = loadImage('src=../../pedoneBianco.ico',this.loadFinito++);
		// this.AN = loadImage("src=../../alfiereNero.ico",this.loadFinito++);
		// this.AB = loadImage("src=../../alfiereBianco.ico",this.loadFinito++);
		// this.TN = loadImage("src=../../torreNera1.ico",this.loadFinito++); 
		// this.TB = loadImage("src=../../torreBianca.ico",this.loadFinito++);
		// this.CN = loadImage("src=../../cavalloNero1.ico",this.loadFinito++);
		// this.CB = loadImage("src=../../cavalloBianco.ico",this.loadFinito++);
		// this.RN = loadImage("src=../../reNero.ico",this.loadFinito++); 
		// this.RB = loadImage("src=../../reBianco.ico",this.loadFinito++);
		// this.RgN = loadImage("src=../../reginaNera.ico",this.loadFinito++);
		// this.RgB = loadImage("src=../../reginaBianca.ico",this.loadFinito++);

		// this.PN = loadImage('src=../../pezziScacchi/pedoneNero.ico'); 
		// this.PB = loadImage('src=../../pedoneBianco.ico');
		// this.AN = loadImage("src=../../alfiereNero.ico");
		// this.AB = loadImage("src=../../alfiereBianco.ico");
		// this.TN = loadImage("src=../../torreNera1.ico"); 
		// this.TB = loadImage("src=../../torreBianca.ico");
		// this.CN = loadImage("src=../../cavalloNero1.ico");
		// this.CB = loadImage("src=../../cavalloBianco.ico");
		// this.RN = loadImage("src=../../reNero.ico"); 
		// this.RB = loadImage("src=../../reBianco.ico");
		// this.RgN = loadImage("src=../../reginaNera.ico");
		// this.RgB = loadImage("src=../../reginaBianca.ico");

	}

	creaInizio() {
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
	}

	mostra() {
		this.mostraScacchiera();
		for(let n = 0; n < this.arrNeri.length; n++) {
			this.arrNeri[n].mostra();
		}
		for(let b = 0; b < this.arrNeri.length; b++) {
			this.arrBian[b].mostra();
		}
	}

	coloraDiVerde(arr) {
		if(arr == 0) this.caselleVerdi = [];
		this.caselleVerdi = arr;
	}

	mostraScacchiera() {
		push();
			stroke(230,150,50); // marrone chiaro
			strokeWeight(3);
			rectMode(CENTER);
			for(let y = 1; y <= 8; y++) {
				for(let x = 1; x <= 8; x++) {
					fill((x+y+1) %2 * 255); // alterno bianco e nero
					// if(this.coloraDiVerde)
					rect(x*this.dim - this.dim/2,y*this.dim -this.dim/2,this.dim,this.dim);
				}
			}
			for(let v = 0; v < this.caselleVerdi.length; v++) { // metto verde su quelli possibili
				fill(0,255,0,80);
				rect(this.caselleVerdi[v].j*this.dim - this.dim/2,this.caselleVerdi[v].k*this.dim -this.dim/2,this.dim,this.dim);
			}
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
						this.nome = "";
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

		this.possibili();
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
		s.coloraDiVerde(this.prossimeCaselle[0]);
	}
	stopMostraPossibili() {
		s.coloraDiVerde(0);
	}

	possibili() {
		this.prossimeCaselle = [];	// azzero l'array
		if(this.tipo == 1) {
			this.prossimeCaselle.push(this.movPed(this.x,this.y));
		}
		if(this.tipo == 2) {
			this.prossimeCaselle.push(this.movAlf(this.x,this.y));
		}
		if(this.tipo == 3) { // !!! no 3
			this.prossimeCaselle.push(this.movCav(this.x,this.y));
		}
		if(this.tipo == 4) { // !!! no 3
			this.prossimeCaselle.push(this.movTorre(this.x,this.y));
		}
		if(this.tipo == 5) {
			this.prossimeCaselle.push(this.movRe(this.x,this.y));
		}
		if(this.tipo == 6) { // regina
			this.prossimeCaselle.push(this.movAlf(this.x,this.y));
			this.prossimeCaselle.push(this.movTorre(this.x,this.y));
		}

		// handlo eventuali errori per uscita dalla scacchiera e non-moves
		this.prossimeCaselle[0] = this.prossimeCaselle[0].filter(z => (z.j > 0 && z.j < 9 && z.k > 0 && z.k < 9));
		this.prossimeCaselle[0] = this.prossimeCaselle[0].filter(z => (z.j != this.x || z.k != this.y));
	}


	movPed(x,y) {
		var daRit = [];
		if(this.colore) {
			if(! this.mossoPrimaVolta) { // prima mossa doppia
				daRit.push({j:x,k:y+2});
			}
			daRit.push({j:x,k:y+1});
		}
		else {
			if(! this.mossoPrimaVolta) { // prima mossa doppia
				daRit.push({j:x,k:y-2});
			}
			daRit.push({j:x,k:y-1});
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
		daRit.push({j:j-2,k:k+1});
		daRit.push({j:j-2,k:k-1});
		daRit.push({j:j-1,k:k+2});
		daRit.push({j:j-1,k:k-2});
		daRit.push({j:j+2,k:k+1});
		daRit.push({j:j+2,k:k-1});
		daRit.push({j:j+1,k:k+2});
		daRit.push({j:j+1,k:k-2});
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


	sposta(nX,nY) {
		if(nX > 0 && nX < 9 && nY > 0 && nY < 9) {
			if(true) { // controllare se ci sono pezzi sulla casella di arrivo
				if(this.prossimeCaselle[0].filter(x => (x.j == nX && x.k == nY)).length != 0) {
					// sono orgoglioso di questa funzione
					// this.prossimeCaselle[0].filter(x => this.primoFiltro(x,nX,nY));
					this.x = nX;
					this.y = nY;
					this.mossoPrimaVolta = true;
					this.stopMostraPossibili();
					this.possibili();
				}
			}
		}
	}



}