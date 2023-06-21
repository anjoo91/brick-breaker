//Constants 
const audio = document.getElementById("backgroundAudio");
const playPauseButton = document.getElementById("playPauseButton");
const volumeSlider = document.getElementById("volumeSlider");

// Start the game
function startGame() {
    // Redirect to the game page
    window.location.href = "game.html";
}

// View high scores
function viewScores() {
    // Redirect to the high scores page
    window.location.href = "highscores.html";
}

// Play/Pause music
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        audio.volume = 0.25;
        playPauseButton.textContent = "Pause BGM";
    } else {
        audio.pause();
        playPauseButton.textContent = "Play BGM";
    }
}

// Adjust volume of music
function adjustVolume() {
    audio.volume = volumeSlider.value;
}