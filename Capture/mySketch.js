function setup() {
	//createAchtergrond(800, 400);
	createCanvas(1200, 600);

	//print(windowWidth/width + " " + windowHeight/height)

	background(254);
	//rectMode(CENTER);
	textAlign(CENTER)
	noStroke();
	textSize(32)
	w = 1920
	h = 919
	cx = w/2
	cy = h/2

	current = 0;

	makeMaps();
	map = map1;

	// Team kleur, movement, beginpositie
	teams = [color(255, 20, 20), color(35, 180, 255)];
	controls = [[87, 65, 83, 68],[UP_ARROW, LEFT_ARROW, DOWN_ARROW, RIGHT_ARROW]];
	starts = [[150, h/2], [w-150, h/2]];
	flagstarts = [[100, h/2], [w-100, h/2]];


	// Max snelheid
	maxSpeed = 10;
	speed = 0.7;

	players = [];
	obstacles = [];
	flags = []

	// Veilige zone
	safety = 30;

	// Hoeveelheid spelers
	number = 2;

	// Seconde voor respawn
	respawn = 3

	// Spelers spawn en obstacle
	for(var i = 0; i < number; i++){
		temp = new Player(starts[i][0], starts[i][1], 45, i);
		players.push(temp);
		obstacles.push(temp);
	}

	// Draw obstacles
	for(var i = 0; i < map.length; i++){
		block = map[i]
		obstacles.push(new Obstacle(block[0], block[1], block[2], block[3]));
	}

	// Draw flags
	for(var i = 0; i < number; i++){
		flags.push(new Flag(flagstarts[i][0], flagstarts[i][1], 35, i))
	}

}

function draw() {
	background(200);

	scale(width/1920, height/919);
	//resizeCanvas(windowWidth, windowHeight);

	//if(frameCount % 600 == 0){changeMap()};

	// Draw both coloured halves
	fill(teams[0]);
	rect(safety,0,cx, h)
	fill(teams[1]);
	rect(cx,0,cx-safety, h)

	for(var i = 0; i < players.length; i++){
		for(var j = 0; j < obstacles.length; j++){
			if(j != i){ // Doesn't need to check against itself
				players[i].collide(obstacles[j])
				if(obstacles[j] instanceof Obstacle){ // Players get drawn separately
					obstacles[j].show();
				}
			}
		}
		players[i].update();
		players[i].show();

		if(players[i].score >= 10){
			background(255)
			fill(0)
			textSize(100)
			text("Player " + (players[i].team + 1) + " wins!", cx, cy)
		}
	}

	// Show the flags
	for(var i = 0; i < flags.length; i++){
		flags[i].update();
		flags[i].show();
	}

}





function keyPressed() {
	if(keyCode ==  32){changeMap()}
}


function changeMap(){
	current = (current + 1) % 3
	map = maps[current]

	obstacles = obstacles.slice(0, 4)

	for(var i = 0; i < map.length; i++){
		block = map[i]
		obstacles.push(new Obstacle(block[0], block[1], block[2], block[3]));
	}

}
