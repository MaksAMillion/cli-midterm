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
        command: ('search2 <character>'),
        desc: 'gets character information',
        handler: (argv) => {app.charsearch(argv.character)}
    })
    .help('help')
    .argv