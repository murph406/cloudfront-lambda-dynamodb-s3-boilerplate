const headerConfig = require('../../config/headers.json')
const dotenv = require('dotenv')
dotenv.config()

class CommonResponse {
    #headerConfig = headerConfig[process.env.Stage]

    constructor() {
        this.statusCode = 200
        this.headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'OPTIONS, POST',
            'Access-Control-Max-Age': this.#headerConfig.cacheOptions,
            'Access-Control-Allow-Origin': this.#headerConfig.allowedOrigins.join(', '),
            'Access-Control-Allow-Headers': this.#headerConfig.allowedHeaders.join(', '),
        }
        this.body = {
            success: true,
            error: null,
        }
    }
}

class SuccessfulResponse extends CommonResponse {
    constructor() {
        super()
    }
}

class FailedMethodResponse extends CommonResponse {
    constructor() {
        super()

        this.statusCode = 405
        this.body.success = false
    }
}

class FailedResponse extends CommonResponse {
    success = false

    constructor(error) {
        super()

        console.log("ERROR::", error)

        this.body.success = false
        this.body.error = error

        if (this.body.error.name === 'ReferenceError' || this.body.error.name === 'TypeError') {
            this.statusCode = 500
        }

        if (process.env.Stage === 'main') {
            delete this.body.error.stack
        }
    }
}

module.exports = {
    SuccessfulResponse,
    FailedResponse,
    FailedMethodResponse
}