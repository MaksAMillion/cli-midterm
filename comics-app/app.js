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
            console.log(result)
            if(result.status_code === 1 && result.number_of_total_results >= 1){
                result.results.forEach(element => {
                    const char = []
                    char.push(element.id)
                    char.push(element.name)
 
                    chars.push(char)
                charsNames.push(`${char[0]} -- ${char[1]}`)
            })
 
            return inquirer.prompt([{
                type: 'list',
                message: `select a character for more details (${charsNames.length} results).`,
                name: 'character',
                choices: charsNames
            }])
            .then((answer) =>{
                let id = -1
                chars.forEach(element =>{
                    if (answer.character === `${element[0]} -- ${element[1]}`)
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
                console.log('\nCharacter Details *****************')
                console.log(`ID: \t\t${element.id}`)
                if (element.gender === 2)
                {
                    console.log(`Gender: \tFemale`)
                }
                else if (element.gender === 1)
                {
                    console.log(`Gender: \tMale`)
                }
                else if (element.gender === undefined)
                {}
                if (element.deck !== null)
                {
                    console.log(`Deck: \t\t${element.deck}`)
                }
                if (element.teams !== undefined)
                {
                    console.log(`Teams: \t\t${element.teams}`)
                }
                if (element.real_name === null)
                {
                    console.log(`Real Name: \tUnknown`)
                }
                else
                {
                    console.log(`Real Name: \t${element.real_name}`)
                }

                if (element.first_appeared_in_issue !== null)
                {
                    if (element.first_appeared_in_issue.id !== null && element.first_appeared_in_issue.name !== null)
                    {
                        console.log(`First Issue: \t${element.first_appeared_in_issue.id} -- ${element.first_appeared_in_issue.name} `)
                    }
                }
                console.log(`Publisher: \t${element.publisher.name}`)
                
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