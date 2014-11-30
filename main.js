var cns,
	ctx,
	width,
	height,
	scale,
	sprite,
	pieces,
	sweep = false;

function main(){
	width = window.innerWidth;
	height = window.innerHeight;
	scale = 1;

	cns = document.createElement('canvas');
	cns.width = window.innerWidth;
	cns.height = window.innerHeight;

	document.body.appendChild(cns);

	ctx = cns.getContext('2d');
	ctx.fillStyle = "#fff";

	sprite = new Image();
	sprite.src = 'img/sprite.png';

	sprite.onload = function () {
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
	ctx.fillRect(0, 0, width, height);
	balls.draw();
}

function addListener(){
	var pressed = false, range = [], n;

	cns.addEventListener('mousedown', function(){
		pressed = true;
	});

	cns.addEventListener('mouseup', function(){
		pressed = false;

		if(n !== null){
			var dir = balls.map[n].dir;
			var m = Math.floor(range.length/2);
			var l = range.length - 1;

			if(dir === 'up'){
				if(range[l].y > range[m].y) balls.map[n].state = 'unshift';
			}
			if(dir === 'down'){
				if(range[l].y < range[m].y) balls.map[n].state = 'unshift';
			}
			if(dir === 'left'){
				if(range[l].x > range[m].x) balls.map[n].state = 'unshift';
			}
			if(dir === 'right'){
				if(range[l].x < range[m].x) balls.map[n].state = 'unshift';
			}
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

				if(dx <= 10){
					if(range[0].y < range[range.length - 1].y) balls.map[n].dir = 'down';
					else{
						balls.map[n].dir = 'up';
					}
				}
				else{
					if(range[0].x < range[range.length - 1].x) balls.map[n].dir = 'right';
					else balls.map[n].dir = 'left';
				}

				balls.map[n].state = 'shift';
			}
		}
	});
}

var balls = {
	map : [{x : 100, y : 100, state : 'static'}],
	
	update : (function(){
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
				}
				if(b.state === 'unshift'){
					if(count < 11){
						if(b.dir === 'down') b.y--;
						if(b.dir === 'up') b.y++;
						if(b.dir === 'left') b.x++;
						if(b.dir === 'right') b.x--;

						count++;
					}
					else {
						b.state = 'static';
					}
				}
			}
		}
	})(),

	draw : function(){
		for(var i = 0; i < this.map.length; i++){
			pieces.ball[i].draw(ctx, this.map[i].x, this.map[i].y);
		}
	}
}

main();