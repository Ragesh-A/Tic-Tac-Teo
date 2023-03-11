const title = document.querySelector('.title');
const boxes = document.querySelectorAll('.box');
const restartBtn = document.querySelector('#restartBtn');

const O_text = 'O';
const X_text = 'X';
let currentPlayer = X_text;
let spaces = Array(9).fill(null);

boxes.forEach( box => box,addEventListener('click', boxClicked))

function boxClicked(e){
  const id = e.target.id;
  let value = e.target.innerText;

  if(!spaces[id] && value == ''){
    e.target.innerText = currentPlayer;
    currentPlayer = currentPlayer == X_text ? O_text : X_text
  }

}