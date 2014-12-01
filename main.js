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
			balls.map[n].state = 'unshift';
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

				var l = Math.floor((balls.map[n].y - height*0.2)/((width*0.6)/level[0].length));
				var c = Math.floor((balls.map[n].x - width*0.2)/((width*0.6)/level[0].length));

				if(dx <= 10){
					if(range[0].y < range[range.length - 1].y){
						if(level[l + 1][c] !== ' ') return;
						balls.map[n].dir = 'down';
					}
					else{
						if(level[l - 1][c] !== ' ') return;
						balls.map[n].dir = 'up';
					}
				}
				else{
					if(range[0].x < range[range.length - 1].x){
						if(level[l][c + 1] !== ' ') return;
						balls.map[n].dir = 'right';
					}
					else{
						if(level[l][c - 1] !== ' ') return;
						balls.map[n].dir = 'left';
					} 
				}

				balls.map[n].state = 'shift';
			}
		}
	});
}


function checkMove(l, c){
	return {
		'down' : level[l + 1][c] === ' ',
		'up' : level[l - 1][c] === ' ',
		'right' : level[l][c + 1] === ' ',
		'left' : level[l][c - 1] === ' '
	}
}

function Balls(hash){
	this.map = [];
	for(var i in hash){
		hash[i].state = 'static';
		this.map.push(hash[i]);
	}

	this.update = (function(){
		var count = 10;

		return function(){
			for(var i = 0; i < this.map.length; i++){
				var b = this.map[i];

				if(b.state === 'shift'){
					if(count > 0){
						if(b.dir === 'down') b.y++;
						if(b.dir === 'up') b.y--;
						if(b.dir === 'left') b.x--;
						if(b.dir === 'right') b.x++;

						count--;
					}
					else{
						count = 10;
						b.state = 'static';
					}			
				}
				if(b.state === 'unshift'){
					if(count > 0){
						if(b.dir === 'down') b.y--;
						if(b.dir === 'up') b.y++;
						if(b.dir === 'left') b.x++;
						if(b.dir === 'right') b.x--;

						count--;
					}
					else {
						count = 10;
						b.state = 'move';
					}
				}
				if(b.state === 'move'){
					var l = Math.floor((b.y - height*0.2)/((width*0.6)/level[0].length));
					var c = Math.floor((b.x - width*0.2)/((width*0.6)/level[0].length));

					if(checkMove(l, c)[b.dir]){
						if(b.dir === 'down')b.y+=5;
						if(b.dir === 'up') b.y-=5;
						if(b.dir === 'left') b.x-=5;
						if(b.dir === 'right') b.x+=5;
					}
					else{
						b.state = 'static';
					}
				}
			}
		}
	})();

	this.draw = function(){
		for(var i = 0; i < this.map.length; i++){
			pieces.ball[i].draw(ctx, this.map[i].x, this.map[i].y);
		}
	}
}

function Background(hash){
	this.map = [];
	for(var i in hash){
		this.map.push(hash[i]);
	}

	this.draw = function(){
		ctx.fillRect(0, 0, width, height);
		for(var i = 0; i < this.map.length; i++){
			pieces.border.draw(ctx, this.map[i].x, this.map[i].y);
		}
	}
}

function Exit(hash){
	this.map = [];
	for(var i in hash){
		this.map.push(hash[i]);
	}

	this.draw = function(){
		for(var i = 0; i < this.map.length; i++){
			pieces.box[i].draw(ctx, this.map[i].x, this.map[i].y);
		}
	}
}

function generateLevel(){
	scale = (width*0.6/level[0].length)/75;

	var initx = width - width*0.8;
	var inity = height - height*0.8;

	var cx = initx;

	var bgHash = [], ballsHash = [], exitHash = [];

	for(var i = 0; i < level.length; i++){
		for(var p = 0; p < level[i].length; p++){
			var c = level[i][p];
			if(c === 'X') bgHash.push({x : cx, y : inity});
			if(c === 'B') ballsHash.push({x : cx, y : inity});
			if(c === 'E') exitHash.push({x : cx, y : inity});
			cx+= (width*0.6)/level[0].length;
		}
		cx = initx;
		inity += (width*0.6)/level[0].length;
	}

	balls = new Balls(ballsHash);
	bg = new Background(bgHash);
	exits = new Exit(exitHash);
}
main();