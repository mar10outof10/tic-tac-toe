const gameText = document.getElementById('game-text');
const board = document.getElementsByClassName('board')[0];
const boxes = document.getElementsByClassName('box');
const gridMap = ["top-left", "top", "top-right", "left", "middle", "right", "bottom-left", "bottom", "bottom-right"];

console.log('asdf', gameText); 

let counter;
let turn;
let winner;

let blueMoves;
let yellowMoves;

let game = true;

const boxClick = (index) => {
  if (!game) {
    return gameText.innerHTML = "Click the button for a new game!";
  }
  const box = boxes[index];
  if (box.classList.length > 1) {
    return gameText.innerHTML = "Hey! That spot is already taken!";
  }

  counter++;
  board.classList.remove(turn);

  if (turn === "blue") {
    box.classList.add("blue-box");
    turn = "yellow";
    gameText.innerHTML = `Blue played in the ${gridMap[index]} spot! Yellow's turn!`;
  } else {
    box.classList.add("yellow-box");
    turn = "blue";
    gameText.innerHTML = `Yellow played in the ${gridMap[index]} spot! Blue's turn!`;
  }

  board.classList.add(turn);

  if (counter >= 5) { // minimum 5 pieces before victory possible
    winner = victoryCheck(index);
  }
  if (winner) {
    game = false;
    return gameText.innerHTML = `${winner[0]} you're a winner!`;
  }
  if (counter >= 9) {
    gameText.innerHTML = "Nobody wins! Darn";
  }
};

const victoryCheck = (index) => { // receives index, checks game grid. Returns array in format ["winner", #, #, #] where each # is a coordinate of the winning piece
  const row = Math.floor(index / 3) * 3; // gives first index of row 
  if (boxes[row].classList.length > 1 && boxes[row].classList[1] === boxes[row + 1].classList[1] && boxes[row + 1].classList[1] === boxes[row + 2].classList[1]) {
    return [boxes[row].classList[1].split('-')[0], row, row + 1, row + 2]
  }
  console.log(boxes[row].classList[1] === boxes[row + 1].classList[1] === boxes[row + 2].classList[1]);
  const col = index % 3;
  if (boxes[col].classList.length > 1 && boxes[col].classList[1] === boxes[col + 3].classList[1] && boxes[col + 3].classList[1] === boxes[col + 6].classList[1]) {
    return [boxes[col].classList[1].split('-')[0], col, col + 3, col + 6]
  }
  if (index === 0 || index === 4 || index === 8) { // diagonal check #1
    if (boxes[0].classList.length > 1 && boxes[0].classList[1] === boxes[4].classList[1] && boxes[4].classList[1] === boxes[8].classList[1]) {
      return [boxes[4].classList[1].split('-')[0], 0, 4, 8]
    }
  }
  if (index === 2 || index === 4 || index === 6) { // diagonal check #2
    if (boxes[2].classList.length > 1 && boxes[2].classList[1] === boxes[4].classList[1] && boxes[4].classList[1] === boxes[6].classList[1]) {
      return [boxes[4].classList[1].split('-')[0], 2, 4, 6]
    }
  }
};

const newGame = () => {
  game = true;
  counter = 0;
  let turn = "blue";
  winner = false;
  yellowMoves = new Set();
  blueMoves = new Set();

  for (const box of boxes) {
    box.classList.remove('blue-box');
    box.classList.remove('yellow-box');
  }

  gameText.innerHTML = "Game on! Blue's turn"
}