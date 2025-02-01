let welcomeScreen = document.getElementById("welcome-screen");
let gameInfo = document.getElementById("game-info");
let gameScreen = document.getElementById("gameScreen");
let startBtn = document.getElementById("start-btn");
let goBtn = document.getElementById("go-btn");
let scoreDisplay = document.getElementById("scoreDisplay");
let gbWrapper = document.getElementById("gbWrapper");

startBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  gameInfo.style.display = "flex";
  gameScreen.style.display = "none";
});

goBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  gameInfo.style.display = "none";
  gameScreen.style.display = "flex";
  showPlayerName();
  shuffleCards();
  removeFlip();
  resetBoard();
});

let playerName = document.getElementById("playerName");
let gbPlayerName = document.getElementById("gbPlayerName");

function showPlayerName() {
  if (playerName.value != "") {
    gbPlayerName.innerText = playerName.value;
  } else {
    alert("Kindly Enter Valid Player Name to Start the Game!");
    gameInfo.style.display = "flex";
    gameScreen.style.display = "none";
  }
}

const cards = document.querySelectorAll(".card");

hasFlippedCard = false;
lockBoard = false;
let firstCard;
let secondCard;
let score;

shuffleCards();

function shuffleCards() {
  cards.forEach((card) => {
    let randIndex = Math.floor(Math.random() * 12);
    card.style.order = randIndex;
  });
}

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;

    checkMatch();
  }
}

function checkMatch() {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
    setTimeout(() => {
      alert("Match Found !!!");
      scoreCount();
    }, 200);
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
      lockBoard = false;
    }, 500);
  }
}

function scoreCount() {
  let flippedCard = document.querySelectorAll(".flip");
  score = flippedCard.length / 2;
  scoreDisplay.innerText = score;

  if (score == 6) {
    alert("Congradulations !!! You won the Match!!!");
  }
}

function resetBoard() {
  hasFlippedCard = false;
  firstCard = null;
  secondCard = null;
}

let restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  gameInfo.style.display = "flex";
  gameScreen.style.display = "none";
  playerName.value = "";
  scoreDisplay.innerText = "0";
});

function removeFlip() {
  let card = document.querySelectorAll(".flip");
  for (i = 0; i < card.length; i++) {
    card[i].classList.remove("flip");
  }
}
