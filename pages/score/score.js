const resultData = sessionStorage.getItem("gameResult");
const userData = sessionStorage.getItem("user")
const user = userData ? JSON.parse(userData) : null;
const result = resultData ? JSON.parse(resultData) : null;
const score = document.querySelector(".score-box");
const title = document.querySelector(".score-title")
score.innerHTML = result.score;
title.innerHTML = `${user.name} Your Score Is`
