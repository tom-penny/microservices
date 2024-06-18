import Ajv from 'ajv'

export const validateRequest = (schema) => {

    const ajv = new Ajv()

    return (req, res, next) => {
        
        const validate = ajv.compile(schema)
        const valid = validate(req.body)

        if (!valid) {
            const message = 'Invalid request body'
            const errors = validate.errors.map(e => e.message)
            return res.status(400).send({ message, errors })
        }

        next()
    }
}