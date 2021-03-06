const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: '-s <searchparam> Search stock symbols listed on exchanges',
        builder: (yargs) => {
            return yargs.option('s', {
                alias: 'keyword',
                describe: 'Keyword used to search for stocks'
            })
        },
        handler: (argv) => {app.search( argv.keyword ) }
    })
    .command({
        command: 'quote',
        desc: '-q <symbol> Get quote of equity symbol',
        builder: (yargs) => {
            return yargs.option('q', {
                alias: 'symbol',
                describe: 'symbol used to get equity quote'
            })
        },
        handler: (argv) => {app.getQuote( argv.symbol )}
    })
    .help('help')
    .argv