const database = require('../database')

async function createConsumer(body) {
    const itemAttributes = {
        email: body.email.plainText
    }

    const res = await database().write(
        'PROFILE',
        `${body.email.index}#CONSUMER`,
        itemAttributes
    ).promise()

    return res
}

async function consumerExist(index) {
    const res = await database().read(
        'PROFILE',
        `${index}#CONSUMER`,
    ).promise()

    if (res.Count === 0) return false
    return true
}

async function deleteConsumerByIndex(consumerIndex) {
    const res = await database().delete(
        'PROFILE',
        `${consumerIndex}#CONSUMER`,
    ).promise()

    return res
}

const consumerCommands = () => {
    let handler = null

    const returnMethods = {
        promise() {
            return handler
        }
    }
    const methods = {
        create(body) {
            handler = createConsumer(body)

            return returnMethods
        },
        exists(consumerIndex) {
            handler = consumerExist(consumerIndex)

            return returnMethods
        },
        delete(consumerIndex) {
            handler = deleteConsumerByIndex(consumerIndex)

            return returnMethods
        },
        update() {

        }
    }

    return methods

}

module.exports = consumerCommands