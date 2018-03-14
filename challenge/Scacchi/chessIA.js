class ChessIA {

	constructor(n,b) {
		this.giocaNero = n || true;
		this.giocaBian = b || true;

		this.arrMosseNero = [];
		this.arrMosseBian = [];
		this.prossimaMossa = 0;

		if(this.giocaNero) console.log("La IA ha preso il controllo del giocatore nero!");
		if(this.giocaBian) console.log("La IA ha preso il controllo del giocatore bianco!");

		this.tuttoCioChePossoFare();
	}

	tuttoCioChePossoFare() {
		let n = 0;
		let m = 0;
		this.arrMosseBian = [];
		this.arrMosseNero = [];
		for(let i = 0; i < s.arrBian.length; i++) {
			if(s.arrBian[i].prossimeCaselle[0].length != 0) this.arrMosseBian[i] = [ i, s.arrBian[i].prossimeCaselle ];
			n++;
		}
		for(let i = 0; i < s.arrNeri.length; i++) {
			if(s.arrNeri[i].prossimeCaselle[0].length != 0) this.arrMosseNero[i] = [ i, s.arrNeri[i].prossimeCaselle ];
			m++;
		}
	}

	gioca() { // se il pedone finisce mosse possibili viene comunque scelto 
		// e non dovrebbe
		if(s.turno && this.giocaNero) {
			this.prossimaMossa = random(this.arrMosseNero);
			let n = round(random(this.prossimaMossa[1].length - 1));
			s.arrNeri[this.prossimaMossa[0]].sposta(this.prossimaMossa[1][n].j,this.prossimaMossa[1][n].k);
		}
		else {
			if( (! s.turno) && this.giocaBian ) {
				this.prossimaMossa = random(this.arrMosseBian);
				let m = round(random(this.prossimaMossa[1].length - 1));
				s.arrBian[this.prossimaMossa[0]].sposta(this.prossimaMossa[1][m].j,this.prossimaMossa[1][m].k);
				// console.log("ye");
			}
		}
		this.tuttoCioChePossoFare();
	}





}