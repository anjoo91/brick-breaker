//Constants 
const audio = document.getElementById("backgroundAudio");
const playPauseButton = document.getElementById("playPauseButton");
const volumeSlider = document.getElementById("volumeSlider");

// Function to start the game
function startGame() {
    // Redirect to the game page
    window.location.href = "game.html";
}

// Function to view high scores
function viewScores() {
    // Redirect to the scores page
    window.location.href = "highscores.html";
}

//Function to Play/Pause music
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = "Pause BGM";
    } else {
        audio.pause();
        playPauseButton.textContent = "Play BGM";
    }
}

//Function to adjust volume of music
function adjustVolume() {
    audio.volume = volumeSlider.value;
}