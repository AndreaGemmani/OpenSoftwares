// Copyright (c) Andrea Gemmani 2018, available under MIT license 
// GitHub Gimmmy97	https://github.com/Gimmmy97

class Player {
	constructor() {
		this.modMov = 0; // 0 mouse, 1 tocco, 2 WASD, 3 Frecce
		this.pos = createVector(width/2,height*7/10);
		this.dim = width/15;
		this.skills = [];
		this.img = loadImage("aereoPG.ico");
		this.arrC = [];
		this.arrE = [];

		this.vitaTot = 1000;
		this.vitaRim = this.vitaTot;
	}

	// cambiaModMov(n) {
	// 	this.modMov = n;
	// }

	sposta() {
		switch(this.modMov) { // aggiungere WASD e frecce, supporto migliorato per touch
			case 0:
				this.pos.x = mouseX;
				this.pos.y = max(mouseY,height/2);
				break;
			default: 
				this.pos.x = mouseX;
				this.pos.y = max(mouseY,height/2);
				break;
		}
	}

	spara() {
		// sparo colpi ogni 20 millisecondi
		if(frameCount % 20 == 0) {
			if(this.arrC.length < 15) {
				// this.arrC.push(new Colpo(this.pos.x,this.pos.y));
				this.arrC.push(new Colpo(this.pos.x,this.pos.y,0,-height/80));
				// if(true) { // sparo oltre i 45
				// 	this.arrC.push(new Colpo(this.pos.x,this.pos.y,width/40,-height/80));
				// 	this.arrC.push(new Colpo(this.pos.x,this.pos.y,-width/40,-height/80));
				// }
				// if(true) { // sparo con raggio largo
				// 	this.arrC.push(new Colpo(this.pos.x,this.pos.y,width/400,-height/80));
				// 	this.arrC.push(new Colpo(this.pos.x,this.pos.y,-width/400,-height/80));
				// }
				// if(true) { // sparo raggio stretto
				// 	this.arrC.push(new Colpo(this.pos.x,this.pos.y,width/800,-height/80));
				// 	this.arrC.push(new Colpo(this.pos.x,this.pos.y,-width/800,-height/80));
				// }
				// if(this.megapowa2) { // sparo raggio stretto
				// 	this.arrC.push(new Colpo(this.pos.x,this.pos.y,width/800,-height/80));
				// 	this.arrC.push(new Colpo(this.pos.x,this.pos.y,-width/800,-height/80));
				// }
			}
		}
	}

	scontroAereo() {
		for(let a = 0; a < partita.LvGioco.arrA.length; a++) { // scontro con aerei
				let g = partita.LvGioco.arrA[a];
				if( g.pos.x + g.dim/2 > this.pos.x - this.dim/2 &&
					g.pos.x - g.dim/2 < this.pos.x + this.dim/2 &&
					g.pos.y > this.pos.y - this.dim/2 &&
					g.pos.y < this.pos.y + this.dim/2) {
					partita.LvGioco.arrA.splice(a,1);
					partita.LvGioco.nemiciRimasti--;
					partita.LvGioco.abbattuti++;
					// console.log("colpitooh");
					this.arrE.push(new Esplosione(this.pos.x,this.pos.y,this.dim/2,200));
					
					return true;
				}
		}
	}

	colpito() {
		if(partita.LvGioco.bossArrivato) { // colpito da missili 
			for(let c = 0; c < partita.LvGioco.boss.arrC.length; c++) {
				let q = partita.LvGioco.boss.arrC[c];
				if( q.pos.x > this.pos.x - this.dim/2 &&
					q.pos.x < this.pos.x + this.dim/2 &&
					q.pos.y > this.pos.y - this.dim/2 &&
					q.pos.y < this.pos.y + this.dim/2) {
					partita.LvGioco.boss.arrC.splice(c,1);
					// console.log("colpitooh");
					this.arrE.push(new Esplosione(this.pos.x,this.pos.y,this.dim/2,200));
					
					return true;
				}
			}
		}
		return false;
	}

	mostraEsplosioni() {
		for(let e = 0; e < this.arrE.length; e++) {
			if( ! this.arrE[e].mostra() ) this.arrE.splice(e,1);
		}

	}
	mostraColpi() {
		for(let i = 0; i < this.arrC.length; i++) {
			// this.arrC[i].aggiorna();
			this.arrC[i].mostra();
			if( this.arrC[i].fuori() ) {
				this.arrC.splice(i,1);
			}
		}

	}

	// creaSkill() { // non così
	// 	this.skills = [
	// 	[nome: "vel", lv: 1, val: 4],
	// 	[nome: "vit", lv: 1, val: 150],
	// 	[nome: "pot", lv: 1, val: 40],
	// 	[nome: "arm", lv: 1, val: 0],
	// 	[nome: "nRa", lv: 1, val: 1]
	// 	]
	// }

	mostra() {
		this.sposta();
		this.mostraVita();
		push();
		noFill();
		ellipse(mouseX,mouseY,this.dim/10); // piccolo puntatore per quando (pos aereo) != (pos mouse)

		image(this.img,this.pos.x-this.dim/2,this.pos.y-this.dim/2,this.dim,this.dim); // PG
		pop();

		this.spara();
		if(this.scontroAereo()) this.vitaRim -= 200;
		if(this.colpito()) this.vitaRim -= 100;

		// for(let i = 0; i < this.arrC.length; i++) {
		// 	// this.arrC[i].aggiorna();
		// 	this.arrC[i].mostra();
		// 	if( this.arrC[i].fuori() ) {
		// 		this.arrC.splice(i,1);
		// 	}
		// }
		this.mostraColpi();
		this.mostraEsplosioni();
	}

	mostraVita() {
		push();
		rectMode(CORNER);
		noStroke();

		translate(this.pos.x-this.dim/2,this.pos.y);

		fill(255,0,0);
		if(this.vitaRim >= 0) rect(0,this.dim,this.dim,this.dim/8);
		fill(0,255,0);
		if(this.vitaRim >= 0) rect(0,this.dim,this.dim * this.vitaRim / this.vitaTot,this.dim/8);

		stroke(255);
		strokeWeight(2);
		noFill();
		rect(0,this.dim,this.dim,this.dim/8);
		pop();
	}

	resiza() {
		this.dim = width/15;
	}

}