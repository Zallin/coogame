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

	this.update = function(x, y, dx, dy){
		var lx = x - 0.2*width;
		var ly = y - 0.2*width;

		var ls = Math.floor(ly / (width * 0.6 / level.width));
		var cs = Math.floor(lx / (width * 0.6 / level.width));

		var l = ls;
		var c = cs;

		dx *= -1;
		dy *= -1;

		while(true){
			l += dy;
			c += dx;
			if(level.map[l][c] !== ' ') break;
		}

		this.map[ls] = this.map[ls].replaceAt(cs, 'B');
		this.map[l] = this.map[l].replaceAt(c, ' ');
	}
}

var level = new Level(map);

String.prototype.replaceAt = function(index, character){
	return this.substr(0, index) + character + this.substr(index + character.length);
}