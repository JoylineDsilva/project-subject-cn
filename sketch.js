var s;
var scl = 20;
var food;
var gameStarted = false;
var gameOver = false;
var gameOverFrame;
var score = 0;
var countdown = 3;
//this is a test comment
//test

function setup() {
    createCanvas(700, 700);
    s = new Snake();
    frameRate(10);
    pickLocation();
}

function pickLocation() {
    var cols = floor(width / scl);
    var rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function mousePressed() {
    if (!gameStarted) {
        gameStarted = true;
        countdown = 3; // Reset the countdown on mouse click
    }
    s.total++;
}

function draw() {
    background(51);
    if (!gameStarted) {
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('Press any key to start', width / 2, height / 2);
    } else if (countdown > 0) {
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(countdown, width / 2, height / 2);
        if (frameCount % 10 == 0) { // Adjusted timing for countdown
            countdown--;
        }
    } else if (!gameOver) {
        s.update();
        s.show();
        s.death();
        if (s.eat(food)) {
            pickLocation();
            score++;
        }
        fill(355, 0, 100);
        rect(food.x, food.y, scl, scl);

        fill(255);
        textSize(16);
        textAlign(RIGHT, TOP);
        text('Score: ' + score, width - 10, 10);
    } else {
        if (gameOver) {
            if (frameCount - gameOverFrame > 2) {
                background(51);
                fill(255);
                textSize(32);
                textAlign(CENTER, CENTER);
                text("Game over!\n Final Score: " + score + ".\n Press any key to restart", width / 2, height / 2);
                if (keyIsPressed) {
                    gameOver = false;
                    gameStarted = true;
                    countdown = 3;
                    s = new Snake();
                    pickLocation();
                    score = 0;
                }
            }
        }
    }
}

function keyPressed() {
    if (!gameStarted) {
        gameStarted = true;
        countdown = 3; // Reset the countdown on key press
    } else if (keyCode === UP_ARROW) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    }
}


