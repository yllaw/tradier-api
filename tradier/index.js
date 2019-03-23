const
    config = require('./config'),
    superagent = require('superagent')


// curl -X GET "https://sandbox.tradier.com/v1/markets/quotes?symbols=spy" \
//      "Accept: application/json"
//      -H "Authorization: Bearer s2G7B3ihhp36AzkSrgvP7aVuwn8Y" \
//      -m 30 \
//      -v

// curl -H"Accept: application/json" -H "Authorization: Bearer s2G7B3ihhp36AzkSrgvP7aVuwn8Y" https://sandbox.tradier.com/v1/markets/search?q=advanced

 // curl -H"Accept: application/json" -H "Authorization: Bearer s2G7B3ihhp36AzkSrgvP7aVuwn8Y" https://sandbox.tradier.com/v1/markets/quotes?symbols=aapl
    

const _fetch = (command) => {    
    return superagent.get(`${config.url}/${command}`)
        .set('Accept', 'application/json')
        .set('Authorization: Bearer', `${config.access_token}`)    
        .then(response => response.body)
}

exports.getSearchResults = (search) => {
        return _fetch(`v1/markets/search?q=${search}`)
}

exports.getQuote = (symbol) => {
    return _fetch(`/v1/markets/quotes?symbols=${symbol}`)
}