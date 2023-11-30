const dotenv = require('dotenv')
const { LambdaHandler, LocalHandler } = require('./handlers')

dotenv.config()

if (process.env.Stage === 'local') {
    return new LocalHandler()
} else {
    const lambdaHandler = new LambdaHandler()
    exports.handler = async (event, context) => await lambdaHandler.handleRequest(event, context)
}
