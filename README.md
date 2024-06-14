# Wordle Clone

 ![Grid of boxes with some colored green, some greyed out, one yellow](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Wordle_Logo.svg/512px-Wordle_Logo.svg.png?20220624170852)


***Wordle*** is a fun guessing game that anyone can play! (img of wordle website here) This is a game I play daily with my friends. A fun way to challenge ourselves in a competetive way! Share your scores with your friends and become the Wordle champion!
## How To Play
A 5-letter word will be chosen at random when you load the game. The goal of the game is to guess 5 letter words within 6 guesses.
1. Any letters that you guess that also correspond to the same position of the word to guess will appear as green on both the keyboard and the board box. This lets you know a letter is correct in your guess position and the word to guess position. 
2. If a letter is found in the guess word but in the wrong positon, this letter will appear yellow on both the keyboard and the board box. Informing you that this letter you guessed is within the word to guess just not in the right spot. Try again with this letter in a different position!
3. If any letter you guess isn't contained within the word to guess these boxes become grayed out on the board and the keyboard letters will also be grayed out. Don't use these letters in future guesses as you know the word doesn't contain it!
4. These are the basic rules to the game. The win condition is to guess the word correctly within 6 guesses. If the player fails to guess the word in 6 guesses the player will lose.

Try your luck here at my [Wordle](https://ram-jam5.github.io/wordle-clone/).
> Can you beat your friends? Share your score and how many guesses it took for you to get it!

### Attributions: I utilized a word list from [here](https://github.com/MrJanHorak/wordle-solution-helper/blob/main/src/data/wordle-words.json). This allowed me to simplify populating a word list.
### Technologies Used: This project was completed with HTML, JavaScript, and CSS.

## Next Steps:
1. In the future I look to fully randomize the word. It's currently indexing to the next word daily.
2. I would like to account for any edge cases as well as any portions of the code that are broken.
3. Add new features such as an alternative game mode where the player will guess the last names of Soccer players.