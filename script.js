// Getting and Storing Variables:
let welcomeScreen = document.getElementById("welcome-screen");
let gameInfo = document.getElementById("game-info");
let gameScreen = document.getElementById("gameScreen");
let startBtn = document.getElementById("start-btn");
let goBtn = document.getElementById("go-btn");
let scoreDisplay = document.getElementById("scoreDisplay");
var gbWrapper = document.getElementById("gbWrapper");

// Adding Functionality to Let's Start Button:
startBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  gameInfo.style.display = "flex";
  gameScreen.style.display = "none";
});

// Adding Functionality to Go Button in Game Information Screen:
goBtn.addEventListener("click", () => {
welcomeScreen.style.display = "none";
gameInfo.style.display = "none";
gameScreen.style.display = "flex";
winImage.style.display = 'none';
gbWrapper.style.display = 'flex';
  showPlayerName();
  shuffleCards();
  removeFlip();
  resetBoard();
  click();
});

// Declaring Variable and Adding Evevent Listener to Each Card in Game Board:
hasFlippedCard = false;
lockBoard = false;
let firstCard;
let secondCard;
let score;

const cards = document.querySelectorAll(".card");

function click() {
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

// Funtion to FLIP CARD
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

// Function to CHECK MATCH for Selected and Flipped Cards:
function checkMatch() {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
    setTimeout(() => {
      alert("Great !!! You Find a Match & Got 1 Point !!!");
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

// Funtion to SUFFLE CARDS Each Time in Game Board:
function shuffleCards() {
  cards.forEach((card) => {
    let randIndex = Math.floor(Math.random() * 12);
    card.style.order = randIndex;
  });
}

// Function to SHOW PLAYER NAME:
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

// Fuction to COUNT & DISPLAY SCORE:

var winImage = document.querySelector('.win-image');

function scoreCount() {
  let flippedCard = document.querySelectorAll(".flip");
  score = flippedCard.length / 2;
  scoreDisplay.innerText = score;
  if (score == 6) {
    alert("Congradulations !!! You won the Match!!!");
    winImage.style.display = 'block';
    gbWrapper.style.display = 'none';
  }
}

// Function to RESET THE GAME BOARD:
function resetBoard() {
  hasFlippedCard = false;
  firstCard = null;
  secondCard = null;
}

// Function to REMOVE FLIP on Already Selected Cards:
function removeFlip() {
  let card = document.querySelectorAll(".flip");
  for (i = 0; i < card.length; i++) {
    card[i].classList.remove("flip");
  }
}

// Adding Fucntionality to RESTART BUTTON of Game Screen:
let restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", () => {
  reStartConfirm()
  });

// Confirm Function for RESTART the Game
function reStartConfirm() {
  let reStartConfirmResult = confirm('Are You Sure want to Exit From the Game?');
  if (reStartConfirmResult == false) {
    event.preventDefault();
  } else {
    scoreDisplay.innerText = "0";
    shuffleCards();
    removeFlip();
    resetBoard();
    click();
    winImage.style.display = 'none';
    gbWrapper.style.display = 'flex';
  }
}

// Adding Fucntionality to EXIT BUTTON of Game Screen:
let exitBtn = document.getElementById("exitBtn");
exitBtn.addEventListener("click", () => {
  exitConfirm()
});
  
// Confirm Function for EXIT BUTTON
function exitConfirm() {
  let exitResult = confirm('Are You Sure want to Exit From the Game?');
  if (exitResult == false) {
    event.preventDefault();
  } else {
    welcomeScreen.style.display = "flex";
    gameInfo.style.display = "none";
    gameScreen.style.display = "none";
    scoreDisplay.innerText = "0";
    playerName.value = "";
    gbplayerName.innerText = "";
    winImage.style.display = 'none';
    gbWrapper.style.display = 'flex';
  }
}