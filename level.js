var levels = [

	[	
		'XXEXXX',
		'XB   X',
		'X    E',
		'X    X',
		'XX B X',
		' XXXXX'
	],

	[
		'    XXXXX',
		'   XX   X',
		'  XX BB X',
		' XX     E',
		'XX      X',
		'X       X',
		'X       X',
		'X      BX',
		'XXEXXEXXX'
	]
];

function Level(m){
	this.map = m;

	var w = m[0].length;

	for(var i = 1; i < m.length; i++){
		if(m[i].length > w) w = m[i].length;
	}	

	this.width = w;

	this.height = m.length;

	this.update = function(x, y, dx, dy, n, ps){
		var lx = x - S.offsetX;
		var ly = y - S.offsetY;

		var le = Math.floor(ly / ps);
		var ce = Math.floor(lx / ps);

		var ls = le;
		var cs = ce;

		dx *= -1;
		dy *= -1;

		while(true){
			ls += dy;
			cs += dx;
			if(this.map[ls][cs] !== ' ') break;
		}

		if(this.map[le + dy*-1][ce + dx*-1] == 'E'){
			if(this.map[le][ce] == 'B'){
				ls = le;
				cs = ce;
			}
			var ep = (ce + dx*-1) + (le + dy*-1)*this.width;
			var eid = this.map.join('').slice(0, ep + 1).match(/E/g).length - 1;
			if(exits.map[eid].id == balls.map[n].id){
				balls.map.splice(n, 1);
				this.map[ls] = this.map[ls].replaceAt(cs, ' ');
				if(!balls.map.length){
					var n = parseInt(localStorage.getItem("next")) + 1;
					if(levels[n]){
						localStorage.setItem("next", n);
						level = new Level(levels[n]);
						S = new Settings(width, height);
						initLevel();
						pieces = initPieces(sprite, scale);
					}
					else{
						//the game is finished
						currentState = states.Menu;
					}
				}
				return;
			}
		}

		this.map[ls] = this.map[ls].replaceAt(cs, ' ');
		this.map[le] = this.map[le].replaceAt(ce, 'B');
	}
}

String.prototype.replaceAt = function(index, character){
	return this.substr(0, index) + character + this.substr(index + character.length);
}