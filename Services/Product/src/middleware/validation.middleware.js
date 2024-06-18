import Ajv from 'ajv'

const validSortQuerues = ['name', 'price', 'created']
const validOrderQueries = ['asc', 'desc']

export const validateProductQuery = (req, res, next) => {
    let { sort, order } = req.query

    if (sort && !validSortQuerues.includes(sort)) {
        return res.status(400).send({ message: 'Invalid sort query parameter' })
    }

    if (order && !validOrderQueries.includes(order)) {
        return res.status(400).send({ message: 'Invalid order query parameter' })
    }

    req.query.sort = sort || 'name'
    req.query.order = order || 'asc'

    next()
}

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

// export const validateRequest = (schema) => {
//     const ajv = new Ajv()
//     return (req, res, next) => {
//         const valid = ajv.validate(schema, req.body)

//         if (!valid) return res.status(400).send({ message: 'Invalid request body' })

//         next()
//     }
// }

