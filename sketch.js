var bugSize = 45;
var canvasWidth, canvasHeight;
var bugX, bugY;
var img;
var numObstacles = 17;

var obstacles = [];
var obstacleSpeed = 5;
var minDistance = bugSize + 5;

var score = 0;

function setup() {
  img = loadImage("img/bug.png");
  obs1=loadImage("img/101.png");
  obs2=loadImage("img/102.png");
  obs3=loadImage("img/103.png");
  obs4=loadImage("img/104.png");
  obs5=loadImage("img/105.png");
  obs6=loadImage("img/106.png");
  obs7=loadImage("img/107.png");
  obs8=loadImage("img/108.png");
  obs9=loadImage("img/109.png");

  canvasWidth = bugSize * 15;
  canvasHeight = bugSize * 10;
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
  image(img, bugX, bugY, bugSize, bugSize);

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
