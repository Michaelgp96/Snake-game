const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20; // Tamaño de cada "cuadro" de la serpiente y la manzana
const canvasSize = 400; // Tamaño del canvas
let snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}]; // Inicialización de la serpiente
let apple = {x: 0, y: 0}; // Manzana
let direction = "RIGHT"; // Dirección inicial de la serpiente
let gameInterval; // Intervalo para el juego
let score = 0; // Puntuación

// Función para dibujar la serpiente
function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize); // Dibuja cada segmento de la serpiente
    });
}

// Función para dibujar la manzana
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, gridSize, gridSize); // Dibuja la manzana
}

// Genera una nueva posición aleatoria para la manzana
function generateApple() {
    apple.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    apple.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

// Mueve la serpiente
function moveSnake() {
    let head = {x: snake[0].x, y: snake[0].y};

    // Cambia la posición de la cabeza de acuerdo a la dirección
    if (direction === "UP") head.y -= gridSize;
    if (direction === "DOWN") head.y += gridSize;
    if (direction === "LEFT") head.x -= gridSize;
    if (direction === "RIGHT") head.x += gridSize;

    snake.unshift(head); // Agrega la nueva cabeza al principio de la serpiente

    // Si la serpiente come la manzana
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        generateApple(); // Genera una nueva manzana
    } else {
        snake.pop(); // Elimina el último segmento de la serpiente si no comió
    }

    // Verifica si la serpiente choca con los bordes o consigo misma
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || checkCollision(head)) {
        clearInterval(gameInterval); // Detiene el juego
        alert("Game Over! Puntuación: " + score); // Muestra la puntuación final
    }
}

// Verifica si la serpiente choca con su propio cuerpo
function checkCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Actualiza el juego
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    drawSnake(); // Dibuja la serpiente
    drawApple(); // Dibuja la manzana
    moveSnake(); // Mueve la serpiente
}

// Cambia la dirección de la serpiente según las teclas presionadas
function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

document.addEventListener("keydown", changeDirection);

// Genera la primera manzana
generateApple();

// Intervalo para actualizar el juego cada 100 milisegundos
gameInterval = setInterval(updateGame, 100);
