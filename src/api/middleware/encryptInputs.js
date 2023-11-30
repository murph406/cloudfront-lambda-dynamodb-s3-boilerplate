const useEncryption = require('../utility/encryption')
const encryptionConfig = require('../config/encryption.json')

const encryptInputs = async(route, response, args, resolve) => {
    const encryption = useEncryption()
    const keysToEncryptWIndex = encryptionConfig.keysToEncryptWIndex
    const keysToEncrypt = encryptionConfig.keysToEncrypt
    const keysToHash = encryptionConfig.keysToHash

    for (let i = 0; i < keysToEncryptWIndex.length; i++) {
        const key = keysToEncryptWIndex[i]

        if (args.body[key]) {
            args.body[key] = await encryption.encryptStringWIndex(args.body[key], key)
        }
    }

    for (let i = 0; i < keysToEncrypt.length; i++) {
        const key = keysToEncrypt[i]

        if (args.body[key]) {
            args.body[key] = await encryption.encryptString(args.body[key], key)
        }
    }

    for (let i = 0; i < keysToHash.length; i++) {
        const key = keysToHash[i]

        if (args.body[key]) {
            args.body[key] = encryption.hashString(args.body[key])
        }
    }

    resolve(response, args)
}

module.exports = encryptInputs