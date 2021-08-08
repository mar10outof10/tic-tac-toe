const gameText = document.getElementById("game-text");
const board = document.getElementsByClassName("board")[0];
const boxes = document.getElementsByClassName("box");

// globals for game data
let counter;
let turn;
let winData;
let errorIndex;
let game;

const gridMap = ["top-left", "top", "top-right", "left", "middle", "right", "bottom-left", "bottom", "bottom-right"];
const winMap = {
  "horizontal": "horiz_line",
  "vertical": "vert_line",
  "left-diagonal": "diag_left",
  "right-diagonal": "diag_right"
};

const boxClick = (index) => {
  if (!game) {
    gameText.innerHTML = "Click the button for a new game!";
    return;
  }

  if (errorIndex) {
    boxes[errorIndex].id = "";
    errorIndex = undefined;
  }
  
  const box = boxes[index];
  
  if (box.classList.length > 1) {
    errorIndex = index;
    boxes[errorIndex].id = "error-box";
    gameText.innerHTML = "<h2>Hey! That spot is already taken!</h2>";
    return;
  }

  counter++;
  board.classList.remove(turn);

  if (turn === "blue") {
    box.classList.add("blue-box");
    box.innerHTML = "<img src=\"assets/o_transparent.png\">";
    turn = "yellow";
    gameText.innerHTML = `Blue played in the ${gridMap[index]} spot! Yellow's turn!`;
  } else {
    box.classList.add("yellow-box");
    box.innerHTML = "<img src=\"assets/x_transparent.png\">";
    turn = "blue";
    gameText.innerHTML = `Yellow played in the ${gridMap[index]} spot! Blue's turn!`;
  }

  if (counter >= 5) { // minimum 5 pieces before victory possible
    winData = victoryCheck(index);
  }

  if (winData) {
    let winner = turn === "blue" ? "Yellow" : "Blue";
    game = false;
    for (let i = 1; i <= 3; i++) {
      boxes[winData[i]].classList.add('win-box');
      boxes[winData[i]].innerHTML += `<img class="winner" src="assets/${winMap[winData[0]]}.png">`;
    }
    for (const widget of document.getElementsByTagName("iframe")) {
      widget.style.setProperty("visibility", "visible", "important");
    }
    board.classList.add("game-over"); // disables hover effects, ebds gane
    gameText.innerHTML = `${winner} is the winner with a ${winData[0]} victory!`;
    gameText.className = winner === "Blue" ? "blue-win" : "yellow-win";
    return;
  }
  
  if (counter >= 9) {
    board.classList.add("game-over"); // disables hover effects
    gameText.innerHTML = "Nobody wins! Darn";
  }

  board.classList.add(turn);
};

const victoryCheck = (index) => { // receives index, checks game grid. Returns array in format ["win-type", #, #, #] where each # is the index of a winning box
  const row = Math.floor(index / 3) * 3; // gives first index of row (0, 3 or 6)
  if (boxes[row].classList.length > 1 && boxes[row].classList[1] === boxes[row + 1].classList[1] && boxes[row + 1].classList[1] === boxes[row + 2].classList[1]) {
    return ["horizontal", row, row + 1, row + 2];
  }

  const col = index % 3; // gives column (0, 1, or 2)
  if (boxes[col].classList.length > 1 && boxes[col].classList[1] === boxes[col + 3].classList[1] && boxes[col + 3].classList[1] === boxes[col + 6].classList[1]) {
    return ["vertical", col, col + 3, col + 6];
  }

  if (index === 0 || index === 4 || index === 8) { // diagonal check #1
    if (boxes[0].classList.length > 1 && boxes[0].classList[1] === boxes[4].classList[1] && boxes[4].classList[1] === boxes[8].classList[1]) {
      return ["left-diagonal", 0, 4, 8];
    }
  }

  if (index === 2 || index === 4 || index === 6) { // diagonal check #2
    if (boxes[2].classList.length > 1 && boxes[2].classList[1] === boxes[4].classList[1] && boxes[4].classList[1] === boxes[6].classList[1]) {
      return ["right-diagonal", 2, 4, 6];
    }
  }
};

const newGame = () => {
  game = true;
  counter = 0;
  turn = "blue";
  winData = undefined;
  board.classList.remove("game-over");
  board.classList.remove("yellow");
  board.classList.add("blue");
  gameText.className = "";

  if (errorIndex) {
    boxes[errorIndex].id = "";
    errorIndex = undefined;
  }

  for (const widget of document.getElementsByTagName("iframe")) { // rehides social media buttons
    widget.style.setProperty("visibility", "hidden", "important");
  }

  for (const box of boxes) { // clears boxes
    box.classList.remove("blue-box");
    box.classList.remove("yellow-box");
    box.classList.remove("win-box");
    box.innerHTML = "";
  }

  gameText.innerHTML = "Game on! Blue's turn";
};