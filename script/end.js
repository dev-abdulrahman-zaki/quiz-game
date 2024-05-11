// Select Elements
let username = document.getElementById("username");
let saveScoreBtn = document.getElementById("saveScoreBtn");
let finalScore = document.getElementById("finalScore");
let mostRecentScore = localStorage.getItem("mostRecentScore");

// Update Final Score
finalScore.innerText = mostRecentScore;

// Username Input Validator
username.addEventListener("keyup", ()=>{
    saveScoreBtn.disabled = !username.value;
});


// Handle Save Score
const MAX_HIGH_SCORES = 5;
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

let saveScore = (e) => {
    e.preventDefault();
    // Update High Scores
    const score = {
        name: username.value,
        score: mostRecentScore        
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);    
    localStorage.setItem('highScores', JSON.stringify(highScores));
    // Go Home
    setTimeout(()=>{window.location.assign('/')}, 1000)
};