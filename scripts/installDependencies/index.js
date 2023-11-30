const { execSync } = require('child_process')

const init = () => {
    execSync(`sh  ${__dirname}/run.sh`)
}

module.exports = init
