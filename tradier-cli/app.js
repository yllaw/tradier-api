const
    tradier = require('tradier'),
    inquirer = require('inquirer')

const printEquities = (results) => {
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

const printQuote = (quote) => {
    const { symbol, description, type, last, change, change_percentage, volume, average_volume, open, high, low, prevclose, week_52_high, week_52_low } = quote.quotes.quote

    console.log(`\n --- ${symbol} ---`)
    
    //template literal formatting
    console.log(`${description}
Price: ${last}
Change: ${change}   ${change_percentage}%
Volume: ${volume}   Average Volume: ${average_volume}
Open: ${open}       Intraday High: ${high}      Intraday Low: ${low}        Prev Close: ${prevclose}
52-Week High: ${week_52_high}       52-Week Low: ${week_52_low}
Type: ${type}
`)

}

async function equitiesPrompt(results) {
    const displayEquities = results.securities.security.map(equity => {
        return {
            name: `${equity.symbol}        ${equity.description}`,
            value: equity.symbol
        }
    })

    return inquirer.prompt([{
        type: 'list',
        message: 'Select security to view',
        name: 'security',
        choices: displayEquities,
        validate: securities => {
            return true
        }
    }]).then(answers => {
        getQuote(answers.security)
    });
}


async function search(searchTerm = 'apple') {
    const equities = await tradier.getSearchResults(searchTerm)
    equitiesPrompt(equities)
}

async function getQuote(symbol) {
    const quote = await tradier.getQuote(symbol)
    printQuote(quote)
}

module.exports = {
    search,
    getQuote,
}