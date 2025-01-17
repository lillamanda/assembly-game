
import { useState } from "react";

import Letter from "./Letter.jsx"; 
import Languages from "./Languages.jsx";
import {nanoid} from "nanoid";


export default function Hangman() {
    const wordsArray = ["POINT", "REACT", "BOOK", "REFACTOR"]

    const [wordToGuess, setWordToGuess] = useState("BOOK")//() => wordsArray[Math.floor(Math.random()*(wordsArray.length))])
    const [letterArray, setLetterArray] = useState(() => populateLetterArray(wordToGuess, "A", "Z"));

    console.log(wordToGuess)

    //This should take in wordToGuess
    function populateLetterArray(word, charA, charZ){
        console.log(word)
        const newLettersArray = []; 

        let i = charA.charCodeAt(0);
        let j = charZ.charCodeAt(0);

        for (; i <= j; i++) {
            newLettersArray.push({
                id: nanoid(),
                char: String.fromCharCode(i), 
                guessed: false, // if false - yellow, if true, check if in word or not, LOCKS for the entire game if false - should not be clicked
                isInWord: word.includes(String.fromCharCode(i)) // False or true, - is the letter included in the word? 
            });
        }

        console.log(newLettersArray)
        return newLettersArray; 

    }

    //Needs to also add classes to clicked ?? or send that properly into Letter for display
    function handleCharacterClick(charId){
        console.log("character clicked");
        console.log(letterArray.find((letter) => letter.id === charId).guessed)

        // Find letter in array, check if already guessed
        if (letterArray.find((letter) => letter.id === charId).guessed){
            console.log("Error, already guessed")
        }
        else{
            console.log("else is run")
            setLetterArray(oldLetterArray => {
                const newArray = oldLetterArray.map((letter) => {
                    return letter.id === charId ? {...letter, guessed: true} : letter;
                });
                return newArray;
            })
        }

        
        // change guessed to true, updateLetterArray

        // check if character.isInWord - not needed? already sorted
        // if isInWord, reveal letter in guessfield - should also sort with guessField logic, based on letterArray
        // if !isInWord, dont do anything? rerender would sort it with Languages-logic

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

            {/* wrong guesses needs to be based on chararray */}
            <Languages wrongGuesses={letterArray.filter((letter) => letter.guessed).length}/>

            <div className="guessField">
                Render X blocks, X being the length of the word to be guessed
            </div>
            
            <div className="letters">
                {letterArray.map( (letter) => {
                    // value={letter.char} guessed={letter.guessed} isInWord={letter.isInWord}
                    return <Letter key={letter.id} letter={letter} handleClick={() => handleCharacterClick(letter.id)}/>})}
            </div>
            
            <button>New Game</button>
            
        </main>
    )
}