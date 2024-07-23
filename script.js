const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;

let snake = [{ x: 10 * scale, y: 10 * scale }];
let direction = 'RIGHT';
let food = generateFood();
let score = 0;

document.addEventListener('keydown', changeDirection);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, scale, scale);

  // Draw snake
  ctx.fillStyle = 'green';
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, scale, scale));

  // Draw score
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);

  moveSnake();
  checkCollision();
  checkFood();
}

function moveSnake() {
  let head = { ...snake[0] };

  switch (direction) {
    case 'UP': head.y -= scale; break;
    case 'DOWN': head.y += scale; break;
    case 'LEFT': head.x -= scale; break;
    case 'RIGHT': head.x += scale; break;
  }

  snake.unshift(head);
  snake.pop();
}

function checkCollision() {
  let head = snake[0];

  // Wall collision
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    gameOver();
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      gameOver();
    }
  }
}

function checkFood() {
  let head = snake[0];

  if (head.x === food.x && head.y === food.y) {
    score++;
    snake.push({ ...snake[snake.length - 1] });
    food = generateFood();
  }
}

function generateFood() {
  let x = Math.floor(Math.random() * cols) * scale;
  let y = Math.floor(Math.random() * rows) * scale;
  return { x, y };
}

function changeDirection(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'DOWN') direction = 'UP';
      break;
    case 'ArrowDown':
      if (direction !== 'UP') direction = 'DOWN';
      break;
    case 'ArrowLeft':
      if (direction !== 'RIGHT') direction = 'LEFT';
      break;
    case 'ArrowRight':
      if (direction !== 'LEFT') direction = 'RIGHT';
      break;
  }
}

function gameOver() {
  alert(`Game Over! Your score is ${score}`);
  snake = [{ x: 10 * scale, y: 10 * scale }];
  direction = 'RIGHT';
  score = 0;
  food = generateFood();
}

setInterval(draw, 100);

