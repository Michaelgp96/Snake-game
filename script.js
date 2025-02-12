const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;

let snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];
let apple = {x: 0, y: 0};
let direction = "RIGHT";
let gameInterval;
let score = 0;

function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, gridSize, gridSize);
}

function generateApple() {
    apple.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    apple.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

function moveSnake() {
    let head = {x: snake[0].x, y: snake[0].y};

    if (direction === "UP") head.y -= gridSize;
    if (direction === "DOWN") head.y += gridSize;
    if (direction === "LEFT") head.x -= gridSize;
    if (direction === "RIGHT") head.x += gridSize;

    snake.unshift(head);
    
    // Check if snake eats apple
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        generateApple();
    } else {
        snake.pop();
    }

    // Check for game over
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || checkCollision(head)) {
        clearInterval(gameInterval);
        alert("Game Over! Score: " + score);
    }
}

function checkCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

function updateGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawSnake();
    drawApple();
    moveSnake();
}

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

document.addEventListener("keydown", changeDirection);

generateApple();
gameInterval = setInterval(updateGame, 100);

