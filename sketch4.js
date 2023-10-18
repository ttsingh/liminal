var foundTheSquare = false;
var imgSquare;
var imgCircle;

function preload() {
  imgSquare = loadImage('img/cat.png');
  imgCircle = loadImage('img/stand.png');
}

function setup() {
  createCanvas(1440, 500);
  squareX = random(width - imgSquare.width / 2);
  squareY = random(height - imgSquare.height / 2);
  rectMode(CENTER);
}

function draw() {
  if (!foundTheSquare) {
    background(0);
    image(imgCircle, mouseX - imgCircle.width / 2, mouseY - imgCircle.height / 2);
    image(imgSquare, squareX - imgSquare.width / 2, squareY - imgSquare.height / 2);
  } else {
    background(255, 255, 255);
    textSize(32);
    textAlign(CENTER);
    text("(o_0)", width / 2, height / 2);
  }
}

function mouseClicked() {
  if (mouseX > squareX - imgSquare.width / 2 && mouseX < squareX + imgSquare.width / 2 &&
    mouseY > squareY - imgSquare.height / 2 && mouseY < squareY + imgSquare.height / 2) {
    foundTheSquare = true;
  }
}
