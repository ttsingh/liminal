var bugSize = 45;
var canvasWidth, canvasHeight;
var bugX, bugY;
var img;
var numObstacles = 10;

var obstacles = [];
var obstacleSpeed = 3; // Adjust the speed as needed
var minDistance = bugSize + 5; // Minimum distance between obstacles

var score = 0; // Initialize the score

function setup() {
  img = loadImage("img/bug.png");
  canvasWidth = bugSize * 15;
  canvasHeight = bugSize * 10;
  createCanvas(canvasWidth, canvasHeight);
  bugX = bugSize - (bugSize / 2);
  bugY = canvasHeight - (bugSize / 2);
  imageMode(CENTER);

  for (var i = 0; i < numObstacles; i++) {
    var obstacleX, obstacleY;
    var validPosition = false;

    // Keep trying until a valid position is found
    while (!validPosition) {
      obstacleX = floor(random(canvasWidth / bugSize)) * bugSize;
      obstacleY = floor(random(canvasHeight / bugSize)) * bugSize;
      validPosition = true;

      // Check for collisions with other obstacles
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

    // Update obstacle positions (only in the y-direction)
    obstacles[i].y += obstacles[i].ySpeed;

    // Check for collisions with screen edges and reverse direction if needed
    if (obstacles[i].y < 0 || obstacles[i].y + bugSize > canvasHeight) {
      obstacles[i].ySpeed *= -1;
    }

    // Check for collisions with your character
    if (
      bugX + bugSize / 2 > obstacles[i].x &&
      bugX - bugSize / 2 < obstacles[i].x + bugSize &&
      bugY + bugSize / 2 > obstacles[i].y &&
      bugY - bugSize / 2 < obstacles[i].y + bugSize
    ) {
      // Handle collision with your character here (e.g., decrease score)
      // For now, we'll just reverse the obstacle's direction when there's a collision
      obstacles[i].ySpeed *= -1;

      // Decrease the score when there's a collision
      score -= 1;
    }
  }

  fill(0);
  image(img, bugX, bugY, bugSize, bugSize);

  // Display the score on the canvas
  textSize(17);
  fill(255);
  text("Sanity: " + score, 20, 30);
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

    // Increase the score when the character moves without collision
    score += 1;
  }
}
