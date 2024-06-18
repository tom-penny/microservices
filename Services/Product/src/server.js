import app from './app.js'
import db from './config/mongoose.js'
import consumeStockUpdate from './messages/stockUpdate.consume.js'
import consumeOrderConfirmation from './messages/confirmation.consume.js'

const port = process.env.PORT || 8001

process.on('SIGTERM', async () => {
    try {
        server.close()
        await db.close()
        process.exit(0)
    }
    catch {
        process.exit(1)
    }
})

consumeStockUpdate()

consumeOrderConfirmation()

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})