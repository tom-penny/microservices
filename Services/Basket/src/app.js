import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import basketRoutes from './routes/basket.routes.js'
import { authenticateKey } from './middleware/auth.middleware.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))

app.use(express.json())

// Authenticate API key from gateway.

app.use(authenticateKey)

app.use('/api/basket', basketRoutes)

// Handle invalid endpoints.

app.use('/*', (req, res, next) => {
    res.status(404).send({ message: 'Invalid endpoint' })
})

// Handle generic errors.

app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Internal server error' })
})

export default app