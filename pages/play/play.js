const data = sessionStorage.getItem("user");
const parse = data ? JSON.parse(data) : null;
const chBlock = document.querySelector(".char__block-container");
const playName = document.querySelector(".play__name");
const conditions = document.querySelector(".conditions");
const lava = document.querySelector(".lava__img");
const modal = document.querySelector(".modal__sumbit");
const krestik = document.querySelector(".modal__escape");
const answer = document.querySelector(".modal__input");
const lvlShow = document.querySelector(".lvl");
const checkBtn = document.querySelector(".modal__btn");
let current = 0;
let score = 0;
let lvl = 1;
let time = 0;
let correct = false;
let timerInterval;
const numbers = [];
playName.innerHTML = parse.name;

playName.addEventListener("click", () => {
  modal.style.display = "flex";
});
krestik.addEventListener("click", () => {
  modal.style.display = "none";
});

const images = [
  "../../images/char1.png",
  "../../images/ear.png",
  "../../images/eye.png",
  "../../images/mouth.png",
  "../../images/nose.png",
  "../../images/urod.png",
];

const hillCilpherData = [
  {
    word: "banana",
    keyMatrix: [
      [1, 1, 1],
      [1, 2, 2],
      [1, 2, 3],
    ],
    encoded: [17, 32, 46, 16, 31, 32],
    image:
      "https://latex.codecogs.com/svg.image?%5Cbegin%7Bpmatrix%7D1%261%261%5C%5C1%262%262%5C%5C1%262%263%5Cend%7Bpmatrix%7D",
  },
  {
    word: "planet",
    keyMatrix: [
      [1, 0, 1],
      [0, 1, 2],
      [1, 1, 4],
    ],
    encoded: [17, 14, 32, 34, 45, 99],
    image:
      "https://latex.codecogs.com/svg.image?%5Cbegin%7Bpmatrix%7D1%260%261%5C%5C0%261%262%5C%5C1%261%264%5C%5C%5Cend%7Bpmatrix%7D",
  },
  {
    word: "yellow",
    keyMatrix: [
      [1, 1, 0],
      [2, 3, 1],
      [1, 1, 1],
    ],
    encoded: [30, 77, 42, 27, 92, 50],
    image:
      "https://latex.codecogs.com/svg.image?%5Cbegin%7Bpmatrix%7D1%261%260%5C%5C2%263%261%5C%5C1%261%261%5C%5C%5Cend%7Bpmatrix%7D",
  },
  {
    word: "rabbit",
    keyMatrix: [
      [1, 2, 0],
      [1, 3, 0],
      [0, 0, 1],
    ],
    encoded: [20, 21, 2, 20, 29, 20],
    image:
      "https://latex.codecogs.com/svg.image?%5Cbegin%7Bpmatrix%7D1%262%260%5C%5C1%263%260%5C%5C0%260%261%5C%5C%5Cend%7Bpmatrix%7D",
  },
  {
    word: "silver",
    keyMatrix: [
      [1, 2, 3],
      [0, 1, 2],
      [0, 0, 1],
    ],
    encoded: [73, 33, 12, 86, 41, 18],
    image:
      "https://latex.codecogs.com/svg.image?%5Cbegin%7Bpmatrix%7D1%262%263%5C%5C0%261%262%5C%5C0%260%261%5C%5C%5Cend%7Bpmatrix%7D",
  },
  {
    word: "garden",
    keyMatrix: [
      [3, 2, 1],
      [1, 1, 0],
      [1, 1, 1],
    ],
    encoded: [41, 8, 26, 36, 9, 23],
    image:
      "https://latex.codecogs.com/svg.image?%5Cbegin%7Bpmatrix%7D3%262%261%5C%5C1%261%260%5C%5C1%261%261%5C%5C%5Cend%7Bpmatrix%7D",
  },
  {
    word: "star",
    keyMatrix: [
      [1, 2],
      [1, 3],
    ],
    encoded: [59, 79, 37, 55],
    image:
      "https://latex.codecogs.com/svg.image?%5Cbegin%7Bpmatrix%7D1%262%5C%5C1%263%5C%5C%5Cend%7Bpmatrix%7D",
  },
  {
    word: "book",
    keyMatrix: [
      [2, 1],
      [5, 3],
    ],
    encoded: [19, 55, 41, 108],
    image:
      "https://latex.codecogs.com/svg.image?%5Cbegin%7Bpmatrix%7D2%261%5C%5C5%263%5C%5C%5Cend%7Bpmatrix%7D",
  },
  {
    word: "tree",
    keyMatrix: [
      [1, 1],
      [1, 2],
    ],
    encoded: [38, 56, 10, 15],
    image:
      "https://latex.codecogs.com/svg.image?%5Cbegin%7Bpmatrix%7D1%261%5C%5C1%262%5C%5C%5Cend%7Bpmatrix%7D",
  },
  {
    word: "milk",
    keyMatrix: [
      [3, 5],
      [1, 2],
    ],
    encoded: [84, 31, 91, 34],
    image:
      "https://latex.codecogs.com/svg.image?%5Cbegin%7Bpmatrix%7D3%265%5C%5C1%262%5C%5C%5Cend%7Bpmatrix%7D",
  },
];

chBlock.innerHTML += `<img src="${
  images[parse.char]
}" alt="dadad" class="char__play" />`;

createGame();
function checkAnswer() {
  const userAnswer = answer.value.trim().toLowerCase(); 
  const correctWord = hillCilpherData[current].word;

  console.log("Введено:", userAnswer, "Ожидается:", correctWord);

  if (userAnswer === correctWord) {
    lvl++;
    score++;
    answer.value = "";
    modal.style.display = "none";
    if (lvl > 5) {
      endGameAndRedirect();
    }
    createGame();
  }
}

checkBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkAnswer();
});
answer.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    checkAnswer();
  }
});

function endGameAndRedirect() {
    if (timerInterval) clearInterval(timerInterval);
    
    sessionStorage.setItem("gameResult", JSON.stringify({
        score: score, 
        lvl: lvl,
        name: parse ? parse.name : 'Гость',
    })); 

    location.href = "../score/score.html";
}

function updateTimer() {
  let mins = Math.floor(time / 60);
  let secs = time % 60;

  document.getElementById("timer").innerText = `${String(mins).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
}

function createGame() {
    if (timerInterval) clearInterval(timerInterval);
    correct = false;
    let randInt;
    do {
        randInt = Math.floor(Math.random() * hillCilpherData.length);
    } while (numbers.includes(randInt));

    current = randInt;
    numbers.push(randInt);

  conditions.innerHTML = `
        <div class="encode"><div>${hillCilpherData[randInt].encoded}</div></div>
        <div class="key__mat">
            <div class="key__mat_img">
                <img src="${hillCilpherData[randInt].image}" alt="matrix">
            </div>
        </div>`;

  lvlShow.innerHTML = `<h1>Level: ${lvl}</h1>`;

  hillCilpherData[randInt].keyMatrix[0].length === 2
    ? (time = 120)
    : (time = 240);

  lava.style.height = "0px";

  let change = 0;
  let h = 0;
  updateTimer();

  timerInterval = setInterval(() => {
    if (time > 120) {
      change = 0.5; 
    } else {
      change = 1;
    }

    if (time > 0) {
      time--;
      h += change;
      lava.style.height = `${h}px`;
      updateTimer();
    } else {
      endGameAndRedirect();
    }
  }, 1000);
}


