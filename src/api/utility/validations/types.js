const yup = require('yup')
const EmailSyntaxValidator = require('@email-utils/validator-syntax').default
const EmailDnsValidator = require('@email-utils/validator-dns').default
const DOMAIN_BAN_LIST = require('../../config/emails/domain-ban-list.json')
const DOMAIN_BAN_LIST_CUSTOM = require('../../config/emails/custom-domain-ban-list.json')
const errorCodes = require('../exceptions/error-codes.json')

const dnsValidator = new EmailDnsValidator({
    a: -1,
    spf: -1,
    port: -1,
    validScore: 200,
})

const emailValidator = new EmailSyntaxValidator({
    local: {
        alphaUpper: false,
        quote: false,
        spaces: false,
    },
    domain: {
        alphaUpper: false,
    },
})

yup.addMethod(yup.string, 'emailDomain', function () {
    return this.test('emailDomain', function (email) {
        const { path, createError } = this
        const atIndex = email.indexOf('@')
        const emailDomain = email.slice(atIndex + 1, email.length)

        for (let i = 0; i < DOMAIN_BAN_LIST.length; i++) {
            if (emailDomain.toLowerCase() === DOMAIN_BAN_LIST[i].toLowerCase()) {
                return createError({
                    path,
                    message: errorCodes.InvalidEmail.frontendCode
                })
            }
        }

        for (let i = 0; i < DOMAIN_BAN_LIST_CUSTOM.length; i++) {
            if (emailDomain.toLowerCase() === DOMAIN_BAN_LIST_CUSTOM[i].toLowerCase()) {
                return createError({
                    path,
                    message: errorCodes.InvalidEmail.frontendCode
                })
            }
        }

        return true
    })
})

yup.addMethod(yup.string, 'emailSyntax', function () {
    return this.test('emailSyntax', function (email) {
        const { path, createError } = this
        return new Promise((resolve, reject) => {
            let validEmail = emailValidator.validate(email)

            validEmail
                .then((value) => {
                    if (value) {
                        resolve(true)
                    }

                    reject(createError({ path, message: errorCodes.InvalidEmail.frontendCode }))
                })
                .catch(() => {
                    reject(createError({ path, message: errorCodes.InvalidEmail.frontendCode }))
                })
        })
    })
})

yup.addMethod(yup.string, 'emailDns', function () {
    return this.test('emailDns', function (email) {
        const { path, createError } = this

        return new Promise((resolve, reject) => {
            dnsValidator
                .validate(email)
                .then((value) => {
                    if (value) {
                        resolve(true)
                    }

                    reject(createError({ path, message: errorCodes.InvalidEmail.frontendCode }))
                })
                .catch(() => {
                    reject(createError({ path, message: errorCodes.InvalidEmail.frontendCode }))
                })
        })
    })
})

yup.addMethod(yup.string, 'emailNamecheap', function () {
    return this.test('emailNamecheap', function (email) {
        const { path, createError } = this

        return new Promise((resolve, reject) => {
            dnsValidator
                .isDefaultNamecheapMX(email)
                .then((value) => {
                    if (value) {
                        reject(
                            createError({ path, message: errorCodes.InvalidEmail.frontendCode })
                        )
                    }

                    resolve(true)
                })
                .catch(() => {
                    reject(createError({ path, message: errorCodes.InvalidEmail.frontendCode }))
                })
        })
    })
})

const string = yup
    .string(errorCodes.RequiredInput.frontendCode)
const requiredString = yup
    .string(errorCodes.InvalidInput.frontendCode)
    .required(errorCodes.RequiredInput.frontendCode)
const boolean = yup
    .boolean(errorCodes.RequiredInput.frontendCode)
const requiredBoolean = yup
    .boolean(errorCodes.RequiredInput.frontendCode)
    .required(errorCodes.RequiredInput.frontendCode)
const requiredBooleanTrue = yup
    .boolean(errorCodes.RequiredInput.frontendCode)
    .oneOf([true])
    .required(errorCodes.RequiredInput.frontendCode)

module.exports = {
    string,
    requiredString,
    boolean,
    requiredBoolean,
    requiredBooleanTrue
}