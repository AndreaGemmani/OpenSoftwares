// Andrea Gemmani 17/4/2018
// GitHub Gimmmy97	https://github.com/Gimmmy97

var labirinto;

// var X = 30; // 60 fpps
// var Y = 20;

var X = 50; // 30 fps (ottimo rapporto dimensioni/fps)
var Y = 30;

// var X = 60; // 20 fps
// var Y = 40;

// var X = 80; // 15 fps
// var Y = 50;

// var X = 100; // 12 fps
// var Y = 50;

// var X = 250; // 2 fps
// var Y = 150;


var perc = 0.2;		// 85/100 risolve
// var perc = 0.3;	// 65/100 risolve
// var perc = 0.35;	// 45/100 risolve
// var perc = 0.4;	// non ancora riuscito 

var m = 0;
var n = 0;

var dim = Math.round(800/X);
var arrAttorno = [];
var quale;

function setup() {

	createCanvas((X*1.2)*dim, Y*dim);

	labirinto = [];

	for(let i = 0; i < Y; i++) {
		labirinto[i] = new Array();
		for(let k = 0; k < X; k++) {
			labirinto[i][k] = (random(1) > perc) ? 0.9 : 0;
		}
	}
	labirinto[m][n] = 0.15; // partenza
	labirinto[Y-1][X-1] = 1; // arrivo

}

draw = function() { // 0.3 arrivo, 0.7 partenza, 0.5 strada, 1 passsaggio, 0 muro
// 0 muro, 0.1 vc, 0.15-0.85 passato, 0.9 libero, 1 arrivo
// partenza 0.15
	
	background(230);
	// frameRate(15);

	noStroke();
	rectMode(CENTER);


	for(let i = 0; i < Y; i++) {
		for(let k = 0; k < X; k++) {
			if(labirinto[i][k] == 0) fill(0); // muro (nero)
			if(labirinto[i][k] == 0.1) fill(255,0,0); // vicolo cieco (rosso)
			if(labirinto[i][k] > 0.1 && labirinto[i][k] < 0.9) fill(0,0,255*( labirinto[i][k])) ; // passaggio (scala blu)
			if(labirinto[i][k] == 0.9) fill(255); // libero (bianco)
			if(labirinto[i][k] == 1) fill(0,255,0); // arrivo (verde)
			if(i == m && k == n) fill(255,255,0); // corrente (giallo)
			rect(k*dim+dim/2,i*dim+dim/2,dim,dim);

		}
	}

	if(trovaStrada() == 1) noLoop();

	push();
	textSize(width/80);
	fill(0);
	textAlign(RIGHT,CENTER);
	text(round(millis()/1000) + " s",width-dim/4,height/20);
	text(round(frameCount) + " mov",width-dim/4,height*3/20);
	text(round(frameRate()) + " fps",width-dim/4,height*5/20);
	text(X + " / " + Y,width-dim/4,height*7/20);
	text(perc*100 + "% muri",width-dim/4,height*9/20);

	pop();

}

var trovaStrada = function() {
	labirinto[m][n] -= 0.05;
	if(compara(m,n)) return 1;
	return 0;
}

var compara = function(j,k) {
	arrAttorno = [];
	let massimino = 1;
	let sommina = 0;

	if(k < X-1) arrAttorno[0] = (labirinto[j][k+1]);
	else arrAttorno[0] = -0.01;
	if(k > 0) arrAttorno[1] = (labirinto[j][k-1]);
	else arrAttorno[1] = -0.01;
	if(j < Y-1) arrAttorno[2] = (labirinto[j+1][k]);
	else arrAttorno[2] = -0.01;
	if(j > 0 ) arrAttorno[3] = (labirinto[j-1][k]);
	else arrAttorno[3] = -0.01;

	// let quale = indexOf(max(arrAttorno));
	// quale = arrAttorno.indexOf(min(arrAttorno));

	massimino = max(arrAttorno);
	sommina = arrAttorno[0] + arrAttorno[1] + arrAttorno[2] + arrAttorno[3];
	if(sommina <= 0.8) labirinto[m][n] = 0.1; // vicolo cieco da vicoli ciechi 
	quale = arrAttorno.indexOf(massimino);
	// quale = arrAttorno.indexOf(max(arrAttorno));

	// m = quale[j];
	// n = quale[k];
	// m = arrAttorno[quale];
	// n = arrAttorno[quale];

	switch(quale) {
		case 0: k++; break;
		case 1: k--; break;
		case 2: j++; break;
		case 3: j--; break;
		default: break;
	}
	m = j;
	n = k;

	return (labirinto[m][n]) == 1;
}
