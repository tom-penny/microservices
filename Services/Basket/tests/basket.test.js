import app from '../src/app.js'
import request from 'supertest'
import { validate as validateUuid } from 'uuid'
import { calculateValue } from './utils/testHelpers.js'

import { BASKET_DATA, MOCK_BASKET, MOCK_ID, MOCK_CHECKOUT } from './data/fixtures.js'

describe('<<<<< BASKET >>>>>', () => {

    describe('GET /api/basket/:id', () => {

        it('returns 200 with requested basket', async () => {
            
            const { id } = BASKET_DATA[0]
            const res = await request(app)
            .get(`/api/basket/${id}`)
            .expect(200)

            const { body: { basket } } = res
            expect(basket).toBeInstanceOf(Object)
            expect(basket).toEqual(BASKET_DATA[0].basket)
        })
    })

    describe('PUT /api/basket/:id', () => {

        it('returns 200 with created basket', async () => {
            
            const res = await request(app)
            .put(`/api/basket/${MOCK_ID}`)
            .send({ basket: MOCK_BASKET })
            .expect(200)

            const { body: { basket } } = res
            expect(basket).toBeInstanceOf(Object)
            expect(basket).toEqual(MOCK_BASKET)
        })

        it('returns 200 with updated basket', async () => {

            const { id } = BASKET_DATA[0]
            const res = await request(app)
            .put(`/api/basket/${id}`)
            .send({ basket: MOCK_BASKET })
            .expect(200)

            const { body: { basket } } = res
            expect(basket).toBeInstanceOf(Object)
            expect(basket).toEqual(MOCK_BASKET)
        })

        it('returns 400 for bad request', async () => {

            const { id } = BASKET_DATA[0]
            const res = await request(app)
            .put(`/api/basket/${id}`)
            .send({ basket: null })
            .expect(400)

            const { body: { message } } = res
            expect(message).toBe('Invalid request body')
        })
    })

    describe('POST /api/basket/:id', () => {

        it('returns 200 upon successful checkout', async () => {

            const { id } = BASKET_DATA[0]
            const res = await request(app)
            .post(`/api/basket/${id}`)
            .send(MOCK_CHECKOUT)
            .expect(200)

            const { body: { checkoutId, basketValue } } = res
            expect(validateUuid(checkoutId)).toBeTruthy()
            expect(basketValue).toEqual(calculateValue(MOCK_BASKET))
        })

        it('returns 400 for bad request', async () => {

            const { id } = BASKET_DATA[0]
            const res = await request(app)
            .post(`/api/basket/${id}`)
            .send({ addressId: null })
            .expect(400)

            const { body: { message } } = res
            expect(message).toBe('Invalid request body')
        })
    })
})