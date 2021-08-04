const gameText = document.getElementById('game-text');
const boxes = document.getElementsByClassName('box');

const gridMap = ["top-left", "top", "top-right", "left", "middle", "right", "bottom-right", "bottom", "bottom-left"];

let blueBoxes = [];
let yellowBoxes = [];
let c = 0;

let turn = "blue";

const boxClick = (index) => {
  const box = boxes[index];
  if (box.classList.length > 1) {
    return gameText.innerHTML = "Hey! That spot is already taken!"
  }
  c++;
  if (turn === "blue") {
    box.classList.add("blue-box");
    blueBoxes.push(index);
    turn = "yellow";
    gameText.innerHTML = `Blue piece played in ${gridMap[index]} spot! Yellow's turn!`
  } else {
    box.classList.add("yellow-box");
    yellowBoxes.push(index);
    turn = "blue";
    gameText.innerHTML = `Yellow piece played in ${gridMap[index]} spot! Blue's turn!`
  }
  if (c >= 5) { // minimum 5 pieces before victory possible
    if (victoryCheck(blueBoxes)) {
      // blue wins
    } else if (victoryCheck(yellowBoxes)) {
      // yellow wins
    }
  }

  if (c >= 9) {
    // nobody wins
  }
  console.log(c);
};