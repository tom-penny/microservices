import connectionPromise from '../config/amqp.js'

const publishCheckout = async (checkoutId, customerId, addressId, basket, totalAmount) => {
    try {
        const connection = await connectionPromise
        const channel = await connection.createConfirmChannel()
        
        let items = Object.entries(basket).map(([productId, { unitPrice, quantity }]) => {
            return { productId, unitPrice, quantity }
        })
        
        const message = JSON.stringify({ checkoutId, customerId, addressId, totalAmount, items })
        
        await channel.assertQueue('checkout', { durable: true })
        channel.sendToQueue('checkout', Buffer.from(message))
        
        await channel.waitForConfirms()
    }
    catch (err) { throw err }
}

export default publishCheckout