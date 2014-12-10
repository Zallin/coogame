var map = [
	'XXEXXX',
	'XB   X',
	'X    E',
	'X    X',
	'XX B X',
	' XXXXX'
];

function Level(m){
	this.map = map;

	var w = m[0].length;

	for(var i = 1; i < m.length; i++){
		if(m[i].length > w) w = m[i].length;
	}	

	this.width = w;

	this.height = m.length;

	this.update = function(x, y, dx, dy, n){
		var lx = x - 0.2*width;
		var ly = y - 0.2*width;

		var le = Math.floor(ly / (width * 0.6 / level.width));
		var ce = Math.floor(lx / (width * 0.6 / level.width));

		var ls = le;
		var cs = ce;

		dx *= -1;
		dy *= -1;

		while(true){
			ls += dy;
			cs += dx;
			if(level.map[ls][cs] !== ' ') break;
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
				return;
			}
		}

		this.map[ls] = this.map[ls].replaceAt(cs, ' ');
		this.map[le] = this.map[le].replaceAt(ce, 'B');
	}
}

var level = new Level(map);

String.prototype.replaceAt = function(index, character){
	return this.substr(0, index) + character + this.substr(index + character.length);
}