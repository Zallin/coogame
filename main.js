	var	cns,
		ctx,
		sprite,
		elements,
		balls,
		menu = {},
		states = {
			Menu : 0,
			Rules : 1,
			Levels : 2,
			Game : 3
		},
		settings = {},
		currentState,
		currentLevel;

	function main(){
		settings.width = window.innerWidth;
		settings.height = window.innerHeight;

		cns = document.createElement('canvas');

		cns.width = settings.width;
		cns.height = settings.height;

		document.body.appendChild(cns);

		ctx = cns.getContext('2d');
		ctx.fillStyle = "#fff";
		ctx.font = '20px Georgia'

		sprite = new Image();
		sprite.src = 'img/sprite.png';

		var levelNumber = 0 | localStorage.getItem("current");
		if(!levelNumber){
			localStorage.setItem("current", 0);
		}
		currentLevel = levels[levelNumber];

		sprite.onload = function () {
			initLevel();
			menu.header = new Header();
			menu.button = new Button();
			addListeners();
			currentState = states.Menu;
			run();
		}
	}

	function initLevel(){
		settings.gameWorldSize = Math.floor(settings.width * 0.8);
		settings.elementSize = Math.floor(settings.gameWorldSize / currentLevel.width);
		settings.offsetX = Math.floor(0.1 * settings.width);
		settings.offsetY = Math.floor((settings.height - settings.elementSize * currentLevel.walls.length)/2);
		settings.spriteElementSize = 75;
		settings.fontSize = settings.offsetY / 5;
		if(settings.fontSize < 20) settings.fontSize = settings.offsetY / 3;
		ctx.font = settings.fontSize + 'px Georgia';
		var str = 'restart';
		settings.restartButtonWidth = ctx.measureText(str).width; 

		var scale = settings.elementSize / settings.spriteElementSize;

		balls = new Balls();
		walls = new Walls();
		elements = initSprite(sprite, scale);
	}

	function setNextLevel(){
		var n = (0 | localStorage.getItem("current")) + 1;
		if(levels[n]){
			localStorage.setItem("current", n);
			currentLevel = levels[n];
			initLevel();

		} else{
			localStorage.clear("current");
			currentState = states.Finish;
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
		if(currentState == states.Menu){
			menu.header.update();
			menu.button.update();
		}
	}

	function render(){
		if(currentState == states.Game){
			walls.draw();
			balls.draw();
			
			ctx.save();
			ctx.fillStyle = "#3498db";
			ctx.textAlign = 'center';
			ctx.fillText("restart", settings.width/2, settings.height - settings.offsetY/2);
			ctx.restore();
		}
		else if(currentState == states.Menu){
			ctx.fillRect(0, 0, settings.width, settings.height);
			menu.header.draw();
			menu.button.draw();

			ctx.save();
			ctx.fillStyle = "#7f8c8d";
			ctx.textAlign = 'center';
			ctx.font = '20px Georgia';
			ctx.fillText('The goal is simple:', settings.width/2, settings.height*0.6);
			ctx.fillText('Run each ball in the box of its color', settings.width/2, settings.height * 0.66);
			ctx.restore();
			
		}
		else if(currentState == states.Finish){
			ctx.fillRect(0, 0, settings.width, settings.height);
			ctx.save();
			ctx.fillStyle = "#3498db";
			ctx.textAlign = 'center';
			ctx.fillText('Congratulations!', settings.width/2, 200);
			ctx.fillStyle = "#7f8c8d";
			ctx.font = "20px Georgia";
			ctx.fillText('You finished Coogame', settings.width/2, 300);
			ctx.fillText('More levels will be added soon', settings.width/2,  400);
			ctx.restore();
		}
	}

	function Button(){
		this.x = settings.width/2 - (elements.button.width * elements.button.scale)/2;
		this.y = settings.height*0.4 - (elements.button.height * elements.button.scale)/2;

		this.frame = 0;
		this.animationFrame = 51;

		this.delay = 300;
		this.duration = 50;

		this.abs = function(x){
			return -Math.abs(x - 25)/30 + 10.82;
		}

		this.update = function(){
			this.frame++;
			if(this.frame % this.delay == 0){
				this.animationFrame = 0;
			}

			if(this.animationFrame / this.duration > 1) return;
			elements.button.scale = this.abs(++this.animationFrame)/10;
			this.x = settings.width/2 - (elements.button.width * elements.button.scale)/2;
		}

		this.draw = function(){
			elements.button.draw(ctx, this.x, this.y);
		}
	}

	function Header(){
		this.x = settings.width/2 - (elements.header.width * elements.header.scale)/2;
		this.y = 0;

		this.frame = 0;
		this.duration = 80;
		this.progress = 0;


		this.bounce = function(){
	  		for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
	  		  if (1 - this.progress >= (7 - 4 * a) / 11) {
	  		    return -Math.pow((11 - 6 * a - 11 * (1 - this.progress)) / 4, 2) + Math.pow(b, 2);
	  		  }
	  		}
		} 

		this.easeOut = function(){
			return 1 - this.bounce();
		}

		this.update = function(){
			this.progress = this.frame / this.duration;
			if(this.progress > 1) return;
			this.frame++;
			this.y = this.easeOut() * 100;
		}

		this.draw = function(){
			elements.header.draw(ctx, this.x, this.y);
		}
	}


	function addListeners(){
		var pressed = false, range = [], n = false;

		cns.addEventListener('touchstart', function(e){

			if(currentState == states.Menu){
				var x = menu.button.x;
				var y = menu.button.y;

				var p1 = Math.min(Math.max(e.changedTouches[0].pageX, x), x + elements.button.width);
				var p2 = Math.min(Math.max(e.changedTouches[0].pageY, y), y + elements.button.height);

				if(p1 == e.changedTouches[0].pageX && p2 == e.changedTouches[0].pageY){
					currentState = states.Game;
				}
			}
			else if(currentState == states.Game){
				var x = settings.width/2 - settings.restartButtonWidth/2;
				var y = settings.height - settings.offsetY/2 - settings.fontSize;

				var p1 = Math.min(Math.max(e.changedTouches[0].pageX, x), x + settings.restartButtonWidth);
				var p2 = Math.min(Math.max(e.changedTouches[0].pageY, y), y + settings.fontSize);

				if(p1 == e.changedTouches[0].pageX && p2 == e.changedTouches[0].pageY){
					initLevel();
				}
			}
			else if(currentState == states.Finish){
				currentState = states.Menu;
				initLevel();
			}
			pressed = true;
		});

		cns.addEventListener('touchend', function(){
			if (currentState !== states.Game) return;
			pressed = false;

			if(n !== false){
				var b = balls.pos[n];
				var m = Math.floor(range.length/2);
	 			var l = range.length - 1;

				var state = 'move';

				if(b.dx > 0 && range[l].x < range[m].x ||
					b.dx < 0 && range[l].x > range[m].x ||
					b.dy > 0 && range[l].y < range[m].y ||
					b.dy < 0 && range[l].y > range[m].y){
					state = 'unshift';
					b.spliceOnTouch = false;
				}	

				b.state = state;

				n = false;
			}

			range = [];
		});

		cns.addEventListener('touchmove', function(e){
			if(currentState !== states.Game) return;
			if(pressed){
				range.push({x : e.changedTouches[0].pageX, y : e.changedTouches[0].pageY});

				if(range.length === 8){
					var fx = range[0].x;
					var fy = range[0].y;

					var d, q = settings.elementSize/4;

					for(var i = 0; i < balls.pos.length; i++){
						var d1 = (fx - balls.pos[i].x - q) * (fx - balls.pos[i].x - q) + (fy - balls.pos[i].y - q) * (fy - balls.pos[i].y - q);
						if(!d || d1 < d){
							d = d1;
							n = i;
						} 
					}

					if(Math.sqrt(d) > settings.elementSize * 2){
						n = false;
						return;
					}

					var sx = 0, sy = 0;

					for(var i = 0; i < range.length; i++){
						sx += range[i].x;
						sy += range[i].y;
					}

					sx /= range.length;
					sy /= range.length;

					var dx = Math.abs(fx - sx);
					var dy = Math.abs(fy - sy);

					if(dx > 10 && dy > 10){
						n = false;
						return;
					}

					if(dx <= 10){
						if(range[0].y < range[range.length - 1].y){
							balls.pos[n].dx = 0;
							balls.pos[n].dy = 1;
						}
						else if(range[0].y > range[range.length - 1].y){
							balls.pos[n].dx = 0;
							balls.pos[n].dy = -1;
						}
						else{
							
						}
					}
					else{
						if(range[0].x < range[range.length - 1].x){
							balls.pos[n].dx = 1
							balls.pos[n].dy = 0;
						}
						else if(range[0].x > range[range.length - 1].x){
							balls.pos[n].dx = -1;
							balls.pos[n].dy = 0;
						} 
						else{
							
						}
					}

					balls.countDistance(n);
					if(!balls.pos[n] || !balls.pos[n].left){
						n = false;
					}
				}
			}
		});
	}

	function Balls(){
		this.pos = [];

		for(var i = 0; i < currentLevel.balls.length; i++){
			this.pos.push({x : settings.offsetX + currentLevel.balls[i].col * settings.elementSize, 
				y : settings.offsetY + currentLevel.balls[i].row * settings.elementSize, 
				ax : currentLevel.balls[i].col, ay: currentLevel.balls[i].row});
			if('id' in currentLevel.balls[i]) this.pos[i].id = currentLevel.balls[i].id;
		}

		this.velocity = 9;

		this.update = function(){
			for(var i = 0; i < this.pos.length; i++){
				var b = this.pos[i];

				var lx = b.x - settings.offsetX;
				var ly = b.y - settings.offsetY;

				if(b.state === 'shift'){
					if(((ly%settings.elementSize)*Math.abs(b.dy)||(lx%settings.elementSize)*Math.abs(b.dx)) < 0.1*settings.elementSize || 
					((ly%settings.elementSize)*Math.abs(b.dy)|| (lx%settings.elementSize)*Math.abs(b.dx)) > 0.9*settings.elementSize){
						b.x += b.dx;
						b.y += b.dy;
						b.left--;
					}
					else{
						b.state = 'static';
					}
				}
				if(b.state === 'unshift'){
					if(((ly % settings.elementSize) * Math.abs(b.dy) || (lx % settings.elementSize) * Math.abs(b.dx)) !== 0){
						b.x -= b.dx;
						b.y -= b.dy;
					}
					else {
						b.state = 'static';
						b.left = 0;
					}
				}
				if(b.state === 'move'){
					if(b.left < 9){
						b.x += b.left*b.dx;
						b.y += b.left*b.dy;
						b.state = 'static';
						b.left = 0;
						this.updatePositions(i);
						return;
					}
					b.x += b.dx*this.velocity;
					b.y += b.dy*this.velocity;
					b.left -= 9;
				}
			}
		}

		this.draw = function(){
			for(var i = 0; i < this.pos.length; i++){
				elements.balls[this.pos[i].id].draw(ctx, this.pos[i].x, this.pos[i].y);
			}
		}

		this.updatePositions = function(i){
			if(this.pos[i].spliceOnTouch){
				this.pos.splice(i, 1);
				if(this.pos.length == 0){
					setNextLevel();
				}
				return;
			}
			if(this.pos[i].dx) this.pos[i].ax = Math.ceil((this.pos[i].x - settings.offsetX) / settings.elementSize);
			else this.pos[i].ay = Math.ceil((this.pos[i].y - settings.offsetY) / settings.elementSize);
		},

		this.findObstacle = function(i){
			var jf, jp = - 1;

			for(var p = 0; p < currentLevel.walls.length; p++){
				for(var k = 0; k < currentLevel.walls[p].length; k++){
					if(currentLevel.walls[p][k] !== ' '){
						jp++;
						if(this.pos[i].dx > 0){
							if(p == this.pos[i].ay && k > this.pos[i].ax){
								return jp;
							}
						} else if(this.pos[i].dx < 0){
							if(p == this.pos[i].ay){
								if(k < this.pos[i].ax) jf = jp;
								else {
									return jf;
								}
							}
						} else if(this.pos[i].dy > 0){
							if(p > this.pos[i].ay && k == this.pos[i].ax){
								return jp;
							}
						} else if(this.pos[i].dy < 0){
							if(p < this.pos[i].ay && k == this.pos[i].ax){
								jf = jp;
							} else if(p == this.pos[i].ay){
								return jf;
							}
						}
					}
				}
			}
		}

		this.countDistance = function(i){
			var db = false;
			for(var p = 0; p < this.pos.length; p++){
				var dc;
				if(p == i) continue;
				if((this.pos[i].x == this.pos[p].x) * this.pos[i].dy || (this.pos[i].y == this.pos[p].y) * this.pos[i].dx){
					if(this.pos[i].x > this.pos[p].x && this.pos[i].dx < 0 || 
					   this.pos[i].x < this.pos[p].x && this.pos[i].dx > 0 ||			
					   this.pos[i].y > this.pos[p].y && this.pos[i].dy < 0 ||
					   this.pos[i].y < this.pos[p].y && this.pos[i].dy > 0){
						dc = (Math.abs((this.pos[i].x - this.pos[p].x) * this.pos[i].dx) || Math.abs((this.pos[i].y - this.pos[p].y) * this.pos[i].dy)) - settings.elementSize;
					}
				}
				if((typeof dc == "number" && db === false) || dc < db){
					db = dc;
				}
			}
			if(db === 0) return;

			var k = this.findObstacle(i);

			var dw = (Math.abs((this.pos[i].x - walls.pos[k].x)*this.pos[i].dx) || Math.abs((this.pos[i].y - walls.pos[k].y)*this.pos[i].dy)) - settings.elementSize;

			if(typeof db !== 'number' || dw < db){
				if('id' in walls.pos[k]){
					if(walls.pos[k].id == this.pos[i].id){
						this.pos[i].spliceOnTouch = true;
					} 
				}

				if(dw === 0){
					if(this.pos[i].spliceOnTouch){
						this.updatePositions(i);
					}
					return;
				}

				this.pos[i].left = dw;
			} else{
				this.pos[i].left = db;
			}
			this.pos[i].state = 'shift';
		}
	}

	function Walls(){
		this.pos = [];

		for(var i = 0; i < currentLevel.walls.length; i++){

			for(var k = 0; k < currentLevel.walls[i].length; k++){
				if(currentLevel.walls[i][k] !== ' '){
					this.pos.push({x : settings.offsetX + k * settings.elementSize,
					y : settings.offsetY + i * settings.elementSize
					});
					if(currentLevel.walls[i][k] !== "X" && currentLevel.walls[i][k] !== " "){
						this.pos[this.pos.length - 1].id = 0 | currentLevel.walls[i][k];
					} 
				}
			}

		}

		this.draw = function(){
			ctx.fillRect(0, 0, settings.width, settings.height);
			for(var i = 0; i < this.pos.length; i++){
				if('id' in this.pos[i]){
					elements.exits[this.pos[i].id].draw(ctx, this.pos[i].x, this.pos[i].y);
				}
				else{
					elements.wall.draw(ctx, this.pos[i].x, this.pos[i].y);
				}
			}
		}
	}

	main();