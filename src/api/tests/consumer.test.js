const { LocalHandler } = require('../handlers')
const testConfig = require('../config/tests.json')

const localHandler = new LocalHandler()
const request = require("supertest")(localHandler.server)

function registerConsumer(payload) {
    return request.post('/register-consumer')
        .set('Recaptcha', 'test')
        .send(payload)
        .expect(200)
}

describe('Register Consumer', () => {

    test('Returns success', async () => {
        const payload = {
            ...testConfig.consumer,
            optIn: true,
        }

        let response = await registerConsumer(payload)

        response = JSON.parse(response.text)
        expect(response.success).toBe(true)
    })

    test('Fails to Register twice', async () => {
        const payload = {
            ...testConfig.consumer,
            optIn: true,
        }

        let response = await registerConsumer(payload)
        response = JSON.parse(response.text)

        expect(response.success).toBe(false)
    })
})

afterAll(() => {
    localHandler.server.close()
})
