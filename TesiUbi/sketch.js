// Andrea Gemmani 
// GitHub Gimmmy97	https://github.com/Gimmmy97
// 11/6/2019 	Ubi's Tesi

// KNOWN ISSUE (?)
// per qualche motivo, pur avendo probabilmente sbagliato ad usare arrDiPartenza[i][] invece di t0[i][], il programma sembra fare ciò che deve
// ma smette di funzionare (come sarebbe più giusto facesse visto che così è teoricamente sbagliato) una volta eliminate le prime tre righe
// in Func che copiano in t0 arrDiPartenza.arr
// credo funcioni per un fatto di copia dinamici di array
// avrei potuto semplicemente modificare arrDiPartenza in t0 invece che scrivere tutte ste righe ma naaaah


var fileCSViniziale;
var arrDiPartenza;
var t0;
var arrDesiderato;
var S = "";

function preload() { // carico .csv iniziale
	fileCSViniziale = loadTable("copia1.csv");
}

function setup() {
	noCanvas(); // da ignorare, per P5JS

	arrDiPartenza = [];
	arrDiPartenza = fileCSViniziale.rows; // array di oggetti numerati in cui .arr è array di valori che voglio

	t0 = [];
	t0 = arrDiPartenza;

	arrDesiderato = Array(152); // valore trovato dividendo le righe totali-1 per 3 (bus,car,train)
}

var Funz = function() {
	// accomodo dati per lettura migliore
	for(let i = 0; i < arrDiPartenza.length; i++) {
		t0[i] = arrDiPartenza[i].arr;
	}

	// salvo gli indici delle colonne che mi servono prendendoli dal .csv iniziale
	let IdTime = 6;
	let IdInvc = 7;
	let IdTtme = 9;
	let IdInvt = 10;
	let IdGc = 11;
	let IdHinc = 12;
	let IdPsize = 13;

	var k = 0;
	for(let i = 0; i < t0.length; i++) {
		if(i == 0) { // creo i nomi delle colonne da mettere nella prima riga del nuovo .csv
			arrDesiderato[i] = ["id",	"time_car","time_bus","time_train",		"invc_car","invc_bus","invc_train",		"ttme_car","ttme_bus","ttme_train",		"invt_car","invt_bus","invt_train",		"gc_car","gc_bus","gc_train",		"hinc_car","hinc_bus","hinc_train",		"psize_car","psize_bus","psize_train",		"choicefinal"];
			k++;
		}
		else {
			if( (i) % 3 == 1 ) { // ogni riga divisa per 3 che da resto 1 è un BUS
				arrDesiderato[k] = Array(23); 	// creo un nuovo array delle dimensioni desiderate (numero di colonne)
				arrDesiderato[k][0] = arrDiPartenza[i][0]; // id
				arrDesiderato[k][1+1] = arrDiPartenza[i][IdTime]; // time
				arrDesiderato[k][4+1] = arrDiPartenza[i][IdInvc]; // invc
				arrDesiderato[k][7+1] = arrDiPartenza[i][IdTtme]; // ttme
				arrDesiderato[k][10+1] = arrDiPartenza[i][IdInvt]; // invt
				arrDesiderato[k][13+1] = arrDiPartenza[i][IdGc]; // gc
				arrDesiderato[k][16+1] = arrDiPartenza[i][IdHinc]; // hinc
				arrDesiderato[k][19+1] = arrDiPartenza[i][IdPsize]; // size
			}


			if( (i) % 3 == 2 ) { // ogni riga divisa per 3 che da resto 2 è CAR

				arrDesiderato[k][1+0] = arrDiPartenza[i][IdTime]; // time
				arrDesiderato[k][4+0] = arrDiPartenza[i][IdInvc]; // invc
				arrDesiderato[k][7+0] = arrDiPartenza[i][IdTtme]; // ttme
				arrDesiderato[k][10+0] = arrDiPartenza[i][IdInvt]; // invt
				arrDesiderato[k][13+0] = arrDiPartenza[i][IdGc]; // gc
				arrDesiderato[k][16+0] = arrDiPartenza[i][IdHinc]; // hinc
				arrDesiderato[k][19+0] = arrDiPartenza[i][IdPsize]; // size
			}


			if( (i) % 3 == 0 ) { // ogni riga divisibile per 3 (tranne la prima) è TRAIN

				arrDesiderato[k][1+2] = arrDiPartenza[i][IdTime]; // time
				arrDesiderato[k][4+2] = arrDiPartenza[i][IdInvc]; // invc
				arrDesiderato[k][7+2] = arrDiPartenza[i][IdTtme]; // ttme
				arrDesiderato[k][10+2] = arrDiPartenza[i][IdInvt]; // invt
				arrDesiderato[k][13+2] = arrDiPartenza[i][IdGc]; // gc
				arrDesiderato[k][16+2] = arrDiPartenza[i][IdHinc]; // hinc
				arrDesiderato[k][19+2] = arrDiPartenza[i][IdPsize]; // size

				arrDesiderato[k][22] = arrDiPartenza[i][21]; // aggiungo choice finale

				k++;	// aumento k ogni 3 controlli di i 

			}	
		}
	}
}


// scrivo su console la stringa che desidero (che sarebbe un .csv hard-coded) che poi copio e incollo in un file vuoto e salvo come .csv  
var consoleMe = function() {
	for(let i = 0; i < arrDesiderato.length; i++) {
		for(let k = 0; k < arrDesiderato[i].length; k++) {
			S += "\"";
			S += arrDesiderato[i][k];
			S += "\",";
		}

		S += " \n ";
	}
	console.log(S);
}


