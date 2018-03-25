const
    config = require('./config'),
    superagent = require('superagent')
    
const _fetch = (resource,command) => {
    return superagent.get(`${config.url}/${resource}/?api_key=${config.apiKey}&format=json&${command}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

//what the query should look like 
//&query=Asgard&resources=location
//if user wants to search something prompt them what catergory and then let them type something.
//example url
//https://comicvine.gamespot.com/api/search/?api_key=9498a9126520c01be2793d049154fb19cf9282af&format=json&query=Asgard&resources=location&field_list=name
exports.search = (resource,query) =>{
    return _fetch("search",`query=${query}&resources=${resource}&field_list=name`)
}

//example url
//https://comicvine.gamespot.com/api/movies/?api_key=9498a9126520c01be2793d049154fb19cf9282af&format=json&field_list=name,budget,deck,runtime&filter=name:inception
exports.movies =(query)=>{
    return _fetch("movies",`field_list=id,name&filter=name:${query}`)
}

exports.movieDetails = ( query) => {
    return _fetch("movies",`field_list=id,name,budget,deck,runtime,release_date,characters&filter=id:${query}`)
}

//Same as movies kinda only showing name,gender, summary, and real name
exports.characters=(query)=>{
    return _fetch("characters",`field_list=name,gender,deck,teams,real_name&filter=name:${query}`)
}