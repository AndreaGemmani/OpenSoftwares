// Copyright (c) Andrea Gemmani 2018, available under MIT license 
// GitHub Gimmmy97	https://github.com/Gimmmy97

class Colpo {
	constructor(x,y,dx,dy) {
		this.dim = ceil( width / 40 );
		this.pos = createVector(x,y);
		this.vel = createVector(dx || 0, dy || -height/80);
		// this.vel = createVector(0,-10);
		// this.img = loadImage("colpo1.ico"); // onda energetica
		this.img = loadImage("colpo2.ico"); // missile
	}
	mostra() {
		this.aggiorna();
		// fill(0,0,255);
		// ellipse(this.pos.x,this.pos.y,this.dim);
		push();
		angleMode(DEGREES);
		translate(this.pos.x, this.pos.y);
		// if(this.vel.y > 0) 
		rotate(this.vel.heading() + 90);	// mando i missili verso il basso
		translate(- this.dim/2, - this.dim/2);
		image(this.img,0,0,this.dim,this.dim);
		pop();
	}

	colpito() {
		
		;
	}

	aggiorna() {
		this.pos.add(this.vel);
	}

	fuori() { // potrei aggiungere uscita da pos.x ma andando verticali non dovrebbero esserci problemi
		return(	this.pos.y < - this.dim || 
				this.pos.y > height + this.dim);
	}
}