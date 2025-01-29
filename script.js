let welcomeScreen = document.getElementById("welcome-screen");
let gameInfo = document.getElementById("game-info");
let gameScreen = document.getElementById("gameScreen");
let startBtn = document.getElementById("start-btn");
let goBtn = document.getElementById("go-btn");
let restartBtn = document.getElementById("restartBtn");
let closeBtn = document.getElementById("closeBtn");

startBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  gameInfo.style.display = "flex";
  gameScreen.style.display = "none";
});

goBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  gameInfo.style.display = "none";
  gameScreen.style.display = "flex";
});

const cards = document.querySelectorAll(".card");

hasFlippedCard = false;
lockBoard = false;
let firstCard;
let secondCard;

shuffleCards();

function shuffleCards() {
  cards.forEach((card) => {
    let randIndex = Math.floor(Math.random() * 12);
    card.style.order = randIndex;
  });
}

// restartBtn.addEventListener("click", () => {
//   shuffleCards();
//   cards.forEach((card) => card.classList.remove("flip"));
// });

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

function resetBoard() {
  hasFlippedCard = false;
  firstCard = null;
  secondCard = null;
}
