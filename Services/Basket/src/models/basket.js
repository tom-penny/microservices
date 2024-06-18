import redis from '../config/redis.js'

export const getById = async (id) => {
    try {
        const basket = await redis.get(`basket:${id}`)
        return basket ? JSON.parse(basket) : {}
    }
    catch (err) { throw err }
}

export const update = async (id, basket) => {
    try {
        await redis.set(`basket:${id}`, JSON.stringify(basket))
    }
    catch (err) { throw err }
}

export const lock = async (id) => {
    try {
        await redis.set(`basket:${id}:lock`, 1, 'EX', 60)
    }
    catch (err) { throw err }
}