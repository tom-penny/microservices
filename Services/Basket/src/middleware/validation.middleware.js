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

// import basketSchema from '../validators/basket.schema.js'
// import checkoutSchema from '../validators/checkout.schema.js'

// export const validateBasket = (req, res, next) => {
//     const { error } = basketSchema.validate(req.body.basket)
    
//     if (error) {
//         const message = 'Invalid basket format'
//         const errors = error.details.map(d => d.message)
//         return res.status(400).send({ message, errors })
//     }
    
//     next()
// }

// export const validateCheckout = (req, res, next) => {
    
//     const { addressId } = req.body

//     const { error } = checkoutSchema.validate({ addressId })

//     if (error) {
//         const message = 'Invalid checkout format'
//         const errors = error.details.map(d => d.message)
//         console.log(errors)
//         return res.status(400).send({ message, errors })
//     }

//     next()
// }