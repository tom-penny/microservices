import app from '../src/app.js'
import request from 'supertest'
import { MOCK_ID, MOCK_CATEGORY, CATEGORY_DATA } from './data/fixtures.js'

describe('<<<<< CATEGORIES >>>>>', () => {

    describe('GET /api/categories', () => {

        it('returns 200 with array of categories', async () => {

            const res = await request(app)
            .get('/api/categories')
            .expect(200)

            const { body: { categories} } = res
            expect(categories).toBeArrayOfSize(CATEGORY_DATA.length)
            expect(categories).toIncludeSameMembers(CATEGORY_DATA)
        })
    })

    describe('POST /api/categories', () => {

        it('returns 201 with posted category', async () => {

            const res = await request(app)
            .post('/api/categories')
            .send(MOCK_CATEGORY)
            .expect(201)

            const { body: { category } } = res
            expect(category).toBeInstanceOf(Object)
            expect(category).toMatchObject(MOCK_CATEGORY)
        })

        it('returns 400 for bad request', async () => {

            const res = await request(app)
            .post('/api/categories')
            .send({ name: null })
            .expect(400)

            const { body: { message } } = res
            expect(message).toBe('Validation error')
        })

        it('returns 409 for duplicate category', async () => {

            const _id = CATEGORY_DATA[0].id
            const res = await request(app)
            .post('/api/categories')
            .send({ _id, ...MOCK_CATEGORY })
            .expect(409)

            const { body: { message } } = res
            expect(message).toBe('Duplicate key')
        })
    })

    describe('PUT /api/categories/:id', () => {

        it('returns 200 with updated category', async () => {

            const { id } = CATEGORY_DATA[0]
            const res = await request(app)
            .put(`/api/categories/${id}`)
            .send(MOCK_CATEGORY)
            .expect(200)

            const { body: { category } } = res
            expect(category).toBeInstanceOf(Object)
            expect(category).toMatchObject(MOCK_CATEGORY)
        })

        it('returns 400 for bad request', async () => {

            const { id } = CATEGORY_DATA[0]
            const res = await request(app)
            .put(`/api/categories/${id}`)
            .send({ name: null })
            .expect(400)

            const { body: { message } } = res
            expect(message).toBe('Validation error')
        })

        it('returns 404 for non-existent category', async () => {

            const res = await request(app)
            .put(`/api/categories/${MOCK_ID}`)
            .send(MOCK_CATEGORY)
            .expect(404)

            const { body: { message } } = res
            expect(message).toBe('Category not found')
        })
    })

    describe('DELETE /api/categories/:id', () => {

        it('returns 204 for deleted category', async () => {

            const { id } = CATEGORY_DATA[0]
            const res = await request(app)
            .delete(`/api/categories/${id}`)
            .expect(204)
        })

        it('returns 404 for non-existent category', async () => {
            
            const res = await request(app)
            .delete(`/api/categories/${MOCK_ID}`)
            .expect(404)

            const { body: { message } } = res
            expect(message).toBe('Category not found')
        })
    })
})