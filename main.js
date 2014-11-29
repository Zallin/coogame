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
	scale = 0.5;

	cns = document.createElement('canvas');
	cns.width = window.innerWidth;
	cns.height = window.innerHeight;

	document.body.appendChild(cns);

	addListener();

	ctx = cns.getContext('2d');

	sprite = new Image();
	sprite.src = 'img/sprite.png';

	sprite.onload = function () {
		pieces = initPieces(this, scale);
		run();
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
	balls.draw();
	if(sweep) arrows.draw();
}

function addListener(){
	var pressed = false, evt = {
		range : []
	};

	cns.addEventListener('mousedown', function(){
		pressed = true;
	});

	cns.addEventListener('mouseup', function(){
		pressed = false;
		evt.range = [];
	});

	cns.addEventListener('mousemove', function(e){
		if(pressed){
			evt.range.push({x : e.pageX, y : e.pageY});
			if(evt.range.length === 10){
				var fx = evt.range[0].x;
				var fy = evt.range[0].y;

				for(var i = 0; i < balls.coordinates.length; i++){
					var bx = balls.coordinates[i].x;
					var by = balls.coordinates[i].y;

					var p1 = Math.min(Math.max(fx, bx), bx + 75*scale);
					var p2 = Math.min(Math.max(fy, by), by + 75*scale);

					if(p1 !== fx || p2 !== fy) return; 
					console.log('inside'); 
				}
			}
		}
	});
}

var arrows = {
	draw : function(){

	}
}

var balls = {
	coordinates : [{x : 100, y : 100}],

	draw : function(){
		pieces.ball[0].draw(ctx, this.coordinates[0].x, this.coordinates[0].y);
	}
}

main();