var row = 0;
var column = 0;
var guessNumber = 0;
var gameOver = false;
var guessedCorrectly = true;
var isWordChecked = false;

const maxRows = 6;
const maxColumns =5;
const attemptedWords = [];
const winMessageElement = document.getElementById('winMessage');
const lossMessageElement = document.getElementById('lossMessage');
const guessNumberElement = document.getElementById('guessNumber');
const notInWordBanksElement = document.getElementById('notInWordBanks');
const notEnoughLettersElement = document.getElementById('notEnoughLetters');
const boardRows = document.querySelectorAll('.boardRow');
const boxes = document.querySelectorAll('.box');
const keyButtonElement = document.querySelector('#keyboard'); 

keyButtonElement.addEventListener('click', (event) => {
    const clickedKey = event.target;
    const keyPressed = clickedKey.innerText
    if (isKeyLetter(keyPressed)) {
        inputLetterKey(keyPressed);
    }else if (keyPressed === "Enter") {
        const enteredWord = getUserWord();
        inputEnterKey(enteredWord);
    }else if (keyPressed === "&#x232b;"){
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

var lastWordIndex =-1;
const today = new Date(); 
const randomWord = getWordToday(today);

function getWordToday(date) {
    let day = date.getDate();
    let index = (day % wordBanks.length);
    if (index === lastWordIndex){
        index = (index +1) % wordBanks.length;
    }
    lastWordIndex = index;
    return wordBanks[index];
}



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
function clearRow() {
    const currentRow =boardRows[row];
    const boxes = currentRow.querySelectorAll('.box');
    boxes.forEach(box => { 
        box.innerText = '';
    });
}

function checkWord() {
    const enteredWord = attemptedWords[attemptedWords.length - 1];
    console.log(enteredWord)
    const wordBanksUpperCase = wordBanks.map(word => word.toUpperCase());

    if (wordBanksUpperCase.includes(enteredWord)) {
        const boxes = boardRows[row].querySelectorAll('.box');
        var correctLetterCount = 0;

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
function nextRow() {
    row++;
    if (row >= boardRows.length) {
        
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



