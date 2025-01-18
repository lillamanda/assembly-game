
export default function Letter(props){

    // Add that if letter is guessed, it should also not have a cursor: pointer; property to indicate it is no longer clickable
    const styles = {
        backgroundColor: !props.letter.guessed ? "#e4d20d" : props.letter.isInWord ? "#23820e" : "#820e0e"
    }

    return (
        <button style={styles} className="letterOption" onClick={props.handleClick}>{props.letter.char}</button>
    )

}