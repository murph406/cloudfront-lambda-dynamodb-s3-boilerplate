const authenticateDirective = require('./authenticate')
const recaptchaDirective = require('./recaptcha')

const directives = () => {
    const methods = {
        'auth': authenticateDirective,
        'recaptcha': recaptchaDirective
    }

    return methods
}

module.exports = directives