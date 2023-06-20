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
quitBtn.addEventListener("click", navigateToScores);

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

// Reset the game to its initial state
function resetGame() {
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

  // Generate bricks for the current level
  bricks = generateBricks();
}


// Generate the bricks based on the current level
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

// Start the game
function startGame() {
  init();
}

// Call the startGame function to begin the game
startGame();
