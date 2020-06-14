// Copyright (c) Andrea Gemmani 2018, available under MIT license 
// GitHub Gimmmy97	https://github.com/Gimmmy97

class Aereo {
	constructor(tipo) {
		this.tipo = tipo || 1;
		this.dim = ceil( width / 15) ;
		this.pos = createVector(random(width - this.dim) + this.dim/2, -this.dim*2);
		this.vel = createVector(0,height/200);
		// this.img = loadImage("aereoNemico.ico");
		switch(this.tipo) {
			case 0:
				this.img = loadImage("nemicoVerde.ico");
				break;
			case 1:
				this.img = loadImage("nemicoRosso1.ico");
				break;
			case 2:
				this.img = loadImage("nemicoBlu.ico");
				break;
			case 3:
				this.img = loadImage("nemicoNero.ico");
				break;
			case 4:
				this.img = loadImage("nemicoVerde.ico");
				break;
			default: this.img = loadImage("aereoNemico.ico");
		}
	}

	mostra() {
		// fill(255,0,0);
		// ellipse(this.pos.x,this.pos.y,this.dim);
		image(this.img,this.pos.x - this.dim/2, this.pos.y - this.dim/2,this.dim,this.dim);
	}

	colpito() {
		for(let m = 0; m < partita.giocatore1.arrC.length; m++) {
			let q = partita.giocatore1.arrC[m];
			if( q.pos.x > this.pos.x - this.dim/2 &&
				q.pos.x < this.pos.x + this.dim/2 &&
				q.pos.y > this.pos.y - this.dim/2 &&
				q.pos.y < this.pos.y + this.dim/2) {
				partita.giocatore1.arrC.splice(m,1);
				return true;
			}
		}
		return false;
	}

	aggiorna() {
		this.pos.add(this.vel);
	}

	fuori() {
		return(this.pos.y > height+this.dim);
	}
}

// class Esplosione {
// 	constructor(x,y,dim,d) {
// 		this.x = x;
// 		this.y = y;
// 		this.img = loadImage("esplosione.ico");
// 		this.dim = dim || width/20;
// 		this.tempoAct = millis();
// 		this.durata = d || 400;
// 	}
// 	mostra() {
// 		image(this.img,this.x-this.dim/2,this.y-this.dim/2,this.dim,this.dim);
// 		return(this.tempoAct + this.durata > millis());
// 	}
// }
