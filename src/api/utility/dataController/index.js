const consumerCommands = require('./consumer')

function dataLayer() {

    const methods = {
        consumer() {
            return consumerCommands()
        }
    }


    return methods
}


module.exports = dataLayer
