import app from './app.js'
import redis from './config/redis.js'

const port = process.env.PORT || 8002

process.on('SIGTERM', async () => {
    try {
        server.close()
        await redis.quit()
        process.exit(0)
    }
    catch { process.exit(1) }
})

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})