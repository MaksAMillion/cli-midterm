const
    app = require('./app')
    yargs = require('yargs')

const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: ('search <movie>'),
        desc: 'searches for the movie followed by the search command ',
        handler: (argv) => {app.search(argv.movie)}
    })
    .help('help')
    .argv