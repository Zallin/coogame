function Piece(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Piece.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width*this.scale, this.height*this.scale);
};


function initPieces(img, scale){

	Piece.prototype.img = img;
	Piece.prototype.scale = scale;

	return {
		border : new Piece(1, 0, 75, 75),

		box: [
			new Piece(76, 0, 75, 75),
			new Piece(151, 0, 75, 75),
			new Piece(226, 0, 75, 75),
			new Piece(300, 0, 75, 75)
		],

		ball : [
			new Piece(450, 0, 75, 75),
			new Piece(525, 0, 75, 75),
			new Piece(600, 0, 75, 75),
			new Piece(375, 0, 75, 75)
		]
	}
}
