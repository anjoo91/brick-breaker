// Get the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = 1280;
canvas.height = 720;

// Set the paddle dimensions and position
const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

// Set the paddle speed
const paddleSpeed = 10;

// Set the ball properties
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 2;
let ballSpeedY = -2;

// Set the brick properties
const brickRowCount = 4;
const brickColumnCount = Math.floor(canvas.width / 100); // Adjust to fit the canvas width
const brickWidth = 100;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// Set the score and game status
let score = 0;
let gameStarted = false;
let gamePaused = false;

