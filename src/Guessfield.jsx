
export default function Guessfield(props){

    const letterArray = props.wordToGuess;
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

