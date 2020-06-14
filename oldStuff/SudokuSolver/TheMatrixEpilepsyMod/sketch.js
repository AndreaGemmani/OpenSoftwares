// Andrea Gemmani 27/12/2017 
// re: 16/12/2018 - 18/12/2018
// refactor per 4x4 e superiori: 8/04/2019
// last update: 26/04/2019


// TODO:
// - manca ancora da implementare la parte di risoluzione che toglie fra i possibili
//   quelli che creerebbero situazioni impossibili su altri righe/colonne/3x3,
//   questa parte è già scritta in parte ed in maniera molto poco precisa 
//   in fondo alla func di soluz dei singoli quadratini 
// - aggiungere altri Sudoku da mettere in un Array da cui caricarli per partite random


// KNOWN ISSUES:
// 


// ALTRO:
// - per il resto direi che è quasi perfetto
// - dovrei mettere a posto le posizoni dei pulsanti non ottimali 		DONE
//   ed abbellirli magari ma nulla di importante 
// - potrei riscrivere la pusantiera in modo da mettere i pulsanti vicini alle loro func
// - rimettere testoStronzo = 0 in caso di release 						AH GIA
// - togliere log o aggiungere flag debug per abilitare log, rendere log più congruenti 










// REFACTORIZZAZIONE:
// ho messo a posto draw per linee e quadrati, devo aggiustare il testo
// creare nuovi sudoku da 256 invece che 81  			IN CREAZIONE
// finire di creare il creatore di sudoku che elimina caselle da soluzione completa
// fino ad ottenere sudoku con unica soluzione e non minimizzabile
// per farlo devo saperlo risolvere quindi finire algoritmi
// modificare nomi dimS e dimS2, anche j3 e k3 magari 		probabilmente fatto
// modificare dimensioni canvas
// modificare posizione pulsanti
// aggiungere pulsanti per 4x4 con altri numeri (da 10 a 16) 	fatto


// online ho trovato hexadoku 16x16 che usa lettere al posto di numeri da 10 a 16 (A B C D E F G) 
// modifica fatta



// c'è pure il visual inganno delle linee piccole che in realtà sono 
// ciò che rimane dalla vicinanza di quadrati bianchi su sfondo nero







var Sudoku;

// var dimS = 16; 	// numero righe (=> colonne) sudoku
var dimS = 3;
var dimS = 4; 	// dimS2 = round(Math.sqrt(dimS)); // quadratini, se dimS = 9 => dimS2 = 3
var dimS2 = dimS * dimS; 	// numero righe (=> colonne) sudoku

var testoStronzo = 1;

function setup() {

	// createCanvas(450, 450);
	createCanvas(500, 500);
	// createCanvas(550, 550);


	Sudoku = new sudoku(dimS);
	pulsantiera = new PulsantieraSudoku();
	scrivitore = new ScrivitoreSudoku();

	Sudoku.creaTuttiKatakana();

}

draw = function() {

	background(255);  // MATRIX
	// frameRate(10);
	frameRate(4);

	Sudoku.mostra();
	scrivitore.mostra();

	if(frameCount % 4 == 0) Sudoku.modificaKatakana();
	if(frameCount % 9 == 0) Sudoku.modificaKatakana();
	if(frameCount % 5 == 0) Sudoku.modificaKatakana();
	Sudoku.modificaKatakana();

}



function touchStarted() {
	// if(scrivitore && scrivitore.controllaClick) 
	scrivitore.controllaClick();
	return false;
}
