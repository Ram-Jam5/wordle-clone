document.addEventListener('DOMContentLoaded', function() {

let row = 0;
let column = 0;
let guessNumber = 0;
let gameOver = false;
let isWordChecked = false;

const maxRows = 5;
const maxColumns =5;
const attemptedWords = [];
const instructionsButton =document.getElementById('instructionsButton')
const instructions = document.getElementById('instructions')
const winMessageElement = document.getElementById('winMessage');
const lossMessageElement = document.getElementById('lossMessage');
const guessNumberElement = document.getElementById('guessNumber');
const notInWordBanksElement = document.getElementById('notInWordBanks');
const notEnoughLettersElement = document.getElementById('notEnoughLetters');
const boardRows = document.querySelectorAll('.boardRow');
const boxes = document.querySelectorAll('.box');
const keyButtonElement = document.querySelector('#keyboard'); 

//w3 schools toggling (hide/show element)
instructionsButton.addEventListener('click', function() {
    if (instructions.style.display === 'none' || instructions.style.display === '') {
        instructions.style.display = 'block';
    } else {
        instructions.style.display = 'none';
    }
});

keyButtonElement.addEventListener('click', (event) => {
    const clickedKey = event.target;
    const keyPressed = clickedKey.innerText
    if (isKeyLetter(keyPressed)) {
        inputLetterKey(keyPressed);
    }else if (keyPressed === "Enter") {
        const enteredWord = getUserWord();
        inputEnterKey(enteredWord);
    }else if (keyPressed === "⌫"){
        inputDeleteKey();
    }
});

document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;
    if (isKeyLetter(keyPressed)) {
        inputLetterKey(keyPressed);
    }else if (keyPressed === "Enter") {
        const enteredWord = getUserWord();
        inputEnterKey(enteredWord);
    }else if (keyPressed === "Backspace") {
        inputDeleteKey();
    }
});

function getWordToday() {
    const index = Math.floor(Math.random() * wordBanks.length);
    return wordBanks[index];
}
const randomWord = getWordToday();

function isKeyLetter(key) {
    return /^[a-zA-Z]$/.test(key);
}

function inputLetterKey(key) {
    if (!gameOver){
        const currentRow = boardRows[row];
        const boxes = currentRow.querySelectorAll('.box');
        if (column < boxes.length) {
            const box = boxes[column];
            if (!box.innerText && column < 5 && !isWordChecked) {
                box.innerText = key.toUpperCase();
                column++;
                if (column >= 5) {
                    column = 0;
                }
        }
        
        }
    }
   
    
}


function getUserWord() {
    let enteredWord = '';
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        enteredWord += box.innerText; 
    });
    return enteredWord;
}

function checkWord() {
    const enteredWord = attemptedWords[attemptedWords.length - 1];
    const wordBanksUpperCase = wordBanks.map(word => word.toUpperCase());
   
    if (wordBanksUpperCase.includes(enteredWord)) {
        const boxes = boardRows[row].querySelectorAll('.box');
       
        let correctLetterCount = 0;

        boxes.forEach((element, index) => {
            const enteredLetter = element.innerText.toUpperCase();
            const randomLetter = randomWord.toUpperCase().charAt(index);
            const letterInRandomWord = randomWord.toUpperCase().includes(enteredLetter);

            if (enteredLetter === randomLetter) {
                correctLetterCount += 1;
                element.classList.add('word-green');
            } else if (letterInRandomWord) {
                element.classList.add('word-yellow');
            } else {
                element.classList.add('word-gray');
            }
        });

        guessNumber++;

        if (correctLetterCount === maxColumns) {
            gameOver = true;
            guessedCorrectly = true;
            updateWinMessage(guessNumber);
        } else if (row === maxRows ) {
            gameOver = true;
            updateLossMessage(randomWord);
        }
        row +=1;
        notInWordBanksElement.textContent = "";
        notEnoughLettersElement.textContent = "";
    } else {
        updateNotInWordBanksMessage();
    }
    function updateWinMessage(totalGuesses) {
        const winText = `Congratulations! You guessed the word in ${totalGuesses}/6 guesses!`;
        winMessageElement.textContent = winText;
    }
    function updateLossMessage(randomWord){
        const lossMessage = `Sorry, you ran out of guesses. The word was ${randomWord}. Try again tomorrow.`;
        lossMessageElement.textContent = lossMessage;
    }
    function updateNotInWordBanksMessage(){
        const notInWordBanksMessage = "Sorry, word is not in word list.";
        notInWordBanksElement.textContent = notInWordBanksMessage;
    }
}

function updateNotEnoughLettersMessage() {
    const notEnoughLettersMessage = "Must enter 5 letters.";
    notEnoughLettersElement.textContent = notEnoughLettersMessage;
}
function inputEnterKey(enteredWord) {
    const wordLength = enteredWord.length;
    if (wordLength < 5) {
        updateNotEnoughLettersMessage();
  } else {
    const lettersGuessed =[];
    const boxes = boardRows[row].querySelectorAll('.box');
    boxes.forEach(box => {
        lettersGuessed.push(box.innerText.toUpperCase());
    });
    const letterWord = lettersGuessed.join('');
    attemptedWords.push(letterWord);
    checkWord();
   
  }
}  

function inputDeleteKey() {
  const letterElements = boardRows[row].querySelectorAll('.box');
  for (let index = letterElements.length -1; index >= 0; index--) {
    const element = letterElements[index];
    if (element.innerText !== '') {
       element.innerText = '';
       column --;
       if (column < 0) {
        column = 0;
       }
       break; 
    }
  }
}
});
