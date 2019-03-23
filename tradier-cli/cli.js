const
    app = require('./app'),
    yargs = require('yargs')
    const argv = require('yargs').argv



const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'search stock symbols listed on exchanges',
        builder: (yargs) => {
            return yargs.option('s', {
                alias: 'keyword',
                describe: 'keyword used to search for stocks'
            })
        },
        handler: (argv) => {app.search( argv.keyword ) }
    })
    .command({
        command: 'quote',
        desc: 'get quote of equity symbol',
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

// const flags = yargs.usage('$0: Usage <cmd> [options]')
//     .command({
//         command: 'draw',
//         desc: 'draws a card from the deck',
//         builder: (yargs) => {
//             return yargs.option('s', {
//                 alias: 'shuffle',
//                 describe: 'shuffle the deck before drawing'
//             }).option('n', {
//                 alias: 'number',
//                 describe: 'number of cards to draw'
//             })
//         },
//         handler: (argv) => { app.draw(argv.shuffle, argv.number) }
//     })
//     .command({
//         command: 'play',
//         desc: 'play a 5 card draw game',
//         handler: () => app.play()
//     })
//     .help('help')
//     .argv

