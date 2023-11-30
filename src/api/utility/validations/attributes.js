const yup = require('yup')
const {
    string,
    requiredString,
    requiredBoolean
 } = require('./types')

const attributes = {
    firstName: string,
    lastName: string,
    email: yup.string().emailDomain().emailSyntax().emailDns().emailNamecheap(),
    optIn: requiredBoolean,
}

module.exports = attributes