/*----- Constants -----*/
const canvasWidth = 1280;
const canvasHeight = 720;
const paddleWidth = 100;
const paddleHeight = 10;
const ballRadius = 10;
const brickWidth = 100;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
let brickOffsetLeft;

/*----- State Variables -----*/
let paddleX;
let ballX;
let ballY;
let ballSpeedX;
let ballSpeedY;
let bricks;
let brickRowCount;
let brickColumnCount;
let score;
let lives;
let currentLevel;
let gamePaused = false;
let gameLost = false;
let gameStarted = false; // Track if the game has started

/*----- Cached Elements -----*/
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const pauseMessage = document.getElementById("pauseMessage");
const gameOverMessage = document.getElementById("gameOverMessage");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const quitBtn = document.getElementById("quitBtn");

/*----- Event Listeners -----*/
document.addEventListener("keydown", handleKeyboardInput);
tryAgainBtn.addEventListener("click", resetAndStartGame);
quitBtn.addEventListener("click", navigateToHighScores);

/*----- Functions -----*/

// Initialize the game
function init() {
  setCanvasDimensions();
  resetGame();
  update();
}

// Set the canvas dimensions
function setCanvasDimensions() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

//Reset to initial state when player opts to try again
function resetGame() {
  // Clear the victory message
  hideVictoryMessage();

  // Reset the game state
  paddleX = (canvasWidth - paddleWidth) / 2;
  ballX = canvasWidth / 2;
  ballY = canvasHeight - 30;
  ballSpeedX = 2;
  ballSpeedY = -2;
  currentLevel = 1;
  score = 0;
  lives = 4;
  gamePaused = false;
  gameLost = false;
  hidePauseMessage();
  hideGameOverMessage();
  bricks = generateBricks();
  drawBricks();
}

// Game End States
// Function to check for victory
function checkVictory() {
  let bricksRemaining = 0;
  for (let row = 0; row < brickRowCount; row++) {
    for (let col = 0; col < brickColumnCount; col++) {
      if (bricks[row][col]) {
        bricksRemaining++;
      }
    }
  }

  if (bricksRemaining === 0) {
    showVictoryMessage();
  }
}

// Define behavior victory is achieved
function handleVictory() {
  gamePaused = true;
  showVictoryMessage();
  navigateToHighScores();
}

// Upon victory, take player to highscores.html
function navigateToHighScores() {
  window.location.href = "highscores.html";
}

// Show the victory message
function showVictoryMessage() {
  const message = document.getElementById("victoryMessage");
  message.style.display = "block";
}


// Hide the victory message
function hideVictoryMessage() {
  const victoryMessage = document.getElementById("victoryMessage");
  victoryMessage.style.display = "none";
}

// Show the game over message
function showGameOverMessage() {
  gameOverMessage.style.display = "block";
}

// Hide the game over message
function hideGameOverMessage() {
  gameOverMessage.style.display = "none";
}

// Show the game over message
function checkGameOver() {
  if (lives === 0) {
    gameLost = true;
    showGameOverMessage(); // Call the function to show the game over message
  }
}

// Creating Assets
// Generate a random color for each row of bricks
function getRandomColorForRow(row) {
  const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
  return colors[row % colors.length];
}

// Generate bricks in specific layouts
function generateBricks() {
  const levelLayouts = {
    1: [
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1]
    ],
    2: [
      [1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1]
    ],
    // Add more level layouts here
  };

  const layout = levelLayouts[currentLevel] || [];
  brickRowCount = layout.length;
  brickColumnCount = layout.length > 0 ? layout[0].length : 0;

  brickOffsetLeft = (canvas.width - (brickColumnCount * brickWidth + (brickColumnCount - 1) * brickPadding)) / 2;

  const generatedBricks = [];
  for (let row = 0; row < brickRowCount; row++) {
    generatedBricks[row] = [];
    for (let col = 0; col < brickColumnCount; col++) {
      const brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
      const brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
      if (layout[row][col] === 1) {
        generatedBricks[row][col] = {
          x: brickX,
          y: brickY,
          color: getRandomColorForRow(row),
        };
      }
    }
  }
  return generatedBricks;
}

// Define collision behavior when ball hits brick
function brickHit(row, col) {
  bricks[row][col] = null; // Remove brick from array
  score++; // Increase score

  if (score === brickRowCount * brickColumnCount) {
    // Check for victory
    handleVictory();
  }
}

