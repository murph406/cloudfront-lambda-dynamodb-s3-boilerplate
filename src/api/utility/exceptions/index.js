const errorCodes = require('./error-codes.json')

class CommonError {
    name = null
    stack = null
    code = {
        frontendCode: null,
        backendCode: null,
        message: ''
    }

    constructor(name, stack, code) {
        this.name = name
        this.stack = stack ? stack : null
        this.code = {
            ...this.code,
            ...code,
        }
    }
}

class InvalidInputError extends CommonError {
    constructor(inputErrors, stack) {
        const name = 'InvalidInput'
        super(name, stack, errorCodes[name])
        this.inputErrors = inputErrors
    }
}

class ConsumerExistError extends CommonError {
    constructor(inputErrors, stack) {
        const name = 'ConsumerExists'
        super(name, stack, errorCodes[name])
        this.stack = inputErrors
    }
}


module.exports = {
    CommonError,
    InvalidInputError,
    ConsumerExistError
}