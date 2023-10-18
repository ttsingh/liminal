var bugSize = 45;
var canvasWidth, canvasHeight;
var bugX, bugY;
var img;
var customFonts;
var numObstacles = 41;
var canvas = document.getElementById("myCanvas1");

var obstacles = [];
var obstacleSpeed = 5.5;
var minDistance = bugSize + 27;

var score = 0;

function setup() {
  img = loadImage("img/bug-one.svg");

  canvasWidth = bugSize * 33;
  canvasHeight = bugSize * 13;
  createCanvas(canvasWidth, canvasHeight);
  bugX = bugSize - (bugSize / 2);
  bugY = canvasHeight - (bugSize / 2);
  imageMode(CENTER);

  for (var i = 0; i < numObstacles; i++) {
    var obstacleX, obstacleY;
    var validPosition = false;

    while (!validPosition) {
      obstacleX = floor(random(canvasWidth / bugSize)) * bugSize;
      obstacleY = floor(random(canvasHeight / bugSize)) * bugSize;
      validPosition = true;

      for (var j = 0; j < obstacles.length; j++) {
        var d = dist(obstacleX, obstacleY, obstacles[j].x, obstacles[j].y);
        if (d < minDistance) {
          validPosition = false;
          break;
        }
      }
    }

    obstacles.push({ x: obstacleX, y: obstacleY, ySpeed: obstacleSpeed });
  }
}

function draw() {
  background(29, 50, 51);

  fill(100, 100, 100);
  for (var i = 0; i < obstacles.length; i++) {
    noStroke();
    fill(72, 104, 98);
    rect(obstacles[i].x, obstacles[i].y, bugSize, bugSize + 50);

    obstacles[i].y += obstacles[i].ySpeed;

    if (obstacles[i].y < 0 || obstacles[i].y + bugSize > canvasHeight) {
      obstacles[i].ySpeed *= -1;
    }

    if (
      bugX + bugSize / 2 > obstacles[i].x &&
      bugX - bugSize / 2 < obstacles[i].x + bugSize &&
      bugY + bugSize / 2 > obstacles[i].y &&
      bugY - bugSize / 2 < obstacles[i].y + bugSize
    ) {
      obstacles[i].ySpeed *= -1;
      score -= 1;
    }
  }

  fill(0);
  image(img, bugX, bugY, img.width, img.height); // Use the original image size

  textSize(17);
  fill(255);
  text("sanity: " + score, 20, 30);
}

function keyPressed() {
  var newX = bugX;
  var newY = bugY;

  if (keyCode === LEFT_ARROW) {
    newX -= bugSize;
  } else if (keyCode === RIGHT_ARROW) {
    newX += bugSize;
  } else if (keyCode === UP_ARROW) {
    newY -= bugSize;
  } else if (keyCode === DOWN_ARROW) {
    newY += bugSize;
  }

  var canMove = true;
  for (var i = 0; i < obstacles.length; i++) {
    if (
      newX + bugSize / 2 > obstacles[i].x &&
      newX - bugSize / 2 < obstacles[i].x + bugSize &&
      newY + bugSize / 2 > obstacles[i].y &&
      newY - bugSize / 2 < obstacles[i].y + bugSize
    ) {
      canMove = false;
      break;
    }
  }

  if (canMove) {
    bugX = newX;
    bugY = newY;
    score += 1;
  }
}
