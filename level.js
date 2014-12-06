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

	this.update = function(){

	}
}

var level = new Level(map);