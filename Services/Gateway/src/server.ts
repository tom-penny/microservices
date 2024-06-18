import app from './app'

const port = process.env.PORT || 8000

process.on('SIGTERM', async () => {
    try {
        server.close()
        process.exit(0)
    }
    catch {
        process.exit(1)
    }
})

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})