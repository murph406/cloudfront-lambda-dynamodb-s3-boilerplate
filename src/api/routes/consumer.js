const { ConsumerExistError } = require('../utility/exceptions')
const dataController = require('../utility/dataController')

async function register(route, response, args, resolve) {
    console.log("ARGS::", args)

    const consumerExists = await dataController()
        .consumer()
        .exists(args.body.email.index)
        .promise()

    if (consumerExists) throw new ConsumerExistError(__filename)

    const res = await dataController()
        .consumer()
        .create(args.body)
        .promise()

    console.log("RES::", res)

    return resolve(response, args)
}

module.exports = {
    register
};