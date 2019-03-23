const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'search stock symbols listed on exchanges',
        builder: (yargs) => {
            return yargs.option('s', {
                alias: 'searchTerm',
                describe: 'keyword used to search for stocks'
            })
        },
        handler: (argv) => { app.search(argv.searchTerm) }
    })
    .help('help')
    .argv

