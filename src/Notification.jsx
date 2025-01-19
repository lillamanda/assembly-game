export default function Notification(props){

    function displayMessage(){
        if(props.gameWon){
            let styles = {
                backgroundColor: "#10A95B",
                color: "white"
            }
            return <div style={styles} className="notification"> <h1>You win!</h1> <p>Well done!</p> </div>
        };

        if(props.gameLost){
            let styles = {
                backgroundColor: "#BA2A2A",
                color: "white"
            }
            return <div style={styles} className="notification"> <h1>Game over!</h1> <p>You lose! Better start learning Assembly</p> </div>
        };

        if(props.wrongGuesses>0 && props.wrongGuesses<8){
            let styles = {
                backgroundColor: "#7A5EA7",
                color: "white"
            }

            const lostLanguages = [];
            for(let i=0; i<props.wrongGuesses; i++){
                lostLanguages.push(props.languageArray[i]);
            }

            return (
                <div style={styles} className="notification">
                    <p>Farewell {
                        lostLanguages.length<=1 ? 
                        lostLanguages.toString() : 
                        lostLanguages.slice(0, -1).join(", ")+" and "+lostLanguages.slice(-1)}
                    </p> 
                </div>)
        }
    }

    return (
        <>
            {displayMessage()}
        </>
    )
};