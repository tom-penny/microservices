import connectionPromise from '../config/amqp.js'
import { validateProducts } from '../services/product.service.js'
import publishOrderValidation from './validation.publish.js'

const consumeOrderConfirmation = async () => {
    const connection = await connectionPromise
    const channel = await connection.createChannel()

    const exchange = 'order_confirmed'
    const queue = 'order_confirmation'

    await channel.assertExchange(exchange, 'fanout', { durable: true })
    await channel.assertQueue(queue, { durable: true })
    await channel.bindQueue(queue, exchange, '')

    channel.consume(queue, async (message) => {
        try {
            const content = message.content.toString()
            const { orderId, items } = JSON.parse(content)

            const isValid = await validateProducts(items)
            await publishOrderValidation(orderId, true)

            channel.ack(message)
        }
        catch (err) { channel.nack(message) }
    })
}

export default consumeOrderConfirmation