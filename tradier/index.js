const
    config = require('./config'),
    superagent = require('superagent')


// curl -H"Accept: application/json" -H "Authorization: Bearer s2G7B3ihhp36AzkSrgvP7aVuwn8Y" https://sandbox.tradier.com/v1/markets/search?q=technology


const _fetch = (command) => {    
    return superagent.get(`${config.url}/${command}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${config.access_token}`)    
        .then(response => response.body)
        .catch(error => error.response.body)
}

exports.getSearchResults = (searchTerm) => {
        return _fetch(`markets/search?q=${searchTerm}`)
}

exports.getQuote = (symbol) => {
    return _fetch(`/markets/quotes?symbols=${symbol}`)
}