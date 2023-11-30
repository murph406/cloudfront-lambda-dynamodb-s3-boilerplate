const fs = require('fs')
const crypto = require('crypto');
const inquirer = require('inquirer')
const pathToEnv = `${process.cwd()}/src/api/.env`

const writeToEnv = (key, value) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(
            pathToEnv,
            `${key}=${value}\n`,
            'utf8',
            (err) => {
                if (err) {
                    reject()
                }
                resolve()
            }
        )
    })
}

const deleteCurrentEnv = () => {
    return new Promise((resolve, reject) => {
        fs.unlink(pathToEnv, (err) => {
            if (err) {
                reject()
            }
            resolve()
        });
    })
}

const generateEncryptKey = () => {
    return crypto
        .randomBytes(32)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

async function init() {
    try {
        const variables = {
            Stage: 'local',
            EncryptSecret: '',
            AWS_ACCESS_KEY_ID: '',
            AWS_SECRET_ACCESS_KEY: '',
            AWS_DEFAULT_REGION: 'us-east-1',
            RecaptchaThreshold: 0.5,
            RecaptchaEnabled: false,
        }

        const prompts = [
            {
                type: 'input',
                name: 'Project',
                message: 'What is the project name?',
                filter: (input) => input.toLowerCase(),
                validate: (input) => {
                    if (typeof input === 'string' && input.length > 3) return true
                    return false
                },
            }
        ]

        const response = await inquirer.prompt(prompts)
        await deleteCurrentEnv()

        for (const key in response) {
            variables[key] = response[key]
        }

        variables['DynamoApplicationTable'] = `${variables['Project']}-develop-table`
        variables['EncryptSecret'] = generateEncryptKey()

        for (const key in variables) {
            await writeToEnv(key, variables[key])
        }

        console.log("\nDone!")
    } catch (error) {
        console.log("\n", error)
    }
}

module.exports = init
