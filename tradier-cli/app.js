const
    tradier = require('tradier'),
    inquirer = require('inquirer')


const print = (results) => {
    // console.log(JSON.stringify(results))

    console.log(`\n --- Stocks ---`)
    results.securities.security.forEach(stock => {
        console.log(`${stock.symbol}
        ${stock.description}`)
    })
}


async function search(searchTerm = 'apple') {
    const results = await tradier.getSearchResults(searchTerm)
    
    print(results)
}

async function getQuote() {

}

module.exports = {
    search,
    getQuote,
}