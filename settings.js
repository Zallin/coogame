function Settings(w, h, lw){
	this.fieldSize = parseInt((w*0.8).toPrecision(4));
	this.pieceSize = parseInt((this.fieldSize / lw).toPrecision(4));
	this.offsetX = 0.1*w;
	this.offsetY = (h - this.fieldSize)/2;

	this.spriteSize = 75;
}