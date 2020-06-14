
// necessarieo scrivere func prima che vengano legate ai pulsanti

var PulsantieraSudoku = function() {


	this.randomFunction = function() {
		Sudoku.nuovoRandom();
		// Sudoku.testP(1);
	}

	this.sudokuVuoto = function() {
		Sudoku.nuovoRandom("vuoto");
	}

	// this.mettiUnoFunction = function() {
	// 	Sudoku.testP(6);
	// }

	this.risolviFunction = function() {
		Sudoku.risolvi();
	}

	this.testoStronzoFunction = function() {
		testoStronzo = !testoStronzo;
	}

	this.clearSolFunction = function() {
		Sudoku.clearSoluzione();
	}

	this.controllaSolFunction = function() {
		Sudoku.controllaErrori();
	}

	this.mostraPossFunction = function() {
		Sudoku.mostraTuttiPossibiliFlag = ! Sudoku.mostraTuttiPossibiliFlag;
	}



	this.scriviUno = function() {
		scrivitore.cambiaCorrente(1);
	}

	this.scriviDue = function() {
		scrivitore.cambiaCorrente(2);
	}

	this.scriviTre = function() {
		scrivitore.cambiaCorrente(3);
	}

	this.scriviQat = function() {
		scrivitore.cambiaCorrente(4);

	}

	this.scriviCin = function() {
		scrivitore.cambiaCorrente(5);
	}

	this.scriviSei = function() {
		scrivitore.cambiaCorrente(6);
	}

	this.scriviSet = function() {
		scrivitore.cambiaCorrente(7);
	}

	this.scriviOtt = function() {
		scrivitore.cambiaCorrente(8);
	}

	this.scriviNov = function() {
		scrivitore.cambiaCorrente(9);
	}

	this.scriviN = function(n) {
		scrivitore.cambiaCorrente(n);
	}

	this.scriviCanc = function() {
		scrivitore.cambiaCorrente(-1);
	}

	this.scriviCancPoss = function() {
		// scrivitore.cambiaCorrente(-1); // nope, mi serve n
		scrivitore.tipoInserim = 2;
	}

	this.insFisso = function() {
		scrivitore.tipoInserim = 0;
	}

	this.insSoluz = function() {
		scrivitore.tipoInserim = 1;
	}

	this.consoleSudoku = function() {
		Sudoku.consoleSudoku();
	}

	this.randomSolFunc = function() { // da spostare 
		let gino = new CreatoreSudoku();
		gino.randomizzaSoluzione();
		console.log("Spostare creazione CreatoreSudoku da PulsantieraSudoku!")
	}

	this.modificaDimSudFunc = function() {
		if(selfo.dimS == 3) {
			dimS = 4;
			dimS2 = 4*4;
		}
		else {
			dimS = 3;
			dimS2 = 3*3;
		}
		selfo.togliVecchiPulsanti(); // wow fiko funziona
		setup();
	}

	// (*) a dire il vero vedo che l'elemento esiste ancora in p5 anche se non lo visualizza in canvas,
	// ho paura che l'istanza rimanga da qualche parte e che quindi continuare a crearne di nuovi
	// senza distruggere realmente i vecchi possa gravare sulla memoria occupata viste le dimensioni
	// di un elemento, da rivedere
	this.togliVecchiPulsanti = function() { // questo funziona (o forse no, leggi nota sopra (*) )
		for(let i = selfo.arrP.length -1; i >= 0; i--) {
			selfo.arrP[i].elt.remove();
		}
		// free real estate (IN REALTà non sono sicuro tolga lunghezza ad arrP, anzi)
		// for(let i = 0; i < selfo.arrP.length) {
		// 	selfo.arrP[0].elt.remove();
		// }
	}

	this.evidenziaNumeroFunc = function() {
		Sudoku.evidenziaNumeroFlag = ! Sudoku.evidenziaNumeroFlag;
		
	}


	this.usaCharHex = function() {
		for(let i = 9; i < selfo.arrP.length; i++) {
			selfo.arrP[i].elt.innerText = String.fromCharCode(65-9+i);
			selfo.arrP[i].elt.innerHTML = String.fromCharCode(65-9+i);
		}
	}

	this.usaNumeri = function() {
		for(let i = 9; i < selfo.arrP.length; i++) {
			selfo.arrP[i].elt.innerText = i+1;
			selfo.arrP[i].elt.innerHTML = i+1;
		}
	}

	this.controllaUsoCharNum = function() {
		if(Sudoku.altriNomiFlag) {
			selfo.usaCharHex();
		}
		else {
			selfo.usaNumeri();
		}
	}

	this.switchUsoCharNum = function() {
		Sudoku.modificaAltriNomiFlag();
		selfo.controllaUsoCharNum();
	}

	this.usaRndChar = function(seed) {
		let rndChar = (! isNaN(seed) ) ? seed : round(random(0,8000));
		for(let i = 0; i < selfo.arrP.length; i++) {
			let str = String.fromCharCode(rndChar+i);
			selfo.arrP[i].elt.innerText = str;
			selfo.arrP[i].elt.innerHTML = str;
			Sudoku.altriNomi[i+1] = str; // +1 perché qui non ho pulsante per zero
		}
		Sudoku.modificaAltriNomi();
		console.log("Nuovi char da " + rndChar);
	}

	this.modPulsN = function(nP,chr) {
		if(nP <= this.arrP.length) {	
			// let str = String.fromCharCode(chr);
			let str = chr;
			selfo.arrP[nP].elt.innerText = str;
			selfo.arrP[nP].elt.innerHTML = str;
		}
	}






	this.dimS = dimS;
	this.dimS2 = this.dimS * this.dimS;
	this.arrP = [];

	var selfo = this;

	var spaziaturaDx = 17.5;
	var spzXPulsDx = width + 20;
	var spaziaturaOrizz = width / this.dimS2; // 50 per 3 (9), preferirei due righe per 4 (16)
	var spaziaturaVert = width + 20 ;
	// var spaziaturaOrizz = 50;

	for(let i = 1; i < this.dimS2 + 1; i++) {
		this.arrP.push( createButton(i).position(spaziaturaDx + spaziaturaOrizz * (i-1),spaziaturaVert) );
		// https://thenewstack.io/mastering-javascript-callbacks-bind-apply-call/
		// vorrei aver capito al 100% perché funziona ma magari la volta prossima
		this.arrP[i-1].mousePressed(function() {
			selfo.scriviN(i);
		});
	}
	this.controllaUsoCharNum();


	this.canc = createButton("Cancella Inserito").position(spaziaturaDx,spaziaturaVert + 40);
	this.canc.mousePressed(this.scriviCanc);

	this.canc = createButton("Cancella Possibile").position(spaziaturaDx,spaziaturaVert + 80);
	this.canc.mousePressed(this.scriviCancPoss);

	this.ins0 = createButton("Fisso").position(spaziaturaDx + 215,spaziaturaVert + 40);
	this.ins0.mousePressed(this.insFisso);

	this.ins1 = createButton("Soluz").position(spaziaturaDx + 295,spaziaturaVert + 40);
	this.ins1.mousePressed(this.insSoluz);




	this.randomButton = createButton("Random").position(spzXPulsDx,30);
	this.randomButton.mousePressed(this.randomFunction);

	// this.mettiUnoButton = createButton("Predef").position(470,80);
	// this.mettiUnoButton.mousePressed(this.mettiUnoFunction);

	this.mettiUnoButton = createButton("Svuota").position(spzXPulsDx,80);
	this.mettiUnoButton.mousePressed(this.sudokuVuoto);

	this.testoStronzoButton = createButton("Dim Txt").position(spzXPulsDx,130);
	this.testoStronzoButton.mousePressed(this.testoStronzoFunction);


	this.risolviButton = createButton("Risolvi").position(spzXPulsDx,180);
	this.risolviButton.mousePressed(this.risolviFunction);

	this.mostraPossButton = createButton("MostraPoss").position(spzXPulsDx,230);
	this.mostraPossButton.mousePressed(this.mostraPossFunction);

	this.clearSolButton = createButton("ClearSol").position(spzXPulsDx,280);
	this.clearSolButton.mousePressed(this.clearSolFunction);

	this.controllaSolButton = createButton("ControllaSol").position(spzXPulsDx,330);
	this.controllaSolButton.mousePressed(this.controllaSolFunction);
	// controllaSolButton.mouseOver(controllaSolFunction);

	this.scriviConsole = createButton("Console").position(spzXPulsDx,380);
	this.scriviConsole.mousePressed(this.consoleSudoku);

	this.randomSol = createButton("Random Sol").position(spzXPulsDx,430);
	this.randomSol.mousePressed(this.randomSolFunc);

	this.modificaDimSud = createButton("Switch dimS").position(spzXPulsDx,480);
	this.modificaDimSud.mousePressed(this.modificaDimSudFunc);

	this.evidenziaNumero = createButton("Evidenzia").position(spzXPulsDx,530);
	this.evidenziaNumero.mousePressed(this.evidenziaNumeroFunc);

	this.rndCharButt = createButton("Rnd Char").position(spzXPulsDx,580);
	this.rndCharButt.mousePressed(this.usaRndChar);









}