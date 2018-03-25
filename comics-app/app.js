const
    comics = require('comics'),
    inquirer = require('inquirer')

/*
const draw = (shuffle, n = 1) => {
    cards.deck(shuffle)
        .then(deck => cards.draw(deck.deck_id, n))
        .then(result => {
            result.cards.forEach(card => {
                console.log(`${card.value} of ${card.suit}`)
            })

            console.log('-- REMAINING CARDS --')
            console.log(result.remaining)
        })
        .catch(error => {
            console.log(error)
        })
}
*/

/*
const play = () => {
    let deckIDNumber = -1
    cards.deck(true)
        .then(deck => {
            deckIDNumber = deck.deck_id
            return cards.draw(deck.deck_id, 5)
        })
        .then(result => {
            console.log('--- CARDS ---')
            result.cards.forEach(card => {
                console.log(`${card.value} of ${card.suit}`)
            })
            
            console.log('\n--- REMAINING CARDS ---')
            console.log(result.remaining)
            
            discardPrompt(result)
        })
        .catch(error => {
            console.log(error)
        })
}
*/
/*
const play = () => {
    let deckIDNumber = -1
    cards.deck(true)
        .then(deck => {
            deckIDNumber = deck.deck_id
            return cards.draw(deck.deck_id, 5)
        })
        .then(result => {
            console.log('--- CARDS ---')
            result.cards.forEach(card => {
                console.log(`${card.value} of ${card.suit}`)
            })
            
            console.log('\n--- REMAINING CARDS ---')
            console.log(result.remaining)
            
            discardPrompt(result)
        })
        .catch(error => {
            console.log(error)
        })
}
*/

/*
const discardPrompt = (result) => {
    let arr = []
    
    result.cards.forEach(card => {
        arr.push(`${card.value} of ${card.suit}`)
    })

    return inquirer.prompt([{
        type: 'checkbox',
        message: 'select cards to throw away',
        name: 'cards',
        choices: arr,
        validate: (answer) => {
            if (answer.length < 5 && answer.length >= 0) {
                return true
            }
            
            return '\nYou must choose no more than 4 cards to throw away.'
        }
    }]).then(answers => {
        removeCards(arr, answers)   
    })
    .then(() => {
        cards.draw(result.deck_id, 5 - arr.length)
                .then(deck => {
                    deck.cards.forEach(card => {
                        arr.push(`${card.value} of ${card.suit}`)
                    })
                    
                    print(arr, deck.remaining)
                    //console.log(arr)
                    // console.log(`deck.remaining: ${deck.remaining}`)
                })
                .catch(error => {
                    console.log(error)
                })
        
    })
    .catch(error => {
        console.log(error)
    })
}
/*

/*
const removeCards = ( currentHand, throwawayCards) => {
        currentHand.forEach((card) => {
            const num = currentHand.indexOf(card)
            throwawayCards.cards.forEach(cardThrow => {
                const num2 = throwawayCards.cards.indexOf(cardThrow)
                
                if (currentHand[num] === throwawayCards.cards[num2])
                {
                    console.log(`Removing: ${throwawayCards.cards[num2]}`)

                    currentHand.splice(num, 1)
                }
            })
        })

        return currentHand
}
*/

/*
const print = (cards, remaining) => {
    console.log('--- CARDS ---')
    
    for (let i = 0; i < cards.length; i++) {
          console.log(cards[i])
    }
    

    console.log('--- REMAINING CARDS ---')
    console.log(`cards remainng: ${remaining}`)
}
*/

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
                // console.log(myMovie[1])
                
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