
export default function Guessfield(props){

    // console.log(props)
    const letterArray = props.wordToGuess;
    // console.log(letterArray)
    const guessField = [];

    for(let i= 0; i<letterArray.length; i++){
        guessField.push(<div key={letterArray[i].id} className="guessChar">{letterArray[i].guessed ? letterArray[i].char : ""}</div>)
    }

    return (
        <div className="guessField">
            {guessField}
        </div>
    );
}

