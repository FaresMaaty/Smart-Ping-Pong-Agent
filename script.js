const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let ball = { x: 400, y: 200, radius: 10, speedX: 5, speedY: 5 };
let user = { x: 0, y: 150, width: 10, height: 100, score: 0 };
let ai = { x: 790, y: 150, width: 10, height: 100, score: 0 };

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}
function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

function update() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }

    ai.y += (ball.y - (ai.y + ai.height / 2)) * 0.1;

    let player = (ball.x < canvas.width / 2) ? user : ai;
    if (collision(ball, player)) {
        ball.speedX = -ball.speedX;
    }

    if (ball.x - ball.radius < 0) {
        ai.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }
}
canvas.addEventListener("mousemove", (evt) => {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height / 2;
});

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#000"); // Clear
    drawRect(user.x, user.y, user.width, user.height, "#fff");
    drawRect(ai.x, ai.y, ai.width, ai.height, "#58a6ff");
    drawCircle(ball.x, ball.y, ball.radius, "#f85149");
}

function gameLoop() {
    update();
    render();
}

function startGame() {
    document.getElementById("overlay").style.display = "none";
    setInterval(gameLoop, 1000/60);
}

function resetGame() { location.reload(); }

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = -ball.speedX; 
    
    document.getElementById("playerScore").innerHTML = user.score;
    document.getElementById("aiScore").innerHTML = ai.score;
}