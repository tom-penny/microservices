import Redis from 'ioredis'
import Mock from 'ioredis-mock'

const options = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
}

const client = process.env.NODE_ENV == 'test'
? new Mock(options) : new Redis(options)

export default client