const
    comics = require('comics'),
    inquirer = require('inquirer')

const search = (movie) => {
    let myMovies = []
    let myMovieNames = []

    comics.movies(movie)
        .then(result => {
            
            if (result.status_code === 1 && result.number_of_total_results >= 1)
            {
                result.results.forEach(element => {
                    const myMovie = []
                    myMovie.push(element.id)
                    myMovie.push(element.name)
                    
                    myMovies.push(myMovie)
                    myMovieNames.push(myMovie[1])
                })

                return inquirer.prompt([{
                    type: 'list',
                    message: `select a movie to see more details(${myMovieNames.length} results).`,
                    name: 'movie',
                    choices: myMovieNames
                }])
                .then((answers) => {
                    let id = -1
                    
                    myMovies.forEach(element =>
                    {
                        if (answers.movie === element[1])
                        {
                            id = element[0]
                        }
                    })

                    fetchDetails(id);
                })
                .catch(error => {
                    console.log(error)
                })
            }
            else
            {
                console.log("No results found.")
            }
        })
        .catch(error => {
            console.log(error)
        })
}

const fetchDetails = (movieID) => {
    comics.movieDetails(movieID)
    .then(result => {
        result.results.forEach(element => {
            console.log("\n==================== Movie Details ===============")
            console.log(`Movie Name: \t${element.name}`)
            console.log(`ID: \t\t${element.id}`)
            console.log(`Release Date: \t${element.release_date}`)
            console.log(`Runtime: \t${element.runtime} minutes`)
            
            if (element.budget === null)
            {
                console.log("Budget: \tBudget is not disclosed")
            }
            else
            {
                console.log(`Budget: \t$${element.budget}`)
            }
            if (element.summary === null)
            {
                console.log(`Summary: \tOops. No Summary`)
            
            }
            else
            {
                console.log(`Summary: \t${element.deck}`)
            

            }
            console.log("\n==================== =End= Details ===============")
            
            console.log("\n")
        })
    })
    .catch(error => {
        console.log(error)
    })
}

const charsearch = (character) =>{
    let chars = []
    let charsNames =[]
 
    comics.characters(character)
    .then(result =>{
        if(result.status_code === 1 && result.number_of_total_results>=1){
            result.results.forEach(element => {
                const char = []
                char.push(element.id)
                char.push(element.name)
 
                chars.push(chars)
                charsNames.push(chars[1])
            })
 
            return inquirer.prompt([{
                type: 'list',
                message: `select a character for more detail (${charsNames.length} results).`,
                name: 'character',
                choices: charsNames
            }])
            .then((answer) =>{
                let id = -1
                chars.forEach(element =>{
                    if (answer.character === element[1])
                    {
                        id = element[0]
                    }
                })
                fetchCharDetails(id);
            })
            .catch(error =>{
                console.log(error)
            })
        }else{
            console.log("No results.")
        }
 
     })
        .catch(error =>{
        console.log(error)
    })
    }
    const fetchCharDetails = (characterID) =>{
        comics.charactersDetails(characterID)
        .then(result => {
            result.results.forEach(element =>{
                console.log('Character Details')
                console.log(`ID: \t\t${element.id}`)
                console.log(`Gender: \t${element.gender}`)
                console.log(`Deck: \t\t${element.deck}`)
                console.log(`Teams: \t\t${element.teams}`)
                console.log(`Real Name: \t${element.real_name}`)
            })
            })
            .catch(error => {
                console.log(error)
            })
        }


module.exports = {
    search,
    charsearch
}