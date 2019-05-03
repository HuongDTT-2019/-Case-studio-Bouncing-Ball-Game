let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 70;
let radiusBall=10;
let dx = 2;
let dy = -2;
let barHeight = 15;
let barWidth = 100;
let barX = (canvas.width - barWidth) / 2;
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function Ball(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}

function createBall() {
    let ball = new Ball(x, y, radiusBall);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function Bar(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
}

function createBar() {
    let bar = new Bar(barWidth, barHeight, barX);
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.rect(bar.x, canvas.height - bar.height, bar.width, bar.height);
    ctx.fill();
    ctx.closePath();
}

function playGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createBall();
    createBar();
    if (y + dy < radiusBall) {
        dy = -dy;
    } else if (y + dy > canvas.height - radiusBall - barHeight) {
        if (x > barX && x < barX + barWidth) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
        }
    }
    if (x + dx < radiusBall || x + dx > canvas.width - radiusBall) {
        dx = -dx;
    }
    if (rightPressed && barX < canvas.width - barWidth) {
        barX += 7;
    } else if (leftPressed && barX > 0) {
        barX -= 7;
    }
    x += dx;
    y += dy;
}

setInterval(playGame, 10);


