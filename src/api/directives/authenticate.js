const timeout = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

const authenticate = async (route, response, args, resolve) => {
    console.log("AUTHENTICATING CONSUMER...")
    await timeout(200)

    resolve(response, args)
}

module.exports = authenticate