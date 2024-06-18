import redis from './src/config/redis.js'
import seedData from './tests/utils/seedData.js'

beforeEach(async () => {
    await redis.flushall()
    await seedData()
})

afterAll(async () => {
    await redis.quit()
})