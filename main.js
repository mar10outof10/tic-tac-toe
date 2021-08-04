const gameText = document.getElementById('game-text');
const boxes = document.getElementsByClassName('box');

const gridMap = ["top-left", "top", "top-right", "left", "middle", "right", "bottom-right", "bottom", "bottom-left"];

let blueBoxes = [];
let yellowBoxes = [];
let c = 0;

let turn = "blue";