function Settings(w, h){
	this.fieldSize = w*0.8;
	this.pieceSize = this.fieldSize / level.width;
	this.offsetX = 0.1*w;
	this.offsetY = (h - this.fieldSize)/2;

	this.spriteSize = 75;
}