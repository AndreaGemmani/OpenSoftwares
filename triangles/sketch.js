// Andrea Gemmani 
// GitHub Gimmmy97	https://github.com/Gimmmy97

var zeroX = 10;
var zeroY = 10;
var fineX;
var fineY;

var puntiX = 19; // 20 quadrati per
var puntiY = 21; // 18 
var totPunti = puntiX * puntiY;

var dim = 5;

var arrP = [];

var nTriangoli = 0;

var a = 0;
var b = 1;
var c = 2;


function setup() {
	createCanvas(18*30, 20*30);
	fineX = width - 10;
	fineY = height - 10;

	noLoop();
}

draw = function() {
	
	background(0);
	// frameRate(15);

	nTriangoli = 0;

	fill(255);
	noStroke();

	let W = round( (fineX-zeroX) / (puntiX-1) );
	let H = round( (fineY-zeroY) / (puntiY-1) );

	translate(zeroX, zeroY);

	let i = 0;
	for(let j = 0; j < puntiY; j++) {
		for(let k = 0; k < puntiX; k++) {
			// ellipse(k*W,j*H,dim);
			arrP.push(new Punto(k*W,j*H));
			arrP[i].mostra();
			i++;
		}
	}


	// // tutto in uno
	for(let a = 0; a < totPunti; a++) {
		for(let b = 0; b < totPunti; b++) {
			for(let c = 0; c < totPunti; c++) {
				if( controllaTriangolo( arrP[a],arrP[b],arrP[c] ) ) {
					// mostraTriangolo(arrP[a],arrP[b],arrP[c]);
					nTriangoli++;
				}
			}
		}
	}

	// un po' alla volta
	// if( controllaTriangolo( arrP[a],arrP[b],arrP[c] ) ) {
	// 	mostraTriangolo(arrP[a],arrP[b],arrP[c]);
	// 	nTriangoli++;
	// }
	// c++;

	// if(c == totPunti) {
	// 	b++;
	// 	c = b+1;
	// }
	// if(b == totPunti) {
	// 	a++;
	// 	b = a+1;
	// 	c = b+1;
	// }

	// fill(255,255,0); // a giallo
	// ellipse(arrP[a].x,arrP[a].y,dim*2);
	// fill(255,0,255); // b viola
	// ellipse(arrP[b].x,arrP[b].y,dim*2);
	// fill(0,255,255); // c azzurro
	// ellipse(arrP[c].x,arrP[c].y,dim*2);

	console.log(nTriangoli);

}

// var controllaTriangolo = function(p1,p2,p3) {

// 	// punto ripetuto
// 	if( (p1.x == p2.x && p1.y == p2.y) ||
// 		(p3.x == p2.x && p3.y == p2.y) || 
// 		(p1.x == p3.x && p1.y == p3.y) ) return 0;

// 	// rettangoli
// 	if(p1.x == p2.x) {
// 		if(p1.y == p3.y || p2.y == p3.y) {
// 			if( p1.x - p2.x == p1.y - p3.y ||
// 				p1.x - p2.x == p2.y - p3.y) return 1;
// 		}
// 	}
// 	if(p1.x == p3.x) {
// 		if(p1.y == p2.y || p3.y == p2.y) return 1;
// 	}
// 	if(p2.x == p3.x) {
// 		if(p2.y == p1.y || p3.y == p1.y) return 1;
// 	}

// 	return 0;

// }

// var controllaTriangolo = function(p1,p2,p3) {
// 	// punto ripetuto
// 	if( (p1.x == p2.x && p1.y == p2.y) ||
// 		(p3.x == p2.x && p3.y == p2.y) || 
// 		(p1.x == p3.x && p1.y == p3.y) ) return 0;
// 	// allineati
// 	if(p1.x == p2.x && p2.x == p3.x) return 0;
// 	if(p1.y == p2.x && p2.y == p3.y) return 0;
// 	// rettangoli
// 	if(p1.x == p2.x) {
// 		if(p3.y == p1.y || p3.y == p2.y) {
// 			let dis = p1.x - p2.x;
// 			if( p1.y - p3.y == dis ||
// 				p3.y - p1.y == dis ||
// 				p2.y - p3.y == dis ||
// 				p3.y - p2.y == dis ) return 1;
// 		}
// 		return 0;
// 	}
// 	if(p2.x == p3.x) {
// 		if(p1.y == p2.y || p1.y == p3.y) {
// 			let dis = p2.x - p3.x;
// 			if( p2.y - p1.y == dis ||
// 				p1.y - p2.y == dis ||
// 				p3.y - p1.y == dis ||
// 				p1.y - p3.y == dis ) return 1;
// 		}
// 		return 0;
// 	}
// 	if(p3.x == p1.x) {
// 		if(p2.y == p3.y || p2.y == p1.y) {
// 			let dis = p3.x - p1.x;
// 			if( p3.y - p2.y == dis ||
// 				p2.y - p3.y == dis ||
// 				p1.y - p2.y == dis ||
// 				p2.y - p1.y == dis ) return 1;
// 		}
// 		return 0;
// 	}
// 	return 0;
// }

var controllaTriangolo = function(p1,p2,p3) {
		// punto ripetuto
	if( (p1.x == p2.x && p1.y == p2.y) ||
		(p3.x == p2.x && p3.y == p2.y) || 
		(p1.x == p3.x && p1.y == p3.y) ) return 0;
	// allineati
	if(p1.x == p2.x && p2.x == p3.x) return 0;
	if(p1.y == p2.x && p2.y == p3.y) return 0;

	let v1 = createVector(p1.x-p2.x,p1.y-p2.y);
	let v2 = createVector(p2.x-p3.x,p2.y-p3.y);
	let v3 = createVector(p3.x-p1.x,p3.y-p1.y);

	if(p5.Vector.dot(v1,v2) == 0) {
		if(round(v1.mag() * 1000) == round(v2.mag() *1000) ) return 1;
		// if(v1.mag() == v2.mag()) return 1;
		return 0;
	}
	if(p5.Vector.dot(v2,v3) == 0) {
		if(round(v2.mag() * 1000) == round(v3.mag() *1000) ) return 1;
		// if(v2.mag() == v3.mag()) return 1;
		return 0;
	}
	if(p5.Vector.dot(v3,v1) == 0) {
		if(round(v3.mag() * 1000) == round(v1.mag() *1000) ) return 1;
		// if(v3.mag() == v1.mag()) return 1;
		return 0;
	}

	return 0;

}

// var controllaTriangolo = function(p1,p2,p3) {

// 	// punto ripetuto
// 	if( (p1.x == p2.x && p1.y == p2.y) ||
// 		(p3.x == p2.x && p3.y == p2.y) || 
// 		(p1.x == p3.x && p1.y == p3.y) ) return 0;

// 	// rettangoli
// 	let dis = p1.x - p2.x;
// 	if( p1.y - p3.y == dis ||
// 		p3.y - p1.y == dis ||
// 		p2.y - p3.y == dis ||
// 		p3.y - p2.y == dis ) return 1;
	
// 	return 0;

// }

mostraTriangolo = function(p1,p2,p3) {
	stroke(255);
	line(p1.x,p1.y,p2.x,p2.y);
	line(p1.x,p1.y,p3.x,p3.y);
	line(p3.x,p3.y,p2.x,p2.y);
}


class Punto {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.dim = 5;
	}
	mostra() {
		ellipse(this.x,this.y,this.dim);

	}
}


