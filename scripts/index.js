
const installDependencies = require('./installDependencies')
const setup = require('./setup')

const init = () => {
    const flag = process.argv[2]
    const scripts = {
        '--installDependencies': installDependencies,
        '--setup': setup,
    }

    if (scripts[flag] == null) {
        throw new Error('Script not found')
    }

    scripts[flag]()
}

init()