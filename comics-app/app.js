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
            console.log(`Summary: \t${element.deck}`)
            console.log(`Characters: \t${element.characters}`);
        })
        // console.log(result)
    })
    .catch(error => {
        console.log(error)
    })
}


const search2 = (movie) => {
    let myMovies = []
    let myMovieNames = []

    comics.search("location", movie)
        .then(result => {

            if (result.status_code === 1 && result.number_of_total_results >= 1)
            {
                result.results.forEach(element => {
                    console.log(element)
                    
                    /*
                    const myMovie = []
                    myMovie.push(element.id)
                    myMovie.push(element.name)
                    
                    myMovies.push(myMovie)
                    myMovieNames.push(myMovie[1])
                    */
                })
    
                /*
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
    
                    // fetchDetails(id);
                })
                .catch(error => {
                    console.log(error)
                })
                */
            }
            else
            {
                console.log("no results were found")
            }
            
        })
        .catch(error => {
            console.log(error)
        })
}

module.exports = {
    search,
    search2
}