
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "background.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "monster.png";

var oroReady = false;
var oroImage = new Image();
oroImage.onload = function () {
	oroReady = true;
};
oroImage.src = "oro.png";

var hero = {
	speed: 256
};
var monster = {};
var monster1 = {};
var NroBatalla = 0;
var oro= {};

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
	
	monster1.x = 32 + (Math.random() * (canvas.width - 64));
	monster1.y = 32 + (Math.random() * (canvas.height - 64));
	
	oro.x = 32 + (Math.random() * (canvas.width - 64));
	oro.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function (modifier) {
	if (38 in keysDown) { 
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { 
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { 
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { 
		hero.x += hero.speed * modifier;
	}

	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++NroBatalla;
		reset();
	}
	
	if (
		hero.x <= (monster1.x + 32)
		&& monster1.x <= (hero.x + 32)
		&& hero.y <= (monster1.y + 32)
		&& monster1.y <= (hero.y + 32)
	) {
		++NroBatalla;
		reset();
	}
};

var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
		ctx.drawImage(monsterImage, monster1.x, monster1.y);
	}
	
	if (oroReady) {
		ctx.drawImage(oroImage, oro.x, oro.y);
	}

	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Batalla: " + NroBatalla, 32, 32);
};

var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

reset();
var then = Date.now();
setInterval(main, 1); 