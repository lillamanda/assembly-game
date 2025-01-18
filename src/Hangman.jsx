
import { useState } from "react";

import Letter from "./Letter.jsx"; 
import Languages from "./Languages.jsx";
import {nanoid} from "nanoid";
import Guessfield from "./Guessfield.jsx";


export default function Hangman() {
    const wordsArray = ["POINT", "REACT", "BOOK", "REFACTOR"]

    const [letterArray, setLetterArray] = useState(() => populateLetterArray(wordsArray[Math.floor(Math.random()*(wordsArray.length))], "A", "Z"));


    // This is an Array, not a word - make it into a string if so
    const wordToGuess = fetchWordToGuess();
    console.log(wordToGuess)
    // console.log(guess)
    // console.log(fetchWordToGuess().wordToGuess)
    // if(fetchWordToGuess().wordToGuess.every(v => {v.guessed === true})){
    //     console.log("GAME WON")
    // }

    function populateLetterArray(word, charA, charZ){
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


    // When there's two identical letters in the word, this function returns an array with identical keys - which gives an error 
    function fetchWordToGuess(){
        const lettersInWord = letterArray.filter((letter)=>letter.isInWord); 

        // Has to account for double letters
        const wordRightLength = [];
        for(let i = 0; i<lettersInWord.length; i++){
            if(lettersInWord[i].placesInWord.length>1){
                const places = lettersInWord[i].placesInWord;
                for(let j = 0; j<places.length; j++){
                    wordRightLength.push({...lettersInWord[i], placesInWord: places[j]});
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


    return (
        <main>
            <div className="staticInfoDiv">
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </div> 
            
            <div className="userFeedback">
                {/* End of game message - You win! or Game over! */}
            </div>   

            <Languages wrongGuesses={letterArray.filter((letter) => letter.guessed && !letter.isInWord).length}/>

            <Guessfield wordToGuess={wordToGuess}/>
            
            <div className="letters">
                {letterArray.map( (letter) => {
                    // value={letter.char} guessed={letter.guessed} isInWord={letter.isInWord}
                    return <Letter key={letter.id} letter={letter} handleClick={() => handleCharacterClick(letter.id)}/>})}
            </div>
            
            <button>New Game</button>
            
        </main>
    )
}