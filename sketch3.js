var characterImg;
var obstacleImg;
var numObstacles = 10;
var obstacles = [];

var characterX;
var characterY;
var characterSpeed = 25;

function setup() {
  createCanvas(1470, 700);
  noStroke();

  characterImg = loadImage("img/buggg.png");
  obstacleImg = loadImage("img/23.svg");

  characterX = width / 2;
  characterY = height / 2;

  for (let i = 0; i < numObstacles; i++) {
    let x = random(width - obstacleImg.width);
    let y = random(height - obstacleImg.height);
    let r = random(10);
    if (r > 8) {
      obstacles.push(new ObstacleObject(x, y, true));
    } else {
      obstacles.push(new ObstacleObject(x, y, false));
    }
  }
}

function draw() {
  background(149, 39, 39);

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].move();
    obstacles[i].display();

    let d = dist(
      characterX,
      characterY,
      obstacles[i].x + obstacleImg.width / 2,
      obstacles[i].y + obstacleImg.height / 2
    );

    if (d < characterImg.width / 2 + obstacleImg.width / 2) {
      if (obstacles[i].objectThatMultiplies) {
        obstacles.push(
          new ObstacleObject(
            random(width - obstacleImg.width),
            random(height - obstacleImg.height),
            true
          )
        );
      }
      obstacles.splice(i, 1);
    }
  }

  image(
    characterImg,
    characterX - characterImg.width / 2,
    characterY - characterImg.height / 2
  );
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    characterX -= characterSpeed;
  } else if (keyCode === RIGHT_ARROW) {
    characterX += characterSpeed;
  } else if (keyCode === UP_ARROW) {
    characterY -= characterSpeed;
  } else if (keyCode === DOWN_ARROW) {
    characterY += characterSpeed;
  }
}

class ObstacleObject {
  constructor(x, y, isSpecialOne) {
    this.x = x;
    this.y = y;
    this.image = obstacleImg;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.objectThatMultiplies = isSpecialOne;
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x <= 0 || this.x >= width - this.image.width) {
      this.xSpeed *= -1; // Reverse x-speed when hitting horizontal boundaries
    }

    if (this.y <= 0 || this.y >= height - this.image.height) {
      this.ySpeed *= -1; // Reverse y-speed when hitting vertical boundaries
    }
  }

  display() {
    image(this.image, this.x, this.y);
  }
}
