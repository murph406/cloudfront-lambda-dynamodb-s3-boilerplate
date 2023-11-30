class BaseRequest {
    constructor() {
        this.path = null
        this.body = null
        this.headers = null
        this.context = null
        this.method = null
    }
}

class ServerlessRequest extends BaseRequest { 
    constructor(event) {
        super()

        this.path = event.rawPath.replace('/api', '')
        this.method = event.requestContext.http.method
        this.headers = event.headers
        this.body = (event.body) && JSON.parse(event.body)
    }
}

class LocalRequest extends BaseRequest { 
    constructor(req) {
        super()

        this.path = req.url
        this.method = req.method
        this.headers = req.headers
        this.body = req.body
    }
}

module.exports = {
    LocalRequest,
    ServerlessRequest,
}