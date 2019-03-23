const
    tradier = require('tradier'),
    inquirer = require('inquirer')

const print = (results) => {
    const equities = results.securities.security;

    console.log(`\n --- Stocks ---`)
    if (equities.length > 1) {
        equities.forEach(stock => {
            //template literal formatting
            console.log(`${stock.symbol}     ${stock.description}
        `)
        })
    } else {
        //template literal formatting
        console.log(`${equities.symbol}     ${equities.description}
        `)
        
    }
}


async function search(searchTerm = 'apple') {
    const results = await tradier.getSearchResults(searchTerm)
    print(results)
}

async function getQuote(symbol) {
    const quote = await tradier.getQuote(symbol)
    console.log(JSON.stringify(quote))
}

module.exports = {
    search,
    getQuote,
}