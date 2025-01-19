import {nanoid} from "nanoid";

export default function Languages(props){

    const languageArray = props.languages.map( (language, index) => {
        let styles = {
            backgroundColor: "#000",
            color: "#fff"
        };      
        
        switch (language){
            case 'HTML':
                styles= {
                    backgroundColor: "#E2680F",
                    color: "#F9F4DA"
                };
                break;
    
            case "CSS":
                styles={
                    backgroundColor: "#328AF1",
                    color: "#F9F4DA"
                };
                break;
    
            case "JavaScript":
                styles={
                    backgroundColor: "#F4EB13",
                    color: "#1E1E1E"
                };
                break;
    
            case "React":
                styles={
                    backgroundColor: "#2ED3E9",
                    color: "#1E1E1E"
                };
                break;    
            case "Typescript":
                styles={
                    backgroundColor: "#298EC6",
                    color: "#F9F4DA"
                };
                break;   
            case "Node.js":
                styles={
                    backgroundColor: "#599137",
                    color: "#F9F4DA"
                };
                break;   
            case "Python":
                styles={
                    backgroundColor: "#FFD742",
                    color: "#282726"
                };
                break;   
            case "Ruby":
                styles={
                    backgroundColor: "#D02B2B",
                    color: "#F9F4DA"
                };
                break;   
            case "Assembly":
                styles={
                    backgroundColor: "#2D519F",
                    color: "#F9F4DA"
                };
                break;   
            default:
                break;
        }

        if(index<props.wrongGuesses){
            return <div key={nanoid()} style={styles} className={`language notInPlay`}>{language}</div>
        }
        else{
            return <div key={nanoid()} style={styles} className={`language`}>{language}</div>
        }
    })


    return (
        <div className="programmingLanguages">
            {languageArray}
        </div>
    )
}
