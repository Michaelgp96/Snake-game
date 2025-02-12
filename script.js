const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;
let snake, apple, direction, gameInterval, score;

const restartButton = document.getElementById("restartButton");

// Variables para controlar el movimiento táctil
let touchStartX = 0;
let touchStartY = 0;

// Función para inicializar el juego
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

// Función para dibujar la serpiente
function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Función para dibujar la manzana
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, gridSize, gridSize);
}

// Genera una nueva posición aleatoria para la manzana
function generateApple() {
    apple.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    apple.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

// Mueve la serpiente
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

// Verifica si la serpiente choca con su propio cuerpo
function checkCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Actualiza el juego
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApple();
    moveSnake();
}

// Cambia la dirección de la serpiente según las teclas presionadas
function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Función para manejar el inicio del toque
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

// Función para manejar el movimiento del toque
function handleTouchMove(event) {
    if (!touchStartX || !touchStartY) return;

    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && direction !== "LEFT") direction = "RIGHT";
        else if (deltaX < 0 && direction !== "RIGHT") direction = "LEFT";
    } else {
        if (deltaY > 0 && direction !== "UP") direction = "DOWN";
        else if (deltaY < 0 && direction !== "DOWN") direction = "UP";
    }

    touchStartX = 0;
    touchStartY = 0;
}

// Evita el desplazamiento táctil en la página
document.addEventListener("touchmove", function(event) {
    event.preventDefault();
}, { passive: false });

// Agrega los eventos táctiles al canvas
canvas.addEventListener("touchstart", handleTouchStart);
canvas.addEventListener("touchmove", handleTouchMove);

// Función para reiniciar el juego
function restartGame() {
    initGame();
}

// Asociamos la acción de reiniciar al botón
restartButton.addEventListener("click", restartGame);

// Inicializamos el juego cuando se carga la página
initGame();

