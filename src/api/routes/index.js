const consumerHandlers = require('./consumer')

const {
    registerConsumerSchema
} = require('../utility/validations')

const routes = {
    '/register-consumer': {
        handler: consumerHandlers.register,
        schema: registerConsumerSchema,
        directives: ['auth', 'recaptcha']
    }
}

module.exports = routes