const validateInputsMiddleware = require('./validateInputs')
const encryptInputsMiddleware = require('./encryptInputs')

const postRequest = (route, response, args, resolve) => {
    args.body.postRequest = true
    resolve(response, args)
}

function middleware() {
    const methods = {
        validateInputs(route, response, args, resolve) {
            return validateInputsMiddleware(route, response, args, resolve)
        },
        encryptInputs(route, response, args, resolve) {
            return encryptInputsMiddleware(route, response, args, resolve)
        },
        postRequest(route, response, args, resolve) {
            return postRequest(route, response, args, resolve)
        },
    }

    return methods
}


module.exports = middleware
