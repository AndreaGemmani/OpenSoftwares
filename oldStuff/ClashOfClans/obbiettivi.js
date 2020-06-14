class Obbiettivo {

	constructor(x,y,vita, tipo) {

		this.vitaTot = vita || 400;
		// this.vitaRim = 0; // test 
		this.vitaRim = this.vitaTot;

		this.pos = createVector(random(0,width),random(0,height));
		this.tipo = tipo || round(random(2)); 
		// this.dim = round( random(20,40) );
		this.dim = round( this.vitaTot / 40 );

		switch(this.tipo) { // non va bene perchè tipo è difesa o risorsa ecc., non è tipo di difesa
			case 0: 
				this.potenzaDiFuoco = 0;
				this.visione = 0;
				this.cadenza = 0;
				break;
			case "cannone":
			case 1:
				this.potenzaDiFuoco = 20; 
				this.visione = 8;
				this.cadenza = 5;
				break;
			case 2:
			case "torreArcere":
			case "torre del arcere":
				this.potenzaDiFuoco = 15; 
				this.visione = 11;
				this.cadenza = 6;
				break;
			case 3: 
			case "mortaio":
				this.potenzaDiFuoco = 8;
				this.visione = 15;
				this.cadenza = 4;
			break;

			case undefined:
			default: 
				this.potenzaDiFuoco = 0;
				this.visione = 0;
				this.cadenza = 0;
				break;
		}
	}

	mostra() {
		push();
			if(this.tipo == 1) { // difese con bordo giallo 
				stroke(255,255,0);
				strokeWeight(5);
			}
			fill(255 * (this.vitaTot-this.vitaRim) / this.vitaTot , 255 * (this.vitaRim) / this.vitaTot , 0 ); // lerpo (male)
			rectMode(CENTER);
			rect(this.pos.x,this.pos.y,this.dim,this.dim);
		pop();
	}




}

class Campo {

	constructor(nObb) {

		this.nObb = nObb || 15;
		this.arrObb = [];

		this.crea();

	}

	crea() { // creo in random pos con random vita
		for(let i = 0; i < this.nObb; i++) {
			this.arrObb[i] = new Obbiettivo(  random(width), random(height), round( random(400,2000) )  );
		}
	}

	mostra() { // rimando ai mostra dei singoli edifici obbiettivi
		for(let i = 0; i < this.arrObb.length; i++) {
			this.arrObb[i].mostra();
			// if(this.arrObb.vitaRim < 0) this.arrObb.splice(i,1); // lo metto fuori 
		}
		this.arrObb = this.arrObb.filter(x => x.vitaRim > 0);

		if(this.arrObb.length == 0) {
			fill(255,255,0);
			textSize(width/20);
			textAlign(CENTER,CENTER);
			text("HAI Wintooo!!", width/2, height/2);
		}
		else {
			if(a.arrAttaccanti.length == 0) {
				fill(255,255,0);
				textSize(width/20);
				textAlign(CENTER,CENTER);
				text("HAI persososososssooooh!!", width/2, height/2);
			}
		}



	}




}