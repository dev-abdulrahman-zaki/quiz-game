const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const highScoresList = document.getElementById("highScoresList");

highScores.forEach(hScore => {
    let liItem = `<li class="high-score">${hScore.name} - ${hScore.score}</li>`
    highScoresList.insertAdjacentHTML("beforeend", liItem);
});