const encryption = require('../utility/encryption')
const dataController = require('../utility/dataController')
const testConfig = require('../config/tests.json')

const cleanup = async () => {
    const email = await encryption().encryptStringWIndex(testConfig.consumer.email, 'email')
    await dataController().consumer().delete(email.index).promise()
}

module.exports = cleanup
