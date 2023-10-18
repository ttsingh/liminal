var squareSize = 25;
var foundTheSquare = false;
var img;

function preload() {
  // Load your image here
  img = loadImage('stand.png');
}

function setup() {
  createCanvas(500, 400);
  //randomize the square location
  squareX = random(width - squareSize / 2);
  squareY = random(height - squareSize / 2);
  rectMode(CENTER);
}

function draw() {
  //if you haven't yet found the square 
  if (!foundTheSquare) {
    //fill the background with black, draw the image and the square
    background(0);
    image(img, mouseX, mouseY);
    fill(255, 0, 0);
    square(squareX, squareY, squareSize);
  } else {
    //if you did find it and won the game, display the win text
    background(200);
    textSize(32);
    textAlign(CENTER);
    text("you found the square", width / 2, height / 2);
  }
}

function mouseClicked() {
  //if you clicked the mouse and the square is within the radius of the image, you found the square
  if (mouseX > squareX - img.width / 2 && mouseX < squareX + img.width / 2 &&
    mouseY > squareY - img.height / 2 && mouseY < squareY + img.height / 2) {
    foundTheSquare = true;
  }
}
