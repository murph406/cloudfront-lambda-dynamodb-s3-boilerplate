const { InvalidInputError } = require("../utility/exceptions");

const validateInputs = async (route, response, args, resolve) => {
    try {
        await route.schema.validate(args.body, {
            abortEarly: false,
            stripUnknown: true,
            strict: true
        })

        resolve(response, args)
    } catch (validationError) {
        const inputErrors = {}

        for (let i = 0; i < validationError.inner.length; i++) {
            const errorDetails = validationError.inner[i]
            inputErrors[errorDetails.path] = errorDetails.errors[0]
        }

        throw new InvalidInputError(inputErrors, __filename)
    }
}

module.exports = validateInputs