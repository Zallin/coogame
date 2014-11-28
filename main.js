var cns,
	ctx,
	width,
	height,
	scale,
	sprite,
	pieces;

function main(){
	width = window.innerWidth;
	height = window.innerHeight;
	var scale = ((width - 0.1 * width)/level.length)/75;

	cns = document.createElement('canvas');
	cns.width = window.innerWidth;
	cns.height = window.innerHeight;

	document.appendChild(cns);

	var evt = 'touchstart';
	if(width > 600) evt = 'mousedown';

	document.addEventListener(evt, onPress)

	ctx = cns.getContext('2d');

	sprite = new Image();
	sprite.src = 'img/sprite.png';

	sprite.onload = function () {
		pieces = initPieces(this, scale);
		//load level map
		//run the game
	}
}

function run(){
	var loop = function(){
		update();
		render();

		window.requestAnimationFrame(loop, cns);
	}
	window.requestAnimationFrame(loop, cns);
}


function update(){

}

function render(){

}

function attachEvent(){
	
}

function level(){

}