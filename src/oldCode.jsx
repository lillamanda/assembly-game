    // To be deleted
    const [languageArray, setLanguageArray] = useState(() => getProgrammingLanguages());

    // I dont need this, I can deduce how many languages are supposed to be crossed out by how many wrong guesses - how many letters are guessed AND !inWord
    // Can prob move the const inside of Language.jsx, rename to Languages - then pass an argument saying how many words are guessed, then it renders
    function getProgrammingLanguages(){
        const languages = ["HTML", "CSS", "JavaScript", "React", "Typescript", "Node.js", "Python", "Ruby", "Assembly"];

        const languageArray = languages.map( language => {
            const languageObject = {
                language: language,
                inPlay: true,
                id: nanoid()
            }

            return languageObject;
        })


        return languageArray;
    }
    