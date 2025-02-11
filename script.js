const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

// Ajustar tamaño del canvas para móviles
canvas.width = Math.min(window.innerWidth - 20, 400);
canvas.height = Math.min(window.innerWidth - 20, 400);

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let touchStartX = 0;
let touchStartY = 0;

// Función principal del juego
function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

// Actualizar lógica del juego (igual que antes)
function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        resetGame();
        return;
    }

    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = score;
        placeFood();
    } else {
        snake.pop();
    }
}

// Dibujar en el canvas
function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#4CAF50"; // Verde para la serpiente
    snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

    ctx.fillStyle = "#FF0000"; // Rojo para la comida
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Lógica para colocar comida (igual que antes)
function placeFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    }
}

// Reiniciar juego
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    document.getElementById("score").textContent = score;
    placeFood();
}

// Control táctil (movimiento con dedo)
canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Movimiento horizontal
        if (deltaX > 0 && direction.x === 0) direction = { x: 1, y: 0 }; // Derecha
        else if (deltaX < 0 && direction.x === 0) direction = { x: -1, y: 0 }; // Izquierda
    } else {
        // Movimiento vertical
        if (deltaY > 0 && direction.y === 0) direction = { x: 0, y: 1 }; // Abajo
        else if (deltaY < 0 && direction.y === 0) direction = { x: 0, y: -1 }; // Arriba
    }
});

// Iniciar juego
placeFood();
gameLoop();
