const axios = require('axios')

const recaptchaRequest = (clientResponse) => {
    return axios.post('https://www.google.com/recaptcha/api/siteverify', {
        secret: process.env.RecaptchaSecret,
        response: clientResponse
    })
}

const timeout = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

const recaptcha = async (route, response, args, resolve) => {
    if (process.env.RecaptchaEnabled === 'false') {
        console.warn('RECAPTCHA IS DISABLED')

        return resolve(response, args)
      }


    console.log("EXECUTING RECAPTCHA...")
    await timeout(1300)

    return resolve(response, args)
}


module.exports = recaptcha