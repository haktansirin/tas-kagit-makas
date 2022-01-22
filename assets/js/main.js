const welcomePage = document.querySelector(".js-welcome-page"),
  usernamePage = document.querySelector(".js-username-page"),
  gameAreaPage = document.querySelector(".js-game-area-page"),
  gameOverPage = document.querySelector(".js-game-over-page"),
  gameOverPlayName = document.querySelector(".game-over-player-name"),
  usernameInput = document.querySelector("#username"),
  startPlayBtn = document.querySelector(".js-start-play"),
  moreBtn = document.querySelector(".js-more"),
  validationMessage = document.querySelector(".js-validate"),
  playerName = document.querySelector(".player-name"),
  playerOptions = document.querySelectorAll(".player-select .option"),
  computerSelectOption = document.querySelector(".computer-select .option"),
  playerScoreEl = document.querySelector(".player-score"),
  computerScoreEl = document.querySelector(".computer-score"),
  gameState = document.querySelector(".game-state"),
  playAgainBtn = document.querySelector(".js-play-again");

let computerOptions = [
  { name: "rock", url: "assets/img/rock.png" },
  { name: "paper", url: "assets/img/paper.png" },
  { name: "scissors", url: "assets/img/scissors.png" },
];

let playerScore, computerScore;

playerScore = 0;
computerScore = 0;

playerScoreEl.innerHTML = playerScore;
computerScoreEl.innerHTML = computerScore;

// events
startPlayBtn.addEventListener("click", startPlay);
moreBtn.addEventListener("click", morePlay);
playAgainBtn.addEventListener("click", playAgain);

function startPlay() {
  welcomePage.classList.add("hide");
  usernamePage.classList.remove("hide");
}

function morePlay() {
  let usernameInputVal = usernameInput.value;

  if (usernameInputVal === "") {
    validate("error", "Oops! Boş geçilemez.");
  } else {
    gameAreaPage.classList.add("visible");
    usernamePage.classList.add("hide");
    playerName.innerHTML = usernameInputVal;
  }
}

function hideOtherOptions() {
  playerOptions.forEach((option) => {
    option.classList.add("hide");
  });
}

function showOtherOptions() {
  playerOptions.forEach((option) => {
    option.classList.remove("hide");
  });
}

function playerSelect() {
  playerOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      let selectedOption = e.currentTarget.getAttribute("data-option"),
        currentEl = e.currentTarget;

      currentEl.classList.toggle("selected");

      if (currentEl.className === "option selected") {
        hideOtherOptions();
        computerSelect();
      } else {
        noComputerSelect();
        showOtherOptions();
      }

      winnerControl(selectedOption);
    });
  });
}

function computerSelect() {
  let selectedComputerOption =
    computerOptions[Math.floor(Math.random() * computerOptions.length)];

  computerSelectOption.innerHTML = `<img src='assets/img/${selectedComputerOption.name}.png' alt='${selectedComputerOption.name}'>`;
  computerSelectOption.setAttribute("data-option", selectedComputerOption.name);
}

function noPlayerSelect() {
  playerOptions.forEach((option) => {
    option.classList.remove("selected");
  });
}

function noComputerSelect() {
  computerSelectOption.innerHTML =
    "<img src='assets/img/question.png' alt='Question'>";
  computerSelectOption.removeAttribute("data-option");
}

function winnerControl(selectedPlayerOption) {
  let selectedComputerOptionAttr =
    computerSelectOption.getAttribute("data-option");

  if (
    selectedPlayerOption === "rock" &&
    selectedComputerOptionAttr === "scissors"
  ) {
    newPlayerScore();
  } else if (
    selectedPlayerOption === "paper" &&
    selectedComputerOptionAttr === "rock"
  ) {
    newPlayerScore();
  } else if (
    selectedPlayerOption === "scissors" &&
    selectedComputerOptionAttr === "paper"
  ) {
    newPlayerScore();
  } else if (
    selectedComputerOptionAttr === "rock" &&
    selectedPlayerOption === "scissors"
  ) {
    newComputerScore();
  } else if (
    selectedComputerOptionAttr === "paper" &&
    selectedPlayerOption === "rock"
  ) {
    newComputerScore();
  } else if (
    selectedComputerOptionAttr === "scissors" &&
    selectedPlayerOption === "paper"
  ) {
    newComputerScore();
  }

  gameOver();
}

function newPlayerScore() {
  playerScore = playerScore + 1;
  playerScoreEl.innerHTML = playerScore;
}

function newComputerScore() {
  computerScore = computerScore + 1;
  computerScoreEl.innerHTML = computerScore;
}

function gameOver() {
  let usernameInputVal = usernameInput.value,
    username = usernameInputVal;

  if (playerScore === 3) {
    gameOverModal(username, "Kazandın!");
  } else if (computerScore === 3) {
    gameOverModal(username, "Kaybettin!");
  }
}

function gameOverModal(name, state) {
  gameOverPage.classList.add("visible");
  gameOverPlayName.innerHTML = name;
  gameState.innerHTML = state;
}

function playAgain() {
  gameOverPage.classList.remove("visible");
  showOtherOptions();
  resetScore();
  noComputerSelect();
  noPlayerSelect();
}

function resetScore() {
  playerScore = 0;
  computerScore = 0;

  playerScoreEl.innerHTML = playerScore;
  computerScoreEl.innerHTML = computerScore;
}

function validate(type, message) {
  validationMessage.style.display = "block";
  validationMessage.classList.add(type);
  validationMessage.innerHTML = message;
}

playerSelect();
