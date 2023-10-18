var foundTheSquare = false;
var imgSquare;
var imgCircle;

function preload() {
  // Load your square image and circle image here
  imgSquare = loadImage('cat.png');
  imgCircle = loadImage('stand.png');
}

function setup() {
  createCanvas(1000, 400);
  //randomize the square location
  squareX = random(width - imgSquare.width / 2);
  squareY = random(height - imgSquare.height / 2);
  rectMode(CENTER);
}

function draw() {
  //if you haven't yet found the square 
  if (!foundTheSquare) {
    //fill the background with black, draw the images
    background(0);
    image(imgCircle, mouseX - imgCircle.width / 2, mouseY - imgCircle.height / 2);
    image(imgSquare, squareX - imgSquare.width / 2, squareY - imgSquare.height / 2);
  } else {
    //if you did find it and won the game, display the win text
    background(200);
    textSize(32);
    textAlign(CENTER);
    text("you found the square", width / 2, height / 2);
  }
}

function mouseClicked() {
  //if you clicked the mouse and the square is within the boundary of the image, you found the square
  if (mouseX > squareX - imgSquare.width / 2 && mouseX < squareX + imgSquare.width / 2 &&
    mouseY > squareY - imgSquare.height / 2 && mouseY < squareY + imgSquare.height / 2) {
    foundTheSquare = true;
  }
}
