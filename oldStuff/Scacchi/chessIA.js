class ChessIA {

	constructor(n,b,p) {
		if(n == undefined) this.giocaNero = true;
		else n ? this.giocaNero = true : false;
		this.giocaBian = b || false;

		this.mostraProssime = p || false;

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
			if(s.arrBian[i].prossimeCaselle.length != 0) {
				this.arrMosseBian[n] = [ i, s.arrBian[i].prossimeCaselle ];
				n++;
			}
		}
		for(let i = 0; i < s.arrNeri.length; i++) {
			if(s.arrNeri[i].prossimeCaselle.length != 0) {
				this.arrMosseNero[m] = [ i, s.arrNeri[i].prossimeCaselle ];
				m++;
			}
		}
	}

	gioca() {
		if(s.turno && this.giocaNero) {
			this.prossimaMossa = random(this.arrMosseNero);
			let n = round(random(this.prossimaMossa[1].length -1));
			s.arrNeri[this.prossimaMossa[0]].sposta(this.prossimaMossa[1][n].j,this.prossimaMossa[1][n].k);
			if(this.mostraProssime) s.arrNeri[this.prossimaMossa[0]].mostraPossibili();
		}
		else {
			if( (! s.turno) && this.giocaBian ) {
				this.prossimaMossa = random(this.arrMosseBian);
				let m = round(random(this.prossimaMossa[1].length -1));
				s.arrBian[this.prossimaMossa[0]].sposta(this.prossimaMossa[1][m].j,this.prossimaMossa[1][m].k);
				if(this.mostraProssime) s.arrBian[this.prossimaMossa[0]].mostraPossibili();
				// console.log("ye");
			}
		}
		this.tuttoCioChePossoFare();
	}





}