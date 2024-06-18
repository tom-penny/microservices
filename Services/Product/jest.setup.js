import db from './src/config/mongoose.js'
import seedData from './tests/utils/seedData.js'

beforeEach(async () => {
    await seedData()
})

afterAll(async () => {
    await db.close()
})