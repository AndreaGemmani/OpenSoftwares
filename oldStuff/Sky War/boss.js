// Copyright (c) Andrea Gemmani 2018, available under MIT license 
// GitHub Gimmmy97	https://github.com/Gimmmy97

class Boss {
	constructor(tipo) {
		this.tipo = tipo || 1;
		this.pos = createVector(width/2,-height/10);
		this.centro = createVector(width/2,height/10);
		// this.centro = this.pos;
		switch(this.tipo) {
			case 0: 
				this.img = loadImage("boss1.ico");
				break;
			case 1: 
				this.img = loadImage("boss01.ico");
				break;
			case 2: 
				this.img = loadImage("boss02.ico");
				break;
			case 3: 
				this.img = loadImage("boss03.ico");
				break;
			case 4: 
				this.img = loadImage("boss04.ico"); // non ancora
				break;
			default: this.img = loadImage("boss1.ico");
		}
		// this.dim = this.img.size(); // ???? 
		this.dim = width/8;
		this.ang = 90;

		this.vitaTot = 1000;
		this.vitaRim = this.vitaTot;
		this.arrC = [];
		this.arrE = [];
	}

	mostra() {
		push();
		this.muovi();
		this.mostraVita();
		// this.spara(); // sparo da muovi(), solo quando è arrivato
		this.mostraColpi();
		image(this.img,this.pos.x-this.dim/2,this.pos.y-this.dim/2,this.dim,this.dim);
		// ellipse(this.pos.x,this.pos.y,this.dim/10);
		pop();
		if(this.colpito()) this.vitaRim -= 100;
		this.mostraVita();
	}

	mostraVita() {
		push();
		rectMode(CORNER);
		noStroke();

		translate(this.pos.x-this.dim/2,this.pos.y-this.dim*3/4);

		fill(255,0,0);
		rect(0,0,this.dim,this.dim/8);
		fill(0,255,0);
		if(this.vitaRim >= 0) rect(0,0,this.dim * this.vitaRim / this.vitaTot,this.dim/8);

		stroke(255);
		strokeWeight(2);
		noFill();
		rect(0,0,this.dim,this.dim/8);
		pop();
	}

	colpito() {
		for(let c = 0; c < partita.giocatore1.arrC.length; c++) {
			let q = partita.giocatore1.arrC[c];
			if( q.pos.x > this.pos.x - this.dim/2 &&
				q.pos.x < this.pos.x + this.dim/2 &&
				q.pos.y > this.pos.y - this.dim/2 &&
				q.pos.y < this.pos.y + this.dim/2) {
				partita.giocatore1.arrC.splice(c,1);
				// console.log("boss colpitooh");
				this.arrE.push(new Esplosione(this.pos.x,this.pos.y,this.dim/2,200));
				
				return true;
			}
		}
	
		return false;
	}


	spara() {
		switch(this.tipo) {
			case 1: // doppi insieme
				if(frameCount % 15 == 0) { 
					if(this.arrC.length < 18) {
						this.arrC.push(new Colpo(this.pos.x+this.dim/5,this.pos.y,0,width/60));
						this.arrC.push(new Colpo(this.pos.x-this.dim/5,this.pos.y,0,width/60));
					}
				}
				break;
			case 2: // leggermente sfasati 
				if(frameCount % 15 == 0) { 
					if(this.arrC.length < 18) {
						this.arrC.push(new Colpo(this.pos.x+this.dim/5,this.pos.y,0,width/60));
						// this.arrC.push(new Colpo(this.pos.x-this.dim/5,this.pos.y,0,width/60));
					}
				}
				if(frameCount % 15 == 5) {
					if(this.arrC.length < 18) {
						// this.arrC.push(new Colpo(this.pos.x+this.dim/5,this.pos.y,0,width/60));
						this.arrC.push(new Colpo(this.pos.x-this.dim/5,this.pos.y,0,width/60));
					}
				}
				break;
			case 3: // sfasati 
				if(frameCount % 14 == 0) { 
					if(this.arrC.length < 18) {
						this.arrC.push(new Colpo(this.pos.x+this.dim/5,this.pos.y,0,width/60));
						// this.arrC.push(new Colpo(this.pos.x-this.dim/5,this.pos.y,0,width/60));
					}
				}
				if(frameCount % 14 == 7) {
					if(this.arrC.length < 18) {
						// this.arrC.push(new Colpo(this.pos.x+this.dim/5,this.pos.y,0,width/60));
						this.arrC.push(new Colpo(this.pos.x-this.dim/5,this.pos.y,0,width/60));
					}
				}
				break;
			case 4: // triangolari punta giù
				if(frameCount % 15 == 0) { 
					if(this.arrC.length < 18) {
						this.arrC.push(new Colpo(this.pos.x,this.pos.y,0,width/60));
						// this.arrC.push(new Colpo(this.pos.x-this.dim/5,this.pos.y,0,width/60));
					}
				}
				if(frameCount % 15 == 2) {
					if(this.arrC.length < 18) {
						this.arrC.push(new Colpo(this.pos.x+this.dim/5,this.pos.y,0,width/60));
						this.arrC.push(new Colpo(this.pos.x-this.dim/5,this.pos.y,0,width/60));
					}
				}
				break;
			case 5: // mitra
				if(frameCount % 8 == 0) { 
					if(this.arrC.length < 18) {
						this.arrC.push(new Colpo(this.pos.x,this.pos.y,0,width/60));
						// this.arrC.push(new Colpo(this.pos.x-this.dim/5,this.pos.y,0,width/60));
					}
				}
				break;
			case 6: // rosata 3
				if(frameCount % 20 == 0) { 
					if(this.arrC.length < 18) {
						this.arrC.push(new Colpo(this.pos.x,this.pos.y,width/500,width/60));
						this.arrC.push(new Colpo(this.pos.x,this.pos.y,0,width/60));
						this.arrC.push(new Colpo(this.pos.x,this.pos.y,-width/500,width/60));
					}
				}
				break;
			default: // colpo singolo
				if(frameCount % 20 == 0) {
					if(this.arrC.length < 18) {
						this.arrC.push(new Colpo(this.pos.x,this.pos.y,0,width/60));
					}
				}
				break;
		}
	}

	mostraColpi() {
		for(let c = 0; c < this.arrC.length; c++) {
			this.arrC[c].mostra();
			if(this.arrC[c].fuori() ) this.arrC.splice(c,1);
		}
		
	}

	muovi() {
		if(this.pos.y < height/10) { // scende
			textSize(width/20);
			fill(255,0,0);
			textAlign(CENTER,CENTER);
			text("BOSS INCOMING!!",width/2,height/2);
			this.pos.y += height/400; // arriva alla sua posizione
		}
		else {
			push();
			angleMode(DEGREES);
			let h = cos(this.ang) * (width - this.dim)/2;
			// let w = sin(this.ang);

			this.pos.x = this.centro.x + h;
			this.ang++;
			pop();
			this.spara();
		}
	}

	resiza() {
		this.centro = createVector(width/2,height/10);
		this.dim = width/8;
	}

	morto() {
		return vitaRim < 0;
	}


}