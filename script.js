const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

// Ajustar tamaño del canvas para móviles (múltiplo de gridSize)
const canvasSize = Math.min(window.innerWidth - 20, 400);
canvas.width = canvasSize - (canvasSize % 20); // Asegurar que sea múltiplo de 20
canvas.height = canvasSize - (canvasSize % 20); 

const gridSize = 20;
const tileCount = canvas.width / gridSize; // Ahora siempre es entero

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let touchStartX = 0;
let touchStartY = 0;

// Función principal del juego (igual que antes)
function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

// ... (las funciones update(), draw(), placeFood() y resetGame() son iguales) ...

// Control táctil corregido (coordenadas relativas al canvas)
canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    touchStartX = e.touches[0].clientX - rect.left;
    touchStartY = e.touches[0].clientY - rect.top;
});

canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touchEndX = e.touches[0].clientX - rect.left;
    const touchEndY = e.touches[0].clientY - rect.top;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && direction.x === 0) direction = { x: 1, y: 0 }; // Derecha
        else if (deltaX < 0 && direction.x === 0) direction = { x: -1, y: 0 }; // Izquierda
    } else {
        if (deltaY > 0 && direction.y === 0) direction = { x: 0, y: 1 }; // Abajo
        else if (deltaY < 0 && direction.y === 0) direction = { x: 0, y: -1 }; // Arriba
    }
});

// Iniciar juego
placeFood();
gameLoop();
