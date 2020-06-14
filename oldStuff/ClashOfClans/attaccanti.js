class Attaccante {
	
	constructor(tipo,peso,x,y,vMax,f,vita,pref,vis) {

		this.tipo = tipo || -1;
		this.peso = peso || 1;
		this.vitaTot = vita || 20;
		this.vitaRim = this.vitaTot; 
		this.forza = f || 20;
		this.obbPref = pref || -1;
		this.visione = vis || 10;

		this.pos = createVector( x || random(width) , y || random(height)) ;
		this.vel = createVector();
		this.vMax = vMax || 10;
		// this.vMax = 1;

		this.colpi = [];

		this.n18 = 1; // per entrare in scelta frame per colpi


		this.dim = 10 + (this.peso * 2); // texture

		this.scegliObb();
	}

	insegui() { // maggico, va come deve wow

		if( p5.Vector.dist(this.obbiettivo.pos, this.pos) > this.visione ) {
			var desired = p5.Vector.sub(this.obbiettivo.pos, this.pos); // A vector pointing from the location to the target

			desired.setMag(this.vMax / 10);
			this.pos.add(desired);
		}
		else this.colpisci();
	}

	scegliObb() {
		// in base alla distanza
		var temp = Infinity;
		this.nVicino = 0;
		var q = c.arrObb.filter(x => x.tipo == this.obbPref); // []

		if(this.obbPref != -1 && q.length > 0) {

			for(let o = 0; o < q.length; o++) {
				let dist = p5.Vector.dist(q[o].pos,this.pos);
				if(dist < temp) {
					temp = dist;
					this.nVicino = o;
					// salvo l'indice del vicino per usarlo per settarlo
					// fooorse mettere qui
					// " this.obbiettivo = c.arrObb[nVicino]; "  /  " this.obbiettivo = c.arrObb[o]; "
					// mi risparmia calcoli (in numero) o forse continuare a sovrascrivere array è peggio
				}
			}
			this.obbiettivo = q[this.nVicino]; 
		}

		// if(this.obbPref == -1) { // più vicino se non ha preferenze
		else {
			for(let o = 0; o < c.arrObb.length; o++) {
				let dist = p5.Vector.dist(c.arrObb[o].pos,this.pos);
				if(dist < temp) {
					temp = dist;
					this.nVicino = o;
					// salvo l'indice del vicino per usarlo per settarlo
					// fooorse mettere qui
					// " this.obbiettivo = c.arrObb[nVicino]; "  /  " this.obbiettivo = c.arrObb[o]; "
					// mi risparmia calcoli (in numero) o forse continuare a sovrascrivere array è peggio
				}
			}
			this.obbiettivo = c.arrObb[this.nVicino]; 
		}

		// else {
		// 	if( this.obbiettivo = random(c.arrObb.filter(x => x.tipo == this.obbPref) ) != undefined) 
		// }
		// stavo pensando che in caso mi ritornasse undefined per svariati motivi 
		// potrei metere quello che ora è un else, come if principale negato
		// e far sì che un return undefined di questo entri poi nel attuale if, poi else

		// else this.obbiettivo = random(c.arrObb); // no, quello sopra
	}

	colpisci() {
		if(this.n18) {
			this.fDiv = frameCount % 20;
			this.n18 = 0;
		}
		// console.log("yey");
		// non dovrebbe esserci bisogno di ricontrollare le distanze qui
		// if( p5.Vector.sub(this.pos,this.obbiettivo.pos).mag < this.visione ) {
		// dist(this.pos,this.obbiettivo.pos) < this.visione
		// console.log("yay");
		// }

		// poi modificherò, particella che simula colpo
		if(frameCount % 20 == this.fDiv) this.colpi.push(new Colpo(this.pos.x,this.pos.y,this.obbiettivo.pos.x,this.obbiettivo.pos.y));

		for(let i = 0; i < this.colpi.length; i++) {
			if(this.colpi[i].distanza < 5) {
				console.log("colpito");
				this.obbiettivo.vitaRim -= this.forza; // colpisco quando arriva il colpo
				this.colpi.splice(i,1);
			}
			// if(this.colpi[i].distanza > 300) this.colpi.splice(i,1);
		}

		// this.obbiettivo.vitaRim -= this.forza / 10; // woohoooo
		if(! this.obbiettivo || this.obbiettivo.vitaRim < 0) {
			// c.arrObb.splice(this.nVicino,1);
			this.scegliObb();
			this.colpi.splice(0,1000);
		}
	}

	mostra() {
		if(c.arrObb.length > 0) this.insegui();
		push();
			fill(60 + this.tipo * 40);
			// fill(255);
			ellipse(this.pos.x,this.pos.y,this.dim);
			stroke(0,0,255);
			// line(this.pos.x,this.pos.y,this.obbiettivo.pos.x,this.obbiettivo.pos.y);
			// console.log("yay");
			noStroke();
			textSize(20);
			fill(255,0,0);
			text(this.tipo,this.pos.x,this.pos.y); // scrivo numero per vedere e controllare
		pop();
		for(let i = 0; i < this.colpi.length; i++) {
			this.colpi[i].mostra();
		}
	}






}

// mi vanno a puttane i pg con i colpi, fuggono a cazzo
class Colpo {

	constructor(posAx,posAy,posOx,posOy) {
		this.pos = createVector(posAx,posAy); // posizione iniziale colpo
		this.posO = createVector(posOx,posOy);
		this.desired = p5.Vector.sub(this.posO,this.pos); // vettore distanza obb
		this.vMax = 3; // velocità colpo
		this.desired.setMag(this.vMax); // vettore distanza diventa vettore spostamento

		this.distanza = p5.Vector.dist(this.posO,this.pos); // mi serve per togliere di mezzo quelli arrivati

		this.dim = 5;
	}

	mostra() {
		push();
			this.pos.add(this.desired); // il colpo si avvicina al bersaglio (che è fermo per ora)
			this.distanza = p5.Vector.dist(this.posO,this.pos); // aggiorno la distanza rimasta
			// translate(this.pos.x,this.pos.y);
			fill(200,200,50);
			stroke(200,200,50);
			ellipse(this.pos.x,this.pos.y,this.dim);
			// console.log(this.distanza);
			// console.log("yay");
		pop();
	}


}





