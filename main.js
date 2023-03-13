const title = document.querySelector('.title');
const boxes = document.querySelectorAll('.box');
const restartBtn = document.querySelector('#restartBtn');
const messageWrap = document.querySelector('.message-wrap');
messageWrap.style.display = 'none';

const O_text = 'O';
const X_text = 'X';
let currentPlayer = X_text;
let spaces = Array(9).fill(null);

boxes.forEach((box) => box, addEventListener('click', boxClicked));

function boxClicked(e) {
  const id = e.target.id;
  let value = e.target.innerText;

  if (!spaces[id] && value == '') {
    playSoundEffect('click')
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    winner()
    currentPlayer = currentPlayer == X_text ? O_text : X_text;
  }
}

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function winner() {
  let win = false;
  
  winningCombination.forEach((combination) => {
    if (win == true) {
        return;
    }
    const [a, b, c] = combination;
    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      win = true;
      title.innerText = `${currentPlayer} has won`;
      boxesdisplay('none');
      playSoundEffect('win')
      return;
    }
  });
  if (!win) gameDraw();
}

function gameDraw(){
  let empty = 0;
  for (let i = 0; i < spaces.length; i++) {
    if (spaces[i] == null) {
      empty++;
    }
  }
  if(empty == 0){
    title.innerText = 'match draw!';
    boxesdisplay('none');
    playSoundEffect('draw')
  }
}


restartBtn.onclick = function () {
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerHTML = '';
  });
  currentPlayer = X_text;
  title.innerText = 'Tic Tac Toe';
  messageWrap.style.display = 'none';
  boxesdisplay('flex');
};

function boxesdisplay(value) {
  boxes.forEach((box) => {
    box.style.display = value;
  });
}

function playSoundEffect(sound) {
  let soundEffect;
  switch(sound){
    case 'win' : soundEffect = new Audio('./sound/win.mp3'); break;
    case 'draw' : soundEffect = new Audio('./sound/draw.mp3'); break;
    case 'click' : soundEffect = new Audio('./sound/chalk.mp3'); break;
  }
  soundEffect.play();
}
