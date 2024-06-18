import amqp from 'amqplib'
import retry from 'async-retry'

let connection

const connect = async () => {
    if (!connection) {
        connection = await retry(async () => {
            return await amqp.connect(process.env.AMQP_URI)
        }, {
            retries: 5,
            minTimeout: 2000,
            factor: 2
        })
    }
    return connection
}

export default connect()