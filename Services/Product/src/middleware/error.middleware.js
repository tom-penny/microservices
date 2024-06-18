import mongoose from 'mongoose'

export const handleMongooseError = (err, req, res, next) => {

    if (err instanceof mongoose.Error) {

        switch (err.name) {
            case 'ValidationError':
                return res.status(400).send({ message: 'Validation error' })
            case 'CastError':
                return res.status(400).send({ message: 'Invalid ID' })
            case 'DocumentNotFoundError':
                return res.status(404).send({ message: 'Document not found' })
            default:
                return res.status(500).send({ message: 'Database server error' })
        }
    }

    if (err.name === 'MongoServerError' && err.code === 11000) {
        return res.status(409).send({ message: 'Duplicate key' })
    }

    next(err)
}