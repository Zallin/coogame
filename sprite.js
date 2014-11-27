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
		arleft : new Piece(0, 0, 67, 75),

		arright : new Piece(67, 0, 67, 75),

		arup : new Piece(134, 0, 32, 75),

		ardown : new Piece(166, 0, 32, 75),

		border : new Piece(201, 0, 75, 75),

		box: [
			new Piece(501, 0, 75, 75),
			new Piece(276, 0, 75, 75),
			new Piece(351, 0, 75, 75),
			new Piece(426, 0, 75, 75)
		],

		ball : [
			new Piece(576, 0, 75, 75),
			new Piece(651, 0, 75, 75),
			new Piece(726, 0, 75, 75),
			new Piece(801, 0, 75, 75)
		]
	}
}
