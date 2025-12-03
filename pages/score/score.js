const resultData = sessionStorage.getItem("gameResult");
const result = resultData ? JSON.parse(resultData) : null;
const score = document.querySelector(".score-box");
score.innerHTML = result.score;
