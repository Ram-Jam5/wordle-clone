/*-------------------------------- Constants --------------------------------*/
//fix checkword() currently concatenating enteredWord()
//fix randomWord to be truly random daily. 
// add win/loss messages to html
// increment guessNumber each time row++ 
// cases where the game breaks (more than 5 letters, guesses not in list etc)
const maxRows = 6;
const maxColumns =5;



/*-------------------------------- Variables --------------------------------*/
var row = 0;
var column = 0;
var guessNumber = 0;
var gameOver = false;
var guessedCorrectly = true;
var isWordChecked = false;

/*------------------------ Cached Element References ------------------------*/
const boardRows = document.querySelectorAll('.boardRow');
const boxes = document.querySelectorAll('.box');

/*----------------------------- Event Listeners -----------------------------*/
const keyButtonElement = document.querySelector('#keyboard'); // keyboard buttons

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
/*-------------------------------- Functions --------------------------------*/
let lastWordIndex =-1;
const today = new Date(); // create a new date object with current date
const randomWord = getWordToday(today);
console.log('Random word for today:', randomWord);


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
        const box = currentRow.querySelectorAll('.box')[column];
        if (!box.innerText && column < 5 && !isWordChecked) {
            box.innerText = key.toUpperCase();
            column++;
            if (column >= 5) {
                column = 0;
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
    const enteredWord = getUserWord().toUpperCase();
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


        if (correctLetterCount === maxColumns) {
            gameOver = true;
            guessedCorrectly = true;
            console.log('nice you got it')
        } else if (row === maxRows ) {
            gameOver = true;
            console.log('better luck next time')
        }
        row +=1;
    } else {
        console.log('here')
    } 
    
}

function inputEnterKey(enteredWord) {
    const wordLength = enteredWord.length;
  if (wordLength < 5) {
    console.log('not enough letters');
  } else {
    checkWord(enteredWord);
   
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
       column -=1;
       break; 
    }
  }
}



