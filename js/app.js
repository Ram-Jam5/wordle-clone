/*-------------------------------- Constants --------------------------------*/
// word bank is already defined in the data.js sheet under const wordBanks
// let row = 0; // set initial  row position to input text
// let letter = 0; // set initial index to the first position when begining.
// const wordToday = 'placeholder for function that randomizes a word daily'
// let lastWordIndex = -1;
// todays word is ADAPT
// yesterday was ACUTE



/*-------------------------------- Variables --------------------------------*/



/*------------------------ Cached Element References ------------------------*/


/*----------------------------- Event Listeners -----------------------------*/
const keyButtonElement = document.querySelector('#keyboard'); // keyboard buttons
console.dir(keyButtonElement);

keyButtonElement.addEventListener('click', (event) => {
    const clickedKey = event.target;
    const keyPressed = clickedKey.textContent
    if (isKeyLetter(keyPressed)) {
        inputLetterKey(keyPressed);
    }else if (keyPressed === "Enter") {
        inputEnterKey();
    }else if (keyPressed === "&#x232b;"){
        inputDeleteKey();
    }
});

document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;
    if (isKeyLetter(keyPressed)) {
        inputLetterKey(keyPressed);
    }else if (keyPressed === "Enter") {
        inputEnterKey();
    }else if (keyPressed === "Backspace") {
        inputDeleteKey();
    }
});
/*-------------------------------- Functions --------------------------------*/
let lastWordIndex =-1;

function getWordToday(date) {
    let day = date.getDate();
    let index = day % wordBanks.length;
    if (index === lastWordIndex){
        index = (index +1) % wordBanks.length;
    }
    lastWordIndex = index;
    return wordBanks[index];
}


const today = new Date(); // create a new date object with current date
randomWord = getWordToday(today);
console.log('Random word for today:', randomWord);

function isKeyLetter(key) {
    return /^[a-zA-Z]$/.test(key);
}

function inputLetterKey(key) {
    const boxes = document.querySelectorAll('.box');
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i]
        if (!box.textContent){
            box.textContent = key.toUpperCase();
            return;
        }
    }
    
}

function inputEnterKey() {
    
}
function inputDeleteKey() {

}


/* 
select a random word, something to make sure this occurs only once daily for all users.
need to see if the user inputed 5 letters, 
    if not display "not enough letters"
I'll need a function to check if the submitted word is in the word list.
    if not needs to display message word not in list
I'll need another function to check if the submitted word contains any characters in the key
    if yes and in correct position change keyboard and box green
    if yes and not in correct position change keyboard and box yellow
    if no gray out box and keyboard
Need to track turns? 
How to implement iterating through the rows? 
win message
lose message
*/
