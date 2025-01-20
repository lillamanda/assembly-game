
import { useState } from "react";

import Letter from "./Letter.jsx"; 
import Languages from "./Languages.jsx";
import {nanoid} from "nanoid";
import Guessfield from "./Guessfield.jsx";
import Notification from "./Notification.jsx";


export default function Hangman() {
    // Missing things: 
        // Possibly adding API to get words
        // Attaching database?? 
        // Adding skulls on top of deleted languages
        // CSS Styles. Including cursor: pointer at letters/buttons that are ACTIVE

    // Notes from the course: 
        // Might use sections instead of divs
        // He put Languages in a separate js-file as an array of objects with name of language, backgroundcolor and color
        // Uses span instead of div on the letters/languages
        // Called the list of letters Keyboard - which makes more sense :p 
        // They used two useState: currentWord & guessedLetters
        // Sorted values at the top of the component into State values, Derived values and Static values
        // He did a list of different Farewell options for one language at a time (was not clear from the figma file who contained Farewell to TWO languages)
        // Add "disabled"-property to letter-buttons when game is over


    const wordsArray = ["POINT", "REACT", "BOOK", "REFACTOR"]
    const languages = ["HTML", "CSS", "JavaScript", "React", "Typescript", "Node.js", "Python", "Ruby", "Assembly"];

    const [letterArray, setLetterArray] = useState( () => populateLetterArray(wordsArray[Math.floor(Math.random()*(wordsArray.length))], "A", "Z"));

    let wordToGuess = fetchWordToGuess();
    console.log(wordToGuess)

    const wrongGuesses = letterArray.filter((letter) => letter.guessed && !letter.isInWord).length

    // Check if guesses > 8
    const gameLost = wrongGuesses >= 8;
    // Check if all letters are guessed
    const gameWon = wordToGuess.every(v => v.guessed === true);


    function populateLetterArray(word, charA, charZ){
        // debugger
        console.log(word)
        const newLettersArray = []; 
        const wordAsArray = word.split("");

        let i = charA.charCodeAt(0);
        let j = charZ.charCodeAt(0);

        for (; i <= j; i++) {
            const placesinWord = [];
            if (word.includes(String.fromCharCode(i))){
                wordAsArray.forEach((letter, index) => {
                    if(letter === String.fromCharCode(i)){
                        placesinWord.push(index);
                    };  
                });
            };

            newLettersArray.push({
                id: nanoid(),
                char: String.fromCharCode(i), 
                guessed: false, 
                isInWord: word.includes(String.fromCharCode(i)), 
                placesInWord: placesinWord
            });
        };  

        return newLettersArray; 

    }


    function fetchWordToGuess(){
        const lettersInWord = letterArray.filter((letter)=>letter.isInWord); 

        // Has to account for double letters
        const wordRightLength = [];
        for(let i = 0; i<lettersInWord.length; i++){
            if(lettersInWord[i].placesInWord.length>1){
                const places = lettersInWord[i].placesInWord;
                for(let j = 0; j<places.length; j++){
                    wordRightLength.push({...lettersInWord[i], placesInWord: places[j], id: `${lettersInWord[i].id}${j}`});
                }
            }
            else{
                wordRightLength.push(lettersInWord[i]);
            }
        }

        // Puts the letters in right order
        wordRightLength.sort((a, b) => a.placesInWord - b.placesInWord);

        return wordRightLength;

    }


    // Needs to check if game is done, - if the number of guesses > 8 whatever it is, or if the word is guessed
    function handleCharacterClick(charId){
        if(!gameLost && !gameWon){
            // Find letter in array, check if already guessed
            if (letterArray.find((letter) => letter.id === charId).guessed){
                console.log("Error, already guessed")
            }
            else{
                setLetterArray(oldLetterArray => {
                    const newArray = oldLetterArray.map((letter) => {
                        return letter.id === charId ? {...letter, guessed: true} : letter;
                    });
                    return newArray;
                })
            }
        }
    }

    function startNewGame(){
        setLetterArray(populateLetterArray(wordsArray[Math.floor(Math.random()*(wordsArray.length))], "A", "Z"));
    }


    return (
        <main>

            <div className="staticInfoDiv">
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </div> 
            
            <Notification gameWon={gameWon} gameLost={gameLost} languageArray={languages} wrongGuesses={wrongGuesses}/>

            <Languages languages={languages} wrongGuesses={wrongGuesses}/>

            <Guessfield wordToGuess={wordToGuess} gameLost={gameLost}/>
            
            <div className="letters">
                {letterArray.map( (letter) => {
                    return <Letter key={letter.id} letter={letter} handleClick={() => handleCharacterClick(letter.id)}/>})}
            </div>
            
            <button className="newGameBtn" onClick={startNewGame}>New Game</button>
            
        </main>
    )
}