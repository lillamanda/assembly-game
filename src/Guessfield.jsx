
export default function Guessfield(props){

    const letterArray = props.wordToGuess;
    const guessField = [];


    if(props.gameLost){
        for(let i= 0; i<letterArray.length; i++){
            const styleIfLost = {
                color: "#820e0e"
            }

            if(letterArray[i].guessed){
                guessField.push(<div key={letterArray[i].id} className="guessChar">{letterArray[i].char}</div>)
            }

            else{
                guessField.push(<div key={letterArray[i].id} style={styleIfLost} className="guessChar">{letterArray[i].char}</div>)
            }

        }
    }

    else{
        for(let i= 0; i<letterArray.length; i++){
            guessField.push(<div key={letterArray[i].id} className="guessChar">{letterArray[i].guessed ? letterArray[i].char : ""}</div>)
        }
    }

    return (
        <div className="guessField">
            {guessField}
        </div>
    );
}

