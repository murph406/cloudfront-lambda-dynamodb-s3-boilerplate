const http = require('http');
const BaseHandler = require('./base');
const { LocalRequest } = require('../utility/requests');

class LocalHandler extends BaseHandler {
    port = 8000
    handleRequest = (req, res) => {
        let requestBody = ''

        req.on('data', (chunk) => requestBody += chunk)

        req.on('end', async () => {
            req.body = JSON.parse(requestBody)
            this.args = new LocalRequest(req)

            await this.executeRequest()

            res.writeHead(this.response.statusCode, this.response.headers)
            res.write(JSON.stringify(this.response.body))
            res.end()
        })
    }

    server = http.createServer(this.handleRequest).listen(this.port, () => console.log(`Server is running on http://localhost:${this.port}`))
}

module.exports = LocalHandler