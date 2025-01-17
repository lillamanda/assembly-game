
// Needs to get a function for onclick
export default function Letter(props){


    const styles = {
        backgroundColor: !props.guessed ? "#e4d20d" : props.inWord ? "#23820e" : "#820e0e"
    }

    return (
        <button style={styles} className="letterOption" onClick={props.handleCharacterClick}>{props.value}</button>
    )
    
}