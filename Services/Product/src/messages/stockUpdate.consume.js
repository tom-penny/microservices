// import connect from '../config/amqp.js'
// import Product from '../models/product.js'

// const consumeStockUpdate = async () => {
//     const channel = await connection.createChannel()
//     await channel.assertQueue('stock', { durable: true })

//     channel.consume(queue, async (message) => {
//         const { id, quantity } = JSON.parse(message.content.toString())

//         try {
//             const product = await Product.findById(id)
//             await product.reduceStock(quantity)
//             channel.ack(message)
//         }
//         catch (err) {
//             channel.nack(message)
//         }
//     })
// }

// export default consumeStockUpdate