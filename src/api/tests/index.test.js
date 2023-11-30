const cleanUpTasks = require('./cleanup')

describe('Run Tests', () => {
    require('./consumer.test')
})

afterAll(async () => {
    await cleanUpTasks()
});