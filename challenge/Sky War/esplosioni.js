// Copyright (c) Andrea Gemmani 2018, available under MIT license 
// GitHub Gimmmy97	https://github.com/Gimmmy97

class Esplosione {
	constructor(x,y,dim,d) {
		this.x = x;
		this.y = y;
		this.img = loadImage("esplosione.ico");
		this.dim = dim || width/20;
		this.tempoAct = millis();
		this.durata = d || 400;
	}
	mostra() {
		image(this.img,this.x-this.dim/2,this.y-this.dim/2,this.dim,this.dim);
		return(this.tempoAct + this.durata > millis());
	}
}