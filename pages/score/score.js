const resultData = sessionStorage.getItem("gameResult");
const result = JSON.parse(resultData);
const score = document.querySelector(".score-box");
score.innerHTML = result.score;