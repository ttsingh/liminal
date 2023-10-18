let foundTheSquare = false;
let imgSquare;
let imgCircle;
let squareX, squareY;

function preload() {
  imgSquare = loadImage('img/cat.png'); // Make sure the path to 'cat.png' is correct
  imgCircle = loadImage('img/stand.png'); // Make sure the path to 'stand.png' is correct
}

function setup() {
  createCanvas(1440, 900);
  squareX = random(width - imgSquare.width / 2);
  squareY = random(height - imgSquare.height / 2);
  rectMode(CENTER);
}

function draw() {
  if (!foundTheSquare) {
    background(0);
    image(imgCircle, mouseX - imgCircle.width / 2, mouseY - imgCircle.height / 2);
    image(imgSquare, squareX, squareY);
  } else {
    background(200);
    textSize(32);
    textAlign(CENTER);
    text("You found the square", width / 2, height / 2);
  }
}

function mouseClicked() {
  const halfWidth = imgSquare.width / 2;
  const halfHeight = imgSquare.height / 2;
  if (
    mouseX > squareX - halfWidth &&
    mouseX < squareX + halfWidth &&
    mouseY > squareY - halfHeight &&
    mouseY < squareY + halfHeight
  ) {
    foundTheSquare = true;
  }
}
