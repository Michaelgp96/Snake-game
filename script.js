const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;
let snake, apple, direction, gameInterval, score;

const restartButton = document.getElementById("restartButton");

// Botones de control
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

// Variables para controlar el movimiento táctil
let touchStartX = 0;
let touchStartY = 0;

function initGame() {
    snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];
    apple = {x: 0, y: 0};
    direction = "RIGHT";
    score = 0;
    generateApple();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 100);
    restartButton.style.display = "none";
}

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

    if (head.x === apple.x && head.y === apple.y) {
        score++;
        generateApple();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || checkCollision(head)) {
        clearInterval(gameInterval);
        alert("Game Over! Puntuación: " + score);
        restartButton.style.display = "block";
    }
}

function checkCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApple();
    moveSnake();
}

// Cambia la dirección de la serpiente con teclado
function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Cambia la dirección con los botones
upButton.addEventListener("click", () => {
    if (direction !== "DOWN") direction = "UP";
});

downButton.addEventListener("click", () => {
    if (direction !== "UP") direction = "DOWN";
});

leftButton.addEventListener("click", () => {
    if (direction !== "RIGHT") direction = "LEFT";
});

rightButton.addEventListener("click", () => {
    if (direction !== "LEFT") direction = "RIGHT";
});

// Función para reiniciar el juego
function restartGame() {
    initGame();
}

// Asociamos la acción de reiniciar al botón
restartButton.addEventListener("click", restartGame);

// Detecta teclas del teclado
document.addEventListener("keydown", changeDirection);

// Inicializamos el juego cuando se carga la página
initGame();


