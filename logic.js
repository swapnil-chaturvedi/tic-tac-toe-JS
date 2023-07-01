let turnOfPlayer, playerOnesMarks, playerTwosMarks, winner, turnNo, gameover;

const WIN_MARKS_PATTERNS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

const blocks = document.querySelectorAll(".block");
const messageContainer = document.getElementById("message-container");
const messageText = document.getElementById("message-text");
const playAgainBtn = document.getElementById("play-again");
const playerTurn = document.getElementById("player-turn");

startGame();

function startGame() {
  turnOfPlayer = 1;
  playerOnesMarks = [];
  playerTwosMarks = [];
  winner;
  turnNo = 0;
  gameover = false;

  messageContainer.classList.remove("show");

  blocks.forEach((block) => {
    block.classList.remove("filled");
    block.innerText = "";
    block.removeEventListener("click", handleClick);
    block.addEventListener("click", handleClick, { once: true });
  });

  setPlayersTurn();
}

function handleClick(e) {
  //To stop clicks once someone wins
  if (gameover) return;
  const block = e.target;
  turnNo += 1;
  placeMark(block);

  checkWin();
  setPlayersTurn();
}

function placeMark(block) {
  block.innerText = turnOfPlayer === 1 ? "X" : "O";
  const BLOCK_NO = block.getAttribute("data-block-no");
  if (turnOfPlayer === 1) {
    playerOnesMarks.push(BLOCK_NO);
  } else {
    playerTwosMarks.push(BLOCK_NO);
  }
}

function setPlayersTurn() {
  playerTurn.innerText = turnOfPlayer;
}

function checkWin() {
  const marksToCheck = turnOfPlayer === 1 ? playerOnesMarks : playerTwosMarks;
  for (i = 0; i < WIN_MARKS_PATTERNS.length; i++) {
    const doPatternMatch = WIN_MARKS_PATTERNS[i].every((combi) => {
      return marksToCheck.includes(combi);
    });
    if (doPatternMatch) {
      displayMessage(true);
      return;
    }
  }
  if (turnNo === 9) {
    displayMessage(false);
    return;
  }
  turnOfPlayer = turnOfPlayer === 1 ? 2 : 1;
}

function displayMessage(won) {
  gameover = true;
  let message;
  if (won) {
    message = `Congratulations!!! Player ${turnOfPlayer} Won`;
  } else {
    message = "Game Draw!!!";
  }
  messageContainer.classList.add("show");
  document.getElementById("message-text").innerText = message;
  playAgainBtn.addEventListener("click", startGame);
}
