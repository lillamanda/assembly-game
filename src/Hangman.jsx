
import { useState } from "react";

import Letter from "./Letter.jsx"; 
import Languages from "./Languages.jsx";
import {nanoid} from "nanoid";
import Guessfield from "./Guessfield.jsx";


export default function Hangman() {
    const wordsArray = ["POINT", "REACT", "BOOK", "REFACTOR"]

    // Do i split the word into an array? and mark that
    // const [wordToGuess, setWordToGuess] = useState(() => wordsArray[Math.floor(Math.random()*(wordsArray.length))])


    // Can i put the word in the letterarray with what placement it has to be on? like, isInWord: true, places: 1, 5. 
    // But I have to know the length of the word for the guessing field?? 
    const [letterArray, setLetterArray] = useState(() => populateLetterArray(wordsArray[Math.floor(Math.random()*(wordsArray.length))], "A", "Z"));

    // console.log(wordToGuess)
    console.log(letterArray)


    // const guess = getWordToGuess();
    // console.log(guess)
    // console.log(getWordToGuess().wordToGuess)
    // if(getWordToGuess().wordToGuess.every(v => {v.guessed === true})){
    //     console.log("GAME WON")
    // }

    // This should take in wordToGuess
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
                    console.log(letter)
                    console.log(i)
                    if(letter === String.fromCharCode(i)){
                        placesinWord.push(index);
                    };  
                });
            };
            console.log(placesinWord)

            newLettersArray.push({
                id: nanoid(),
                char: String.fromCharCode(i), 
                guessed: false, // if false - yellow, if true, check if in word or not, LOCKS for the entire game if false - should not be clicked
                isInWord: word.includes(String.fromCharCode(i)), // False or true, - is the letter included in the word? 
                placesInWord: placesinWord
            });
        };  

        console.log(newLettersArray)
        return newLettersArray; 

    }


    // WHY IS THIS RETURNING AN OBJECT AND NOT AN ARRAY?
    function getWordToGuess(){
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

        wordRightLength.sort((a, b) => a.placesInWord - b.placesInWord);

        return wordRightLength;


        // iterate over letterArray, return filtered array with letters in word, 
        // place these letters on proper place
        // In return function in THIS page, iterate over it to display letter (display:guessed/!guessed,)
    }


    // Needs to also add classes to clicked ?? or send that properly into Letter for display
    // Needs to check if game is done, - if the number of guesses > 8 whatever it is, or if the word is guessed
    function handleCharacterClick(charId){

        // Find letter in array, check if already guessed
        if (letterArray.find((letter) => letter.id === charId).guessed){
            console.log("Error, already guessed")
        }
        else{
            // console.log("else is run")
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

    // Can I iterate over words array to find the words and whether its guessed? 
    // No for loop - but filter to find letters in use? Draw boxes - Can i sort it after? 
    // iterate over filtered array to find word
    function displayGuessfield(){
        
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
            <Languages wrongGuesses={letterArray.filter((letter) => letter.guessed && !letter.isInWord).length}/>

            {/* <div className="guessField"> */}
            <Guessfield wordToGuess={getWordToGuess()}/>
            {/* </div> */}
            

            {/* <div className="guessField">
                Render X blocks, X being the length of the word to be guessed
                <Guessfield length={wordToGuess.length}/>
            </div> */}
            
            <div className="letters">
                {letterArray.map( (letter) => {
                    // value={letter.char} guessed={letter.guessed} isInWord={letter.isInWord}
                    return <Letter key={letter.id} letter={letter} handleClick={() => handleCharacterClick(letter.id)}/>})}
            </div>
            
            <button>New Game</button>
            
        </main>
    )
}