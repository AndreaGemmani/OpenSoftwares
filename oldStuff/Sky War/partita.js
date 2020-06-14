// Copyright (c) Andrea Gemmani 2018, available under MIT license 
// GitHub Gimmmy97	https://github.com/Gimmmy97

class Partita {
	constructor(diff) {
		this.diff = diff || 1;
		this.currLv = 0;
		this.xpTot = 0;
		this.giocatore1 = new Player();
		this.LvGioco = new Livello();
		this.abbattuti = 0;
		// this.vitaTot = 1000;
		// this.vitaRim = this.vitaTot;
		this.n13 = 1; // fine partita secondi
		this.n14 = 1; // esperienza guadagnata 
		this.n15 = 1; // kill da aggoingere ad every level
		this.millisLivello = 0;
	}

	gioca() {
		if(this.giocatore1.vitaRim > 0) {
			this.LvGioco.spawna();
			if(this.LvGioco.finito() ) { // livello vinto battendo boss
				this.abbattuti += this.LvGioco.abbattuti;
				// this.rewardLivello();
				this.creaLivello(this.diff++);
			}
			this.giocatore1.mostra();
		}
		else { // muoio egitto
			this.finePartita();
		}
		this.LvGioco.mostra();
		// this.mostraFPS(); // !! debug !! 
	}

	finePartita() {
		if(this.n13) { // calcolo tempo passato in questo livello 
			this.tempoPassato = round(millis() / 1000) - this.millisLivello;
			this.n13 = 0;
		}
		push(); // scritte 
		textAlign(CENTER,CENTER);
		textSize(min(height/30,width/25));
		text("Il tuo aereo è stato abbattuto!", width/2,height*3/15);
		textSize(min(height/45,width/40));
		text("Tempo trascorso: " + this.tempoPassato + " secondi", width/2,height*6/15);
		text("Nemici abbattuti: " + this.abbattuti,width/2,height*7/15);
		text("Esperienza guadagnata: " + this.rewardLivello() + " xp",width/2,height*8/15);

		rectMode(CENTER); // box nuova partita
		fill(130);
		rect(width/2,height*11/15,width/3,height*2/15);
		fill(0,0,255);
		text("Nuova Partita", width/2,height*11/15);

		cursor(); // altrimenti non vedo dove cliccare
		
		// clicco nel box "nuova partita"
		if( mouseX > width/2 - width/6 &&
			mouseX < width/2 + width/6 &&
			mouseY > height*11/15 - height/15 &&
			mouseY < height*11/15 + height/15 ) {
			fill(25,60);
			rect(width/2,height*11/15,width/3,height*2/15);

			// if(touchStarted()) {
			// 	this.nuovaPartita();

			// }
			if(mouseIsPressed) {
				this.nuovaPartita();
			}
		}

		pop();

	}

	nuovaPartita() { // azzero tutto e riparte normale da solo <3
		this.diff = 1;
		this.currLv = 0;
		this.xpTot = 0;
		this.giocatore1 = new Player();
		this.LvGioco = new Livello();
		this.abbattuti = 0;
		this.n13 = 1; // fine partita secondi
		this.n14 = 1; // esperienza guadagnata 
		this.n15 = 1; // kill da aggoingere ad every level

		this.millisLivello = round(millis()/1000); // per mostrare quanto tempo è durato curr level
		noCursor();	// tolgo di nuovo

	}

	rewardLivello() { // calcolo esperienza guadagnata
		let esperienza = 0;
		if(this.n14) {
			this.abbattuti += this.LvGioco.abbattuti;
			esperienza = this.abbattuti * 100;
			this.xpTot += esperienza;
			this.n14 = 0;
		}
		esperienza = this.abbattuti * 100;
		return esperienza;
	}

	creaLivello() {
		this.LvGioco = new Livello(this.diff);
		this.n15 = 1;
	}

	mostraFPS() {
		push();
		fill(255,255,0);
		textSize(min(width/40,height/40));
		// text("FPS: " + round(frameRate() / 10) * 10,width/20,height/20);
		if(frameCount % 10 == 0) fr = round(frameRate() / 5) * 5;
		text("FPS: " + fr,width/20,height/20);
		pop();
	}

	resiza() {
		this.giocatore1.resiza();
		this.LvGioco.resiza();
	}


}
