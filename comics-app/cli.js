const
    app = require('./app')
    yargs = require('yargs')

const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: ('search <movies>'),
        desc: 'searches for the movies the character is in ',
        handler: (argv) => {app.search(argv.movies)}
    })
    .command({
        command: ('search2 <input>'),
        desc: 'searches for the movies the character is in ',
        handler: (argv) => {app.search2(argv.input)}
    })
    .help('help')
    .argv