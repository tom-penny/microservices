import connectionPromise from '../config/amqp.js'

const publishOrderValidation = async (orderId, isValid) => {
    try {
        const connection = await connectionPromise
        const channel = await connection.createConfirmChannel()
        
        const queue = 'validation'
        const message = JSON.stringify({ orderId, isValid })

        await channel.assertQueue(queue, { durable: true })
        channel.sendToQueue(queue, Buffer.from(message))
    
        await channel.waitForConfirms()
    }
    catch (err) { throw err }
}

export default publishOrderValidation