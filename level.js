var levels = [

	{
		balls : [{row : 1, col : 1, id : 0}, {row : 4, col : 3, id : 1}],
		walls : [
					"XX0XXX",
					"X    X",
					"X    1",
					"X    X",
					"XX   X",
					" XXXXX"
				],
		width : 6
	},

	{
		balls : [{row : 2, col : 5, id : 0}, {row : 2, col : 6, id : 1}, {row : 5, col : 4, id : 2}],
		walls : [
					"    XXXXX",
					"   XX   X",
					"  XX    X",
					" XX     0",
					"XX      X",
					"X       X",
					"X       X",
					"X       X",
					"XX1XX2XXX"
				],
		width : 9
	},

	{
		balls : [{row : 2, col : 2, id : 0}, {row : 3, col : 2, id : 0}, {row : 5, col : 5, id : 1}, {row : 7, col : 4, id : 1}],
		walls : [
					"XXXX1XXX",
					"X      X",
					"X      X",
					"X      X",
					"0      XX",
					"X       X",
					"X       X",
					"X       X",
					"X  X  XXX",
					"XXXXXXX"
				],
		width : 9
	},

	{
		balls : [{row : 1, col : 4, id : 0}, {row : 2, col : 6, id : 0}, {row : 2, col : 2, id : 1}, {row : 3, col : 1, id : 2}],
		walls : [
					" XXXX1XX",
					"XX     XX",
					"X       X",
					"X       X",
					"X       0",
					"X       X",
					"X       X",
					"XX     XX",
					" XXX2XXX"
				],
		width : 9
	},

	{
		balls : [{row : 1, col : 3, id : 0}, {row : 4, col : 5, id : 1}, {row : 7, col : 5, id : 2}],
		walls : [
					"  XXXX  ",
					"  X  X  ",
					"XXX  XXX",
					"X      0",
					"2      X",
					"X      X",
					"X      X",
					"1      X",
					"X      X",
					"XXX  XXX",
					"  X  X  ",
					"  XXXX  "
				],
		width : 8
	},

	{
		balls : [{row : 1, col : 4, id : 0}, {row : 3, col : 6, id : 1}, {row : 4, col : 1, id : 2}, {row : 6, col : 3, id :3}],
		walls : [
					"  X2XX  ",
					"  X  X  ",
					"XXX  XXX",
					"0      X",
					"X      3",
					"XXX  XXX",
					"  X  X  ",
					"  XX1X  "
				],
		width : 8
	},

	{
		balls : [{row : 1, col : 1, id : 0}, {row : 3, col : 1, id : 1}, {row : 9, col : 1, id : 2}, {row : 11, col : 1, id : 3}],
		walls : [
					"XXX0XXXX",
					"X      X",
					"X      X",
					"X      X",
					"XXX    X",
					"  X    X",
					"  1    2",
					"  X    X",
					"XXX    X",
					"X      X",
					"X      X",
					"X      X",
					"XXXX3XXX"
				],
		width : 8
	},

	{
		balls : [{row : 1, col : 5, id : 0}, {row : 4, col : 7, id : 1}, {row : 7, col : 5, id : 2}, {row : 8, col : 10, id : 3}, 
				{row : 10, col : 2, id : 2}],
		walls : [
					"XXXXXX3XXXXX",
					"X          X",
					"X          X",
					"2         XX",
					"X          X",
					"X  X       X",
					"X X        X",
					"X          0",
					"X          X",
					"X  X       X",
					"X          X",
					"XXXXX1XXXXXX"
				],
		width : 12
	},

	{
		balls : [{row : 4, col : 1, id : 0}, {row : 4, col : 5, id : 1}, {row : 8, col :3, id : 2}, 
				{row : 8, col : 11, id : 0}, {row : 9, col : 7, id : 1}, {row : 10, col : 10, id : 2}],
		walls : [
					"XXXXXXXXXXXXX",
					"XX1X X X X2XX",
					"X           X",
					"XX         XX",
					"X           X",
					"XX         XX",
					"X           X",
					"XX         XX",
					"X           X",
					"XX         XX",
					"X          XX",
					"XXXXXX X0X XX",
					"XXXXXXXXXXXXX"
				],
		width : 13
	},

	{
		balls : [{row : 1, col : 1, id : 0}, {row : 1, col : 3, id : 1}, {row : 9, col : 2, id : 2}, {row : 11, col : 7, id : 3}],
		walls : [
					"XXX0XXXXXXXXX",
					"X          XX",
					"X   3       X",
					"X X X X     X",
					"X X X X X   X",
					"X X X X X   X",
					"X X X X X   X",
					"X   X X X   X",
					"X     2     X",
					"X           X",
					"X           X",
					"X           X",
					"XXXXXXXX1XXXX"
				],
		width: 12
	},

	{
		balls : [{row : 5, col : 3, id : 0}, {row : 5, col : 9, id : 1}, {row : 7, col : 4, id : 0}, {row : 7, col : 8, id : 1},
				{row : 8, col : 5, id : 2}, {row : 8, col : 7, id : 2}],
		walls : [
					"XXXXXXXXXXXXX",
					"XX         XX",
					"X     X     X",
					"X   1 X 0   X",
					"X     X     X",
					"X X   X   X X",
					"X X   X   X X",
					"X X   X   X X",
					"X XXX X XXX X",
					"X XXXXXXXXX X",
					"X     2     X",
					"X           X",
					"XXXXXXXXXXXXX"
				],
		width : 13
	},

	{
		balls : [{row : 1, col : 4, id : 0}, {row : 1, col : 8, id : 1}, {row : 4, col : 1, id : 2}, {row : 4, col : 11, id : 3}, 
				{row : 8, col: 1, id : 1}, {row : 8, col : 11, id : 0}, {row : 11, col : 4, id : 3}, {row : 11, col : 8, id : 2}],
		walls : [
					"XXXXXXXXXXXXX",
					"XXXX     XXXX",
					"XXXX     XXXX",
					"XXX       XXX",
					"X           X",
					"X    XX2    X",
					"X    XXX    X",
					"X    0X1    X",
					"3           X",
					"XXX       XXX",
					"XXXX     XXXX",
					"XXXX     XXXX",
					"XXXXXXXXXXXXX"
				],
		width : 13
	}, 

	{
		balls : [{row : 1, col : 6, id : 0}, {row : 2, col : 1, id : 1}, {row : 8, col : 7, id : 2}, {row : 11, col : 2, id : 3}],
		walls : [
					"XXXXXXXXXXXXX",
					"X  X        X",
					"X XXXX      X",
					"X X     XX  X",
					"X X XX   X  X",
					"X   X       X",
					"1       X   X",
					"X      XX X X",
					"X  X      X X",
					"X  XX   XXX X",
					"X  3X   X2X X",
					"X           X",
					"XXX0XXXXXXXXX"
				],
		width : 13
	},

	{
		balls : [{row : 3, col : 2, id : 0}, {row : 6,  col : 2, id : 1}, {row : 7,  col : 3, id : 1}, {row : 8, col : 3, id : 2},
				{row : 9, col : 8, id : 0}, {row : 	11, col : 8, id : 2}],
		walls : [
					"XXXXXXXXXXXXX",
					"X           X",
					"X XX X   XX X",
					"X  X XX  XX X",
					"X  X X      X",
					"X       2X  X",
					"X   X    X1 X",
					"X X XX      X",
					"X X  X X    X",
					"X 0    X    X",
					"X X   XX    X",
					"X           X",
					"XXXXXXXXXXXXX"
				],

		width : 13
	},

	{
		balls : [{row : 2, col : 9, id : 0}, {row : 7, col : 7, id : 1}, {row : 8, col : 1, id : 2}],
		walls : [
					"XXXXXX0XXXXXX",
					"X           X",
					"X   XX XX   X",
					"X  X X X X  X",
					"X X  X X  X X",
					"X X XX XX X X",
					"X X  X X  X X",
					"X X X   X X 1",
					"X XX     XX 2",
					"X           X",
					"X    XXX    X",
					"X           X",
					"XXXXXXXXXXXXX"
				],
		width : 13
	},
	 
	{
		balls : [{row : 1, col : 2, id : 0}, {row : 1, col : 11, id: 1}, {row : 11, col : 1, id :2}],
		walls : [
					"XXXXXXXXXXXXX",
					"X           X",
					"X  0XXXXXXX X",
					"X         X X",
					"X  XXXXXX X X",
					"X  X    X X X",
					"X  X X2 X X X",
					"X  X X1 X X X",
					"X  X XXXX X X",
					"X  X      X X",
					"X  XXXXXXXX X",
					"X           X",
					"XXXXXXXXXXXXX"
				],
		width : 13
	},

	{
		balls : [{row : 1, col : 7, id : 0}, {row : 3, col : 7, id : 0}, {row : 6, col : 2, id : 1}, {row : 9, col : 2, id : 2},
		{row : 11, col : 2, id : 3}],
		walls : [
					"XXXXXXXXXX",
					"X       3X",
					"X XXXXXXXX",
					"X       2X",
					"X XXXXXXXX",
					"X XXXXXXX ",
					"X     1X  ",
					"X XXXXXXX ",
					"X XXXXXXXX",
					"X       0X",
					"X XXXXXXXX",
					"X       0X",
					"XXXXXXXXXX"

				],
		width : 10
	},

	{
		balls : [{row : 1, col : 3, id : 0}, {row : 1, col : 9, id : 1}, {row : 11, col : 1, id : 2}, {row : 11, col : 11, id : 3}],
		walls : [
					"XXXXXXXXXXXXX",
					"X           X",
					"XX1       2XX",
					"X    XXX    X",
					"X   X   X   X",
					"X  X     X  X",
					"X  X     X  X",
					"X  X     X  X",
					"X   X   X   X",
					"X    XXX    X",
					"XX3       0XX",
					"X           X",
					"XXXXXXXXXXXXX"
				],
		width : 13
	},

	{
		balls : [{row : 2, col : 3, id : 0}, {row : 4, col : 5, id : 1}, {row : 7, col : 2, id : 2}, {row : 11, col : 6, id : 0}],
		walls : [
					"XXXXXXXXXXXXX",
					"XX          X",
					"X X       X X",
					"X  1     X  X",
					"X   2   0   X",
					"X    X X    X",
					"X     X     X",
					"X     X     X",
					"X     X     X",
					"X   XXXXX   X",
					"X           X",
					"X           X",
					"XXXXXXXXXXXXX"
				],
		width : 13
	},

	{
		balls : [{row : 1, col : 1, id : 0}, {row : 1, col : 11, id : 1}, {row : 11, col : 11, id : 2}],
		walls : [
					"XXXXXXXXXXXXX",
					"X           X",
					"X   XXXX1   X",
					"2           X",
					"X  XXXXXXX  X",
					"X           X",
					"X X0XXXXXXX X",
					"X           X",
					"X  XXXXXXX  X",
					"X           X",
					"X   XXXXX   X",
					"X           X",
					"XXXXXXXXXXXXX"
				],
		width : 13
	},

	{
		balls : [{row : 6, col : 11, id : 0}, {row : 11, col : 10, id : 1}],
		walls : [
					"XXXXXXXXXXXXX",
					"XXX         X",
					"X XX        X",
					"X  XX       X",
					"X   XX      X",
					"X    XX     X",
					"X           X",
					"X      X1   X",
					"X       XX  X",
					"X        XX X",
					"X         XXX",
					"X          XX",
					"XXXXXXXXXX0XX"
				],
		width : 13
	},

	{
		balls : [{row : 4, col : 8, id : 0}, {row : 10, col : 8, id : 1}, {row : 11, col : 5, id : 2}, {row : 11, col : 11, id : 3}],
		walls : [
					"XXXXXXX1XXXXX",
					"X           X",
					"X           X",
					"X           X",
					"X           X",
					"3           X",
					"X           X",
					"X           X",
					"X           X",
					"X           X",
					"0           X",
					"X XXX   XXX X",
					"XXX XXX2X XXX"
				],

	 	width : 13
	}
];
