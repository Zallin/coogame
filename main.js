var cns,
	ctx,
	width,
	height,
	scale,
	sprite,
	pieces,
	balls,
	bg,
	exits;

function main(){
	width = window.innerWidth;
	height = window.innerHeight;
	if(width > 600){
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
		generateLevel();
		pieces = initPieces(this, scale);
		addListener();
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
	balls.update();
}

function render(){
	bg.draw();
	exits.draw();
	balls.draw();
}

function addListener(){
	var pressed = false, range = [], n = null;

	cns.addEventListener('mousedown', function(){
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
			range.push({x : e.pageX, y : e.pageY});
			if(range.length === 12){
				var fx = range[0].x;
				var fy = range[0].y;

				var inside;

				for(var i = 0; i < balls.map.length; i++){
					var bx = balls.map[i].x;
					var by = balls.map[i].y;

					var p1 = Math.min(Math.max(fx, bx), bx + 75*scale);
					var p2 = Math.min(Math.max(fy, by), by + 75*scale);

					if(p1 == fx && p2 == fy) {
						n = i;
						inside = true;
						break;
					};
				}

				if(!inside) return;

				var sx = 0, sy = 0;

				range.forEach(function(e){
					sx += e.x;
					sy += e.y;
				});

				sx /= range.length;
				sy /= range.length;

				var dx = Math.abs(fx - sx);
				var dy = Math.abs(fy - sy);

				if(dx > 10 && dy > 10) return;

				var l = Math.floor((balls.map[n].y - height*0.2)/((width*0.6)/level.width));
				var c = Math.floor((balls.map[n].x - width*0.2)/((width*0.6)/level.width));


				if(dx <= 10){
					if(range[0].y < range[range.length - 1].y){
						if(level.map[l + 1][c] !== ' ') {
							n = null;
							return;
						};
						balls.map[n].dx = 0;
						balls.map[n].dy = 1;
					}
					else{
						if(level.map[l - 1][c] !== ' '){
							n = null;
							return;
						};
						balls.map[n].dx = 0;
						balls.map[n].dy = -1;
					}
				}
				else{
					if(range[0].x < range[range.length - 1].x){
						if(level.map[l][c + 1] !== ' '){
							n = null;
							return;
						}
						balls.map[n].dx = 1
						balls.map[n].dy = 0;
					}
					else{
						if(level.map[l][c - 1] !== ' '){
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

			var lx = b.x - width*0.2;
			var ly = b.y - height*0.2;
			var size = width*0.6/level.width;

			var l = Math.ceil(ly / size);
			var c = Math.ceil(lx / size);

			if(b.state === 'shift'){
				if( ((ly%size)*Math.abs(b.dy)||(lx%size)*Math.abs(b.dx)) < 0.1*size || 
				((ly%size)*Math.abs(b.dy)|| (lx%size)*Math.abs(b.dx)) > 0.9*size) {
					b.x += b.dx;
					b.y += b.dy;
				}
				else{
					b.state = 'static';
				}
			}
			if(b.state === 'unshift'){
				if(((ly%size)*Math.abs(b.dy)||(lx%size)*Math.abs(b.dx)) !== 0){
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
					level.update(b.x, b.y, b.dx, b.dy);
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
			pieces.ball[i].draw(ctx, this.map[i].x, this.map[i].y);
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
			pieces.box[i].draw(ctx, this.map[i].x, this.map[i].y);
		}
	}
}

function countDistance(x, y, dx, dy){
	var lx = x - 0.2*width;
	var ly = y - 0.2*width;

	var l = Math.floor(ly / (width * 0.6 / level.width));
	var c = Math.floor(lx / (width * 0.6 / level.width));

	while(true){
		l += dy;
		c += dx;
		console.log(level.map);
		if(level.map[l][c] !== ' ') break;
	}

	var cx = (width * 0.6 / level.width) * c;
	var cy = (width * 0.6 / level.width) * l;

	return (Math.abs((cx - lx)*dx) || Math.abs((cy - ly)*dy)) - width * 0.6 / level.width;
}

function generateLevel(){
	scale = (width*0.6/level.width)/75;

	var initx = width - width*0.8;
	var inity = height - height*0.8;

	var cx = initx;

	var bgHash = [], ballsHash = [], exitHash = [];

	for(var i = 0; i < level.height; i++){
		for(var p = 0; p < level.width; p++){
			var c = level.map[i][p];
			if(c === 'X') bgHash.push({x : cx, y : inity});
			if(c === 'B') ballsHash.push({x : cx, y : inity});
			if(c === 'E') exitHash.push({x : cx, y : inity});
			cx+= (width*0.6)/level.width;
		}
		cx = initx;
		inity += (width*0.6)/level.width;
	}

	balls = new Balls(ballsHash);
	bg = new Background(bgHash);
	exits = new Exit(exitHash);
}
main();