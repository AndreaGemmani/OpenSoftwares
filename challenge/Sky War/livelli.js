// Copyright (c) Andrea Gemmani 2018, available under MIT license 
// GitHub Gimmmy97	https://github.com/Gimmmy97

class Livello {
	constructor(diff,n) {
		this.diff = diff || 1;
		this.nNemici = n || 10 + this.diff*3;
		// this.nNemici = n || 5;
		this.daSpawnare = this.nNemici;
		this.nemiciRimasti = this.nNemici;
		this.abbattuti = 0;
		this.arrA = [];
		this.arrCN = [];
		this.arrE = [];
		this.timeSpawn = round(random(25,45));

		// this.texture = loadImage("field.jpg");
		this.yImg = 0;

		this.bossArrivato = false;
		this.boss = undefined;
		
	}

	spawna() { // creo aereo ogni 50 (media) millisecondi
		if(this.daSpawnare > 0) {
			if(this.arrA.length < 15) { // limite massimo per aerei in scena 
				if(this.arrA.length == 0) { // creo il primo altrimeenti casini 
					this.arrA.push(new Aereo(this.diff));
					this.daSpawnare--;
				}
				if(frameCount % this.timeSpawn == 0) {
					this.arrA.push(new Aereo(this.diff));
					this.daSpawnare--;
					this.timeSpawn += round(random(25,45)); // è brutto ma funziona perchè aggiungo un valore che raggiunge subito
				}
			}
		}
	}

	creaBoss() {
		if(this.nemiciRimasti == 0) {
			if( ! this.bossArrivato ) {
				this.boss = new Boss(this.diff);
				// this.boss = new Boss(6);
				this.bossArrivato = true;
			}
			this.boss.mostra();
		}
	}

	finito() { // fine livello 
		if(this.arrA.length <= 0) {
			if(this.bossArrivato) {
				if(this.boss.vitaRim <= 0) return true;
			}
		} 
		return false;
		// return (this.arrA.length <= 0 && this.boss.vitaRim <= 0);
	}

	mostra() {

		// image(this.texture,0,this.yImg,width,height);
		// image(this.texture,0,this.yImg-height,width,height);
		// stroke(255,0,0);
		// line(0,this.yImg,width,this.yImg);
		this.yImg++;
		if (this.yImg >= height) this.yImg = 0;


		for(let i = 0; i < this.arrA.length; i++) { // sposto e mostro aerei
			this.arrA[i].aggiorna();
			this.arrA[i].mostra();
			if( this.arrA[i].fuori() ) { // elimino aerei fuori
				this.arrA.splice(i,1);
				this.nemiciRimasti--;
			} else if( this.arrA[i].colpito() ) { // elimino aerei fuori e creo esplosioni al loro posto
				this.arrE.push(new Esplosione(this.arrA[i].pos.x,this.arrA[i].pos.y));
				this.arrA.splice(i,1);
				// if("geolocation" in window.navigator) { // solo una prova 
				// 	console.log(window.navigator.geolocation );
				// if("vibrate" in window.navigator) { // per qualche motivo non vibra 
				// 	window.navigator.vibrate(100);
				// }
				// else {
				// 	console.log("brrr brrr");
				// 	fill(255,255,0);
				// 	ellipse(width-30,30,30);
				// }
				this.nemiciRimasti--;
				this.abbattuti++;
			}
		}
		for(let e = 0; e < this.arrE.length; e++) {
			if( ! this.arrE[e].mostra() ) this.arrE.splice(e,1);
		}

		// if( ! this.bossArrivato) this.creaBoss();
		this.creaBoss();

		push();
		textSize(min(width/40,height/40));
		textAlign(RIGHT,BOTTOM);
		fill(255,255,0);
		text("Rimasti: " + (this.nemiciRimasti), width*19/20,height/15);
		text("Abbattuti: " + (this.abbattuti), width*19/20,height*3/30);
		pop();
	}

	// scontri() {
	// 	for(let a = 0; a < this.arrA; a++) {
	// 		if(this.arrA[a].colpito() ) {
	// 			this.arrA.splice(a,1); 
	// 			this.nemiciRimasti--;
	// 		}
	// 	}
	// }

	resiza() {
		if(this.bossArrivato) this.boss.resiza();

	}


}
