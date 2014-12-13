var cns,
	ctx,
	width,
	height,
	scale,
	sprite,
	pieces,
	balls,
	bg,
	exits,
	menu,
	level,
	states = {
		Menu : 0,
		Levels : 1,
		Game : 2
	},
	currentState,
	S;

function main(){
	width = window.innerWidth;
	height = window.innerHeight;
	if(width > 414 && height > 736){
		width = 600;
		height = 600;
	}

	cns = document.createElement('canvas');

	cns.width = width;
	cns.height = height;

	document.body.appendChild(cns);

	ctx = cns.getContext('2d');
	ctx.fillStyle = "#fff";

	sprite = new Image();
	sprite.src = 'img/sprite.png';

	sprite.onload = function () {
		level = new Level(map);
		S = new Settings(width, height);
		initLevel();
		pieces = initPieces(this, scale);
		initMenu();
		addListener();
		currentState = states.Menu;
		run();
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
	if(currentState == states.Game) balls.update();
}

function render(){
	if(currentState == states.Game){
		bg.draw();
		exits.draw();
		balls.draw();
	}
	else if(currentState == states.Menu){
		menu.draw();
	}
}

function addListener(){
	var pressed = false, range = [], n = null;

	cns.addEventListener('mousedown', function(e){
		if(currentState == states.Menu){
			for(var i = 1; i < menu.map.length; i++){
				var x = menu.map[i].x;
				var y = menu.map[i].y;

				var p1 = Math.min(Math.max(e.offsetX, x), x + pieces.menu[i].width);
				var p2 = Math.min(Math.max(e.offsetY, y), y + pieces.menu[i].height);

				if(p1 == e.offsetX && p2 == e.offsetY){
					if(i == 1) currentState = states.Game;
				}
			}
		}
		pressed = true;
	});

	cns.addEventListener('mouseup', function(){
		pressed = false;

		if(n !== null){
			var b = balls.map[n];
			var m = Math.floor(range.length/2);
 			var l = range.length - 1;

			var state = 'move';

			if(b.dx > 0 && range[l].x < range[m].x ||
				b.dx < 0 && range[l].x > range[m].x ||
				b.dy > 0 && range[l].y < range[m].y ||
				b.dy < 0 && range[l].y > range[m].y) state = 'unshift';

			if(state == 'move') b.left = countDistance(b.x, b.y, b.dx, b.dy);
			b.state = state;
			n = null;
		}
		range = [];
	});

	cns.addEventListener('mousemove', function(e){
		if(pressed){
			range.push({x : e.offsetX, y : e.offsetY});
			if(range.length === 12){
				var fx = range[0].x;
				var fy = range[0].y;

				var inside;

				for(var i = 0; i < balls.map.length; i++){
					var bx = balls.map[i].x;
					var by = balls.map[i].y;

					var p1 = Math.min(Math.max(fx, bx), bx + S.spriteSize*scale);
					var p2 = Math.min(Math.max(fy, by), by + S.spriteSize*scale);

					if(p1 == fx && p2 == fy) {
						n = i;
						inside = true;
						break;
					};
				}

				if(!inside){
					n = null;
					return;
				}

				var sx = 0, sy = 0;

				range.forEach(function(e){
					sx += e.x;
					sy += e.y;
				});

				sx /= range.length;
				sy /= range.length;

				var dx = Math.abs(fx - sx);
				var dy = Math.abs(fy - sy);

				if(dx > 10 && dy > 10){
					n = null;
					return;
				}

				var l = Math.floor((balls.map[n].y - S.offsetY)/S.pieceSize);
				var c = Math.floor((balls.map[n].x - S.offsetX)/S.pieceSize);

				if(dx <= 10){
					if(range[0].y < range[range.length - 1].y){
						if(level.map[l + 1][c] == 'X' || level.map[l + 1][c] == 'B') {
							n = null;
							return;
						};
						balls.map[n].dx = 0;
						balls.map[n].dy = 1;
					}
					else{
						if(level.map[l - 1][c] == 'X' || level.map[l - 1][c] == 'B'){
							n = null;
							return;
						};
						balls.map[n].dx = 0;
						balls.map[n].dy = -1;
					}
				}
				else{
					if(range[0].x < range[range.length - 1].x){
						if(level.map[l][c + 1] == 'X' || level.map[l][c + 1] == 'B'){
							n = null;
							return;
						}
						balls.map[n].dx = 1
						balls.map[n].dy = 0;
					}
					else{
						if(level.map[l][c - 1] == 'X' || level.map[l][c - 1] == 'B'){	
							n = null;
							return;
						}
						balls.map[n].dx = -1;
						balls.map[n].dy = 0;
					} 
				}		

				balls.map[n].state = 'shift';
			}
		}
	});
}

function Balls(hash){
	this.map = hash;

	this.update = function(){
		for(var i = 0; i < this.map.length; i++){
			var b = this.map[i];

			var lx = b.x - S.offsetX;
			var ly = b.y - S.offsetY;

			var l = Math.ceil(ly / S.pieceSize);
			var c = Math.ceil(lx / S.pieceSize);

			if(b.state === 'shift'){
				if( ((ly%S.pieceSize)*Math.abs(b.dy)||(lx%S.pieceSize)*Math.abs(b.dx)) < 0.1*S.pieceSize || 
				((ly%S.pieceSize)*Math.abs(b.dy)|| (lx%S.pieceSize)*Math.abs(b.dx)) > 0.9*S.pieceSize) {
					b.x += b.dx;
					b.y += b.dy;
				}
				else{
					b.state = 'static';
				}
			}
			if(b.state === 'unshift'){
				if(((ly%S.pieceSize)*Math.abs(b.dy)||(lx%S.pieceSize)*Math.abs(b.dx)) !== 0){
					b.x -= b.dx;
					b.y -= b.dy;
				}
				else {
					b.state = 'static';
				}
			}
			if(b.state === 'move'){
				if(b.left < 9){
					b.x += b.left*b.dx;
					b.y += b.left*b.dy;
					b.state = 'static';
					level.update(b.x, b.y, b.dx, b.dy, i);
					return;
				}
				b.x += b.dx*9;
				b.y += b.dy*9;
				b.left -= 9;
			}
		}
	}

	this.draw = function(){
		for(var i = 0; i < this.map.length; i++){
			pieces.ball[this.map[i].id].draw(ctx, this.map[i].x, this.map[i].y);
		}
	}
}

function Background(hash){
	this.map = hash;

	this.draw = function(){
		ctx.fillRect(0, 0, width, height);
		for(var i = 0; i < this.map.length; i++){
			pieces.border.draw(ctx, this.map[i].x, this.map[i].y);
		}
	}
}

function Exit(hash){
	this.map = hash;

	this.draw = function(){
		for(var i = 0; i < this.map.length; i++){
			pieces.box[this.map[i].id].draw(ctx, this.map[i].x, this.map[i].y);
		}
	}
}

function Menu(hash){
	this.map = hash;

	this.draw = function(){
		ctx.fillRect(0, 0, width, height);
		for(var i = 0; i < this.map.length; i++){
			pieces.menu[i].draw(ctx, this.map[i].x, this.map[i].y);
		}
	}
}

function countDistance(x, y, dx, dy){
	var lx = x - S.offsetX;
	var ly = y - S.offsetY;

	var l, c;

	if(dx > 0 || dx == 0) c = Math.floor(lx / S.pieceSize);
	if(dx < 0) c = Math.ceil(lx / S.pieceSize);
	if(dy > 0 || dy == 0) l = Math.floor(ly / S.pieceSize);
	if(dy < 0) l = Math.ceil(ly / S.pieceSize);

	while(true){
		l += dy;
		c += dx;
		if(level.map[l][c] !== ' ') break;
	}

	var cx = S.pieceSize * c;
	var cy = S.pieceSize * l;

	return (Math.abs((cx - lx)*dx) || Math.abs((cy - ly)*dy)) - S.pieceSize;
}

function initLevel(){
	scale = S.pieceSize/S.spriteSize;;

	var initx = width - (S.fieldSize + S.offsetX);
	var inity = height - (S.fieldSize + S.offsetY);

	var cx = initx;

	var bgHash = [], ballsHash = [], exitHash = [];

	for(var i = 0; i < level.height; i++){
		for(var p = 0; p < level.width; p++){
			var c = level.map[i][p];
			if(c === 'X') bgHash.push({x : cx, y : inity});
			if(c === 'B') ballsHash.push({x : cx, y : inity, id : ballsHash.length});
			if(c === 'E') exitHash.push({x : cx, y : inity, id : exitHash.length});
			cx+= S.pieceSize;
		}
		cx = initx;
		inity += S.pieceSize;
	}

	balls = new Balls(ballsHash);
	bg = new Background(bgHash);
	exits = new Exit(exitHash);
}

function initMenu(){
	var menuHash = [];
	for(var i = 0; i < pieces.menu.length; i++){
		var p = pieces.menu[i];
		menuHash.push({x : width/2 - p.width/2, y : 0.2*height + i*height*0.2}); 
	}
	menu = new Menu(menuHash);
}

main();