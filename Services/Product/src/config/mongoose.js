import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let uri = process.env.MONGO_URI

if (process.env.NODE_ENV === 'test') {
    const server = await MongoMemoryServer.create()
    uri = server.getUri()

    mongoose.connection.on('close', async () => {
        await server.stop()
    })
}

await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export default mongoose.connection