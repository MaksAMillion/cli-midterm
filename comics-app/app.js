const
    comics = require('comics'),
    inquirer = require('inquirer')

const search = (movie) => {
    let myMovies = []
    let myMovieNames = []

    comics.movies(movie)
        .then(result => {
            result.results.forEach(element => {
                const myMovie = []
                myMovie.push(element.id)
                myMovie.push(element.name)
                myMovie.push(element.budget)
                myMovie.push(element.deck)
                myMovie.push(element.runtime)
                
                myMovies.push(myMovie)
                myMovieNames.push(myMovie[1])
            })

            return inquirer.prompt([{
                type: 'list',
                message: `select a movie to see more details(${myMovieNames.length} results).`,
                name: 'movies',
                choices: myMovieNames,
                validate: (answer) => {
                    return true
                }
            }])
            .then(() => {
                console.log("this is the then part")
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })

    
}

const fetchByID = () => {

}

module.exports = {
    search,
    fetchByID
}