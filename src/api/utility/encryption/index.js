const bcrypt = require('bcryptjs')
const crypto = require("crypto")
const {
    EncryptedField,
    BlindIndex,
    CipherSweet,
    StringProvider,
} = require('ciphersweet-js')

const useEncryption = () => {
    const provider = new StringProvider(process.env.EncryptSecret)
    const engine = new CipherSweet(provider)
    const stringTable = 'STRING'

    function encryptedString(field) {
        return new EncryptedField(engine, stringTable, field)
    }

    function encryptedFieldWIndex(field) {
        return new EncryptedField(engine, stringTable, field)
            .addBlindIndex(new BlindIndex(field, [], 32))
    }

    function hash(string) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(string, salt)
    }

    const methods = {
        async encryptStringWIndex(plainText, field) {
            const result = {
                plainText,
                encryptedText: '',
                index: '',
            }

            const [encryptedText, indexes] = await encryptedFieldWIndex(field).prepareForStorage(plainText)
            result.encryptedText = encryptedText
            result.index = indexes[field]

            return result
        },
        async encryptString(plainText, field) {
            const result = {
                plainText,
                encryptedText: '',
            }

            if (plainText) {
                result.encryptedText = await encryptedString(field).prepareForStorage(encryptedText)
            }

            return result
        },
        async decryptString(encryptedText, field) {
            const result = {
                plainText: '',
                encryptedText,
            }

            if (encryptedText) {
                const decryptedBuffer = await encryptedString(field).decryptValue(encryptedText)

                result.plainText = decryptedBuffer.toString()
            }

            return result
        },
        hashString(plainText) {
            const result = {
                plainText,
                encryptedText: '',
            }

            result.encryptedText = hash(plainText)

            return result
        },
        verifyHash(string, hash) {
            return bcrypt.compareSync(string, hash)
        },
    }

    return methods
}

module.exports = useEncryption