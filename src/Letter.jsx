
// Needs to get a function for onclick
export default function Letter(props){


    const styles = {
        backgroundColor: !props.letter.guessed ? "#e4d20d" : props.letter.isInWord ? "#23820e" : "#820e0e"
    }

    return (
        <button style={styles} className="letterOption" onClick={props.handleClick}>{props.letter.char}</button>
    )

}

//  for (; i <= j; i++) {
//             newLettersArray.push({
//                 id: nanoid(),
//                 char: String.fromCharCode(i), 
//                 guessed: false, // if false - yellow, if true, check if in word or not, LOCKS for the entire game if false - should not be clicked
//                 isInWord: word.includes(String.fromCharCode(i)), // False or true, - is the letter included in the word? 
//             });
//         }