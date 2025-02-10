const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

const gridSize = 20; // Tamaño de cada cuadro de la cuadrícula
const tileCount = canvas.width / gridSize; // Número de cuadros en el canvas

let snake = [{ x: 10, y: 10 }]; // Posición inicial de la serpiente
let direction = { x: 0, y: 0 }; // Dirección inicial
let food = { x: 5, y: 5 }; // Posición inicial de la comida
let score = 0;

// Función principal del juego
function gameLoop() {
    update(); // Actualiza la lógica del juego
    draw(); // Dibuja el juego en el canvas
    setTimeout(gameLoop, 100); // Velocidad del juego (100 ms)
}

// Actualiza la lógica del juego
function update() {
    // Mueve la serpiente
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Verifica colisiones con los bordes
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        resetGame();
        return;
    }

    // Verifica colisiones consigo misma
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
        return;
    }

    // Añade la nueva cabeza
    snake.unshift(head);

    // Verifica si come la comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = score;
        placeFood();
    } else {
        // Remueve la cola si no come
        snake.pop();
    }
}

// Dibuja el juego en el canvas
function draw() {
    // Limpia el canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibuja la serpiente
    ctx.fillStyle = "lime";
    snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

    // Dibuja la comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Coloca la comida en una posición aleatoria
function placeFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    // Asegura que la comida no aparezca en la serpiente
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    }
}

// Reinicia el juego
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    document.getElementById("score").textContent = score;
    placeFood();
}

// Controla la dirección con las teclas
window.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Inicia el juego
placeFood();
gameLoop();