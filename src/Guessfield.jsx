
export default function Guessfield(props){

    console.log(props.wordToGuess)
    const letterArray = props.wordToGuess;
    const guessField = [];

    // When clicking New Game, this randomly sometimes adds an extra block to five letter words. at the beginning. why? 


    if(props.gameLost){
        for(let i= 0; i<letterArray.length; i++){
            const styleIfLost = {
                color: "#820e0e"
            }
            // guessField.push(<div style={letterArray[i].guessed ? "" : styleIfLost} key={letterArray[i].id} className="guessChar">{letterArray[i].char}</div>)
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