// Draw bricks on canvas
function drawBricks() {
  for (let row = 0; row < brickRowCount; row++) {
    for (let col = 0; col < brickColumnCount; col++) {
      const brick = bricks[row][col];
      if (brick) {
        const brickX = brick.x;
        const brickY = brick.y;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brick.color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Show score on canvas
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

// Show remaining lives on canvas
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvasWidth - 65, 20);
}

// Move the ball
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collisions with the walls
  if (ballX + ballRadius > canvasWidth || ballX - ballRadius < 0) {
    ballSpeedX *= -1;
  }
  if (ballY - ballRadius < 0) {
    ballSpeedY *= -1;
  }

  // Ball collisions with the paddle
  if (
    ballY + ballRadius > canvasHeight - paddleHeight &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    ballSpeedY *= -1;
  }

  // Ball collisions with bricks
  for (let row = 0; row < brickRowCount; row++) {
    for (let col = 0; col < brickColumnCount; col++) {
      const brick = bricks[row][col];
      if (brick) {
        if (
          ballX > brick.x &&
          ballX < brick.x + brickWidth &&
          ballY > brick.y &&
          ballY < brick.y + brickHeight
        ) {
          ballSpeedY *= -1;
          brickHit(row, col);
        }
      }
    }
  }

  // Ball collisions with the walls of the canvas
  if (ballY + ballRadius > canvasHeight) {
    loseLife();
    resetPaddleAndBall();
  }
}

// Reset the paddle and ball positions
function resetPaddleAndBall() {
  paddleX = (canvasWidth - paddleWidth) / 2;
  ballX = canvasWidth / 2;
  ballY = canvasHeight - 30;
}

// Update the game state and animations
function update() {
  if (gameLost) {
    showGameOverMessage();
    return;
  }

  if (gamePaused) {
    showPauseMessage();
    return;
  }

  moveBall();
  checkGameOver();
  checkVictory();

  clearCanvas();
  drawBricks();
  drawPaddle();
  drawBall();
  drawScore();
  drawLives();

  requestAnimationFrame(update);
}


// Controls
// Handle keyboard input
function handleKeyboardInput(event) {
  if (event.key === "ArrowLeft") {
    movePaddleLeft();
  } else if (event.key === "ArrowRight") {
    movePaddleRight();
  } else if (event.key === "Escape") {
    if (gamePaused) {
      unpauseGame();
    } else {
      pauseGame();
    }
  } else if (event.key === " ") {
    if (!gameStarted) {
      launchBall();
      gameStarted = true;
    }
  }
}

// Move the paddle to the left
function movePaddleLeft() {
  paddleX -= 10;
  if (paddleX < 0) {
    paddleX = 0;
  }
}

// Move the paddle to the right
function movePaddleRight() {
  paddleX += 10;
  if (paddleX > canvasWidth - paddleWidth) {
    paddleX = canvasWidth - paddleWidth;
  }
}


// Pause Functionality -- WIP*
// Show the pause message
function showPauseMessage() {
  pauseMessage.style.display = "block";
}

// Hide the pause message
function hidePauseMessage() {
  pauseMessage.style.display = "none";
}

// Pause the game
function pauseGame() {
  gamePaused = true;
}

// Unpause the game
function unpauseGame() {
  gamePaused = false;
  hidePauseMessage();
}

// Launch the ball -- WIP*
function launchBall() {
  const ballSpeed = 2; // Adjust the speed as needed

  if (!gameStarted) {
    // Launch the ball at the start of the game
    gameStarted = true;
    ballSpeedX = ballSpeed;
    ballSpeedY = -ballSpeed;
  } else if (gamePaused) {
    // Unpause the game and continue the ball movement
    gamePaused = false;
  } else {
    // Launch the ball after losing a life or resetting
    resetPaddleAndBall();
    ballSpeedX = ballSpeed;
    ballSpeedY = -ballSpeed;
  }
}

// Lose a life
function loseLife() {
  lives--;
}

// Reset the game and start from level 1
function resetAndStartGame() {
  resetGame();
  startGame();
}

// Start the game
function startGame() {
  init();
}

// Call the startGame function to begin the game
startGame();
