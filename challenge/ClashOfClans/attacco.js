class Attacco {

	constructor(bar,arce,gig,can,mon) {
		this.nBarbari = bar || 0;
		this.nArceri = arce || 0;
		this.nGiganti = gig || 0;
		this.nCannoni = can || 0;
		this.nMongolf = mon || 0;

		this.arrBarbari = [];
		this.arrArceri = [];
		this.arrGiganti = [];
		this.arrCannoni = [];
		this.arrMogolf = [];
		this.arrAttaccanti = [];

		this.crea();

		this.nAttaccanti = (	this.arrBarbari.length + this.arrArceri.length + this.arrGiganti.length + this.arrCannoni.length + this.arrMogolf.length);
		// console.log(this.nAttaccanti);

		this.pesoAttaccanti = (	this.arrBarbari.length * 1 + 
								this.arrArceri.length * 1 + 
								this.arrGiganti.length * 5 + 
								this.arrCannoni.length * 4 + 
								this.arrMogolf.length * 5	);


	}

	crea() { // creo i singoli e li butto anche in un handler di tutti 

		var i = 0;
		// barbari
		for(let b = 0; b < this.nBarbari; b++) {
			this.arrBarbari[b] = new Attaccante(1,1,0,0,12,20,18,-1);
			this.arrAttaccanti[i] = this.arrBarbari[b];
			i++;
		}
		// arceri
		for(let a = 0; a < this.nArceri; a++) {
			this.arrArceri[a] = new Attaccante(2,1,0,0,9,15,12,-1,70);
			this.arrAttaccanti[i] = this.arrArceri[a];
			i++;
		}
		// giganti
		for(let g = 0; g < this.nGiganti; g++) {
			this.arrGiganti[g] = new Attaccante(3,5,0,0,5,30,250,1);
			this.arrAttaccanti[i] = this.arrGiganti[g];
			i++;
		}
		// cannoni
		for(let c = 0; c < this.nCannoni; c++) {
			this.arrCannoni[c] = new Attaccante(4,4,0,0,10,20,80,-1,90);
			this.arrAttaccanti[i] = this.arrCannoni[c];
			i++;
		}
		// mongolfiere
		for(let m = 0; m < this.nMongolf; m++) {
			this.arrMogolf[m] = new Attaccante(5,5,0,0,8,40,220,1);
			this.arrAttaccanti[i] = this.arrMogolf[m];
			i++;
		}

		// console.log(this.arrAttaccanti.length);
		// console.log(this.nAttaccanti); // non da qua che ancora non esiste

	}


	// per ora non serve
	creazionePg(nome) { // dovrei creare tipo una instanceof oppure classi
		switch(nome) {
			case "barbaro":
			case 1: break;

		}
	}


	mostra() {

		for(let i = 0; i < this.arrAttaccanti.length; i++) {
			this.arrAttaccanti[i].mostra();
		}

	}




}




