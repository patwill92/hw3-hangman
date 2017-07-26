const arr = ['Hello', 'Goodbye', 'Animal', 'Computer', 'Monkey'];
const gameDiv = document.querySelector('.correct-guesses');
const btnStart = document.querySelector('.start');
const btnYes = document.querySelector('#yes');
const btnNo = document.querySelector('#no');
let random, word, wordLength, wordArr, guessArray, errors, correctGuess, score;
let start = false;

function startGame() {
  document.querySelector('.intro').style.display = 'none';
  document.querySelector('.game').style.display = 'grid';
  random = Math.floor(Math.random() * arr.length);
  word = arr[random];
  wordLength = word.length;
  wordArr = word.split('');
  guessArray = [];
  errors = 0;
  score = 0;
  correctGuess = false;
  document.querySelector('.correct-guesses').innerHTML = '';
  wordArr.map((letter, i) => {
    wordArr[i] = letter.toLowerCase();
    gameDiv.insertAdjacentHTML('beforeend', '<div class="container"></div>');
  });
  document.querySelector('.game-results .img').remove();
  document.querySelector(`.game-results`).insertAdjacentHTML('beforeend', `<div class="img"></div>`);
  document.getElementById('text-field').textContent = '';
  document.getElementById('text-field').focus();
}

function check(input) {
  wordArr.map((letter, i) => {
    if (input.toLowerCase() === letter) {
      score++;
      document.querySelector(`.container:nth-child(${i + 1})`).insertAdjacentHTML('beforeend', '<p>' + input.toUpperCase() + '</p>');
      correctGuess = true;
    }
  });
  errors = correctGuess ? errors : errors + 1;
  addBodyPart(errors);
  correctGuess = false;
}

function addBodyPart(numErrors) {
  if (numErrors > 0) {
    document.querySelector('.game-results .img').remove();
    document.querySelector(`.game-results`).insertAdjacentHTML('beforeend', `<img class="img" src="assets/images/${numErrors}.png">`);
  }
}

btnStart.addEventListener('click', () => {
  start = true;
  startGame();
});

document.onkeyup = (event) => {
  let letterNumber = /[A-Za-z]/;
  if (start && letterNumber.test(event.key)) {
    if (guessArray.includes(event.key)) {
      alert("You've already chosen that letter!")
    } else {
      check(event.key);
      guessArray.push(event.key);
    }
    if (errors > 5) {
      start = false;
      document.querySelector('.restart').style.display = 'grid';
      document.querySelector('.loseTitle').style.display = 'block';
    }
    else if (score === wordLength){
      start = false;
      document.querySelector('.restart').style.display = 'grid';
      document.querySelector('.winTitle').style.display = 'block';
    }
  }
};

btnYes.addEventListener('click', () => {
  document.querySelector('.restart').style.display = 'none';
  document.querySelector('.loseTitle').style.display = 'none';
  document.querySelector('.winTitle').style.display = 'none';
  start = true;
  startGame();
});

btnNo.addEventListener('click', () => {
  location.reload()
});