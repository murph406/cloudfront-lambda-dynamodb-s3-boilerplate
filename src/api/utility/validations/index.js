const { object } = require('yup')
const attributes = require('./attributes')

const {
    firstName,
    lastName,
    email,
    optIn
} = attributes


const registerConsumerSchema = object({
    email,
    optIn
})

module.exports = {
    registerConsumerSchema
}