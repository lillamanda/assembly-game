
import { useState } from "react";

import Letter from "./Letter.jsx"; 
import Languages from "./Languages.jsx";
import {nanoid} from "nanoid";


export default function Hangman() {

    const [wordToGuess, setWordToGuess] = useState()
    const [letterArray, setLetterArray] = useState(() => populateLetterArray("A", "Z"));


    function populateLetterArray(charA, charZ){
        
        const newLettersArray = []; 

        let i = charA.charCodeAt(0);
        let j = charZ.charCodeAt(0);

        for (; i <= j; i++) {
            newLettersArray.push({
                id: nanoid(),
                char: String.fromCharCode(i), 
                guessed: false, // if false - yellow, if true, check if in word or not, LOCKS for the entire game if false - should not be clicked
                inWord: false, // False or true, - is the letter included in the word? 
            });
        }

        return newLettersArray;
    }

    function handleCharacterClick(){
        console.log("character clicked")
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
            <Languages wrongGuesses={3}/>


            <div className="guessField">
                Render X blocks, X being the length of the word to be guessed
            </div>
            
            <div className="letters">
                {letterArray.map( (letter) => {
                    return <Letter key={letter.id} value={letter.char} handleClick={handleCharacterClick}/>})}
            </div>
            
            <button>New Game</button>
            
        </main>
    )
}