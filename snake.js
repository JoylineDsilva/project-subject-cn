// snake.js
class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
    }

    eat(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    death() {
        for (var i = 0; i <= this.tail.length; i++) {
            var pos = this.tail[i];
            if (pos) {
                var d = dist(this.x, this.y, pos.x, pos.y);
                if (d < 1) {
                    console.log('starting over');
                    this.total = 0;
                    this.tail = [];
                    gameOver = true;
                    gameOverFrame = frameCount;
                }
            }
        }
    }

    update() {
        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);

        this.x = (this.x + this.xspeed * scl + width) % width; // Wrap around horizontally
        this.y = (this.y + this.yspeed * scl + height) % height; // Wrap around vertically
    }

    show() {
        for (var i = 0; i < this.tail.length - 1; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        fill(255);
        for (var i = 0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }

    dir(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
}
