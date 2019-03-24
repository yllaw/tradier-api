const
    tradier = require('tradier'),
    inquirer = require('inquirer')

const printEquities = (results) => {
    const equities = results.securities.security;
    console.log("equities");

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
    console.log(quote) // TODO: add support to quote multiple tickers
    if (quote != null) {
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
    } else {
        console.log(`ERROR: Equity symbol not found! Please use the search command to lookup companies by name.`)
    }        

}

async function equitiesPrompt(results) {
    let displayEquities

    // check if security is found
    if (results.securities != null) {
        const equities = results.securities.security;
        
        // check if multiple potential answers are found
        if (equities.length > 1) {
            displayEquities = equities.map(equity => { // map into choices list
                return {
                    name: `${equity.symbol}        ${equity.description}`,
                    value: equity.symbol
                }
            })
        } else {
            displayEquities = [{
                name: `${equities.symbol}        ${equities.description}`,
                value: equities.symbol 
            }]
        }



        return inquirer.prompt([{
            type: 'list',
            message: 'Select security to view',
            name: 'security',
            choices: displayEquities,
        }]).then(answers => { // if security is selected then getQuote 
            getQuote(answers.security)
        });
    } else { // else no security has been found
        console.log("Error: No security/equity found! Please search with a different keyword!")
    }
}


async function search(searchTerm) {
    // check for imput
    if (searchTerm === undefined) {
        console.log(`
ERROR: search is undefined, default search = 'apple'
Remember to use 'search -s <searchparam>'`)
        searchTerm = "apple"
    }
    // get securities list
    const equities = await tradier.getSearchResults(searchTerm)
    equitiesPrompt(equities)
}

async function getQuote(symbol) {
    // check for imput
    if (symbol === undefined) {
        console.log(`
ERROR: symbol is undefined, default symbol = 'AAPL'
Remember to use 'quote -q <symbol>'`)
        symbol = "AAPL"
    }
    const quote = await tradier.getQuote(symbol)
    printQuote(quote)
}

module.exports = {
    search,
    getQuote,
}