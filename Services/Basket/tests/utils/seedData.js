import { update } from '../../src/models/basket.js'
import { BASKETS } from '../data/testData.js'

const seedData = async () => {
    BASKETS.forEach(async ({ id, basket }) => {
        await update(id, basket)
    })
}

export default seedData