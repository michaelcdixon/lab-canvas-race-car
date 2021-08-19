const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

class Car {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		const img = new Image();
		img.src = "./images/car.png";
		img.onload = () => {
			this.img = img;
			this.draw();
		};
	}

	draw() {
		context.drawImage(this.img, this.x, this.y, 50, 50);
	}

	moveLeft() {
		this.x -= 25;
	}

	moveRight() {
		this.x += 25;
	}
}

const player = new Car(400, 600);

document.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "ArrowLeft":
		case "a":
			player.moveLeft();
			break;
		case "ArrowRight":
		case "d":
			player.moveRight();
			break;
	}
	context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	player.draw();
});

class Obstacle {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.speedX = 0;
		this.speedY = 0;
	}

	draw() {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}

	move() {
		this.x += this.speedX;
		this.y += this.speedY;
	}

	left() {
		return this.x;
	}

	right() {
		return this.x + this.width;
	}

	crashWith(Obstacle) {
		return !(
			this.right() < Obstacle.left() ||
			this.left() > Obstacle.right() ||
			this.top() < Obstacle.bottom() ||
			this.bottom() > Obstacle.top()
		);
	}
}

function drawObstacles() {
	game.obstacles.forEach((obstacle) => {
		obstacle.x -= 1;
		obstacle.draw();
	});

	game.frames++;

	if (game.frames % 120 === 0) {
		const minHeight = 20;
		const maxHeight = 160;
		const randomHeight = Math.floor(
			Math.random() * (maxHeight - minHeight + 1) + minHeight
		);

		const minGap = 50;
		const maxGap = 80;
		const randomGap = Math.floor(
			Math.random() * (maxGap - minGap + 1) + minGap
		);

		//Actually creating the obstacle
		const obstacleTop = new Obstacle(
			canvas.clientWidth,
			0,
			10,
			randomHeight,
			"green"
		);

		game.obstacles.push(obstacleTop); //Pushing the obstacle to the game

		const obstacleBottom = new Obstacle(
			canvas.clientWidth,
			randomHeight + randomGap,
			10,
			canvas.clientHeight - (randomHeight + randomGap),
			"green"
		);

		game.obstacles.push(obstacleBottom);

		console.log(game.obstacles);
	}
}

function updateCanvas() {
	game.clear();
	player.draw();
	player.move();
	drawObstacles();
	checkGameover();
	game.score();
}

function checkGameover() {
	const crashed = game.obstacles.some((obstacle) => {
		return player.crashWith(obstacle) === true;
	});

	if (crashed) {
		game.stop();
	}
}

document.getElementById("start-button").onclick = () => {
	startGame();
};

function startGame() {
	document.querySelector("#game-board").style.display = "block";
	const player = new Car(50, 50);
}
