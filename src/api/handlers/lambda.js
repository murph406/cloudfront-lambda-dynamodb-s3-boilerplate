const BaseHandler = require('./base')
const { ServerlessRequest } = require('../utility/requests')

class LambdaHandler extends BaseHandler {
    async handleRequest(event, context) {
        this.args = new ServerlessRequest(event)
        await this.executeRequest()

        return this.response
    }
}

module.exports = LambdaHandler
