// Check if there are any high scores from local storage
function getHighScores() {
    const highScores = localStorage.getItem("highScores");
    return highScores ? JSON.parse(highScores).filter(score => score !== null) : []; // Exclude null values
}
  
// Convert array of scores to json string
function saveHighScores(scores) {
    localStorage.setItem("highScores", JSON.stringify(scores));
}
  
// Show high scores in the table
function renderHighScores() {
    const tbody = document.getElementById("scoresTableBody");
  
    // Clear existing rows
    tbody.innerHTML = "";
  
    // Retrieve high scores from local storage
    const highScores = getHighScores();
  
    // Sort high scores in descending order by score
    highScores.sort((a, b) => (b.score || 0) - (a.score || 0));
  
    // Create new rows for each high score
    highScores.forEach((score) => {
      const row = document.createElement("tr");
      const playerNameCell = document.createElement("td");
      const scoreCell = document.createElement("td");
  
      playerNameCell.textContent = score.playerName;
      scoreCell.textContent = score.score || 0;
      
      // Append or else we see nuffin' on the DOM
      row.appendChild(playerNameCell);
      row.appendChild(scoreCell);
      tbody.appendChild(row);
    });
}
  
// Return to main menu
function returnToMainMenu() {
    window.location.href = "/index.html";
}
  
// Return button
document.getElementById("returnBtn").addEventListener("click", returnToMainMenu);
  
// We Want Scores!
renderHighScores();