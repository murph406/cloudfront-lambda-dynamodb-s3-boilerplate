const { SuccessfulResponse, FailedMethodResponse, FailedResponse } = require('../utility/responses');
const useMiddleware = require('../middleware')
const useDirectives = require('../directives');
const routes = require('../routes');

class BaseHandler {
    response = new SuccessfulResponse()
    args = null
    #route = null
    #directives = useDirectives()
    #middleware = useMiddleware()

    executeRequest = async () => {
        try {
            this.#route = routes[this.args.path]

            const next = (newResponse, newArgs) => {
                this.response = newResponse
                this.args = newArgs
            }
 
            if (this.args.method === 'OPTIONS') return
            if (this.args.method !== 'POST') {
                this.response = new FailedMethodResponse()
                return
            }

            // Pre Request Middleware
            await this.#middleware.validateInputs(this.#route, this.response, this.args, next)
            await this.#middleware.encryptInputs(this.#route, this.response, this.args, next)

            // Directives
            for (let i = 0; i < this.#route.directives.length; i++) {
                await this.#directives[this.#route.directives[i]](this.#route, this.response, this.args, next)
            }

            // Route Handler
            await this.#route.handler(this.#route, this.response, this.args, next)

            // Post Request Middleware
            await this.#middleware.postRequest(this.#route, this.response, this.args, next)
        } catch (error) {
            this.response = new FailedResponse(error)
            return
        }
    }
}

module.exports = BaseHandler
