import app from '../src/app.js'
import request from 'supertest'
import { MOCK_ID, MOCK_PRODUCT, PRODUCT_DATA, CATEGORY_DATA } from './data/fixtures.js'

describe('<<<<< PRODUCTS >>>>>', () => {

    describe('GET /api/products', () => {

        it('returns 200 with array of products', async () => {

            const res = await request(app)
            .get('/api/products')
            .expect(200)

            const { body: { products } } = res
            expect(products).toBeArrayOfSize(PRODUCT_DATA.length)
            expect(products).toIncludeSameMembers(PRODUCT_DATA)
        })

        it('returns 400 for invalid sort parameter', async () => {
            
            const res = await request(app)
            .get('/api/products?sort=null')
            .expect(400)

            const { body: { message } } = res
            expect(message).toBe('Invalid sort query parameter')
        })

        it('returns 400 for invalid order parameter', async () => {
            
            const res = await request(app)
            .get('/api/products?order=null')
            .expect(400)

            const { body: { message } } = res
            expect(message).toBe('Invalid order query parameter')
        })
    })

    describe('GET /api/products/category/:name', () => {

        it('returns 200 with products by category', async () => {

            const { name } = CATEGORY_DATA[0]
            const res = await request(app)
            .get(`/api/products/category/${name}`)
            .expect(200)

            const { body: { products } } = res
            expect(products).toIncludeSameMembers([PRODUCT_DATA[0]])
        })
    })

    describe('GET /api/products?sort=name', () => {

        it('returns 200 with products sorted by ascending name', async () => {

            const res = await request(app)
            .get('/api/products?sort=name')
            .expect(200)

            const { body: { products } } = res
            expect(products).toBeSorted({ key: 'name' })
        })
    })

    describe('GET/api/products?sort=name&order=desc', () => {

        it('returns 200 with products sorted by descending name', async () => {

            const res = await request(app)
            .get('/api/products?sort=name&order=desc')
            .expect(200)

            const { body: { products } } = res
            expect(products).toBeSorted({ key: 'name', descending: true })
        })
    })

    describe('GET /api/products?sort=price', () => {

        it('returns 200 with products sorted by ascending price', async () => {

            const res = await request(app)
            .get('/api/products?sort=price')
            .expect(200)

            const { body: { products } } = res
            expect(products).toBeSorted({ key: 'price' })
        })
    })

    describe('GET /api/products?sort=price&order=desc', () => {

        it('returns 200 with products sorted by descending price', async () => {

            const res = await request(app)
            .get('/api/products?sort=price&order=desc')
            .expect(200)

            const { body: { products } } = res
            expect(products).toBeSorted({ key: 'price', descending: true })
        })
    })

    describe('GET /api/products?sort=created', () => {

        it('returns 200 with products sorted by ascending date', async () => {

            const res = await request(app)
            .get('/api/products?sort=created')
            .expect(200)

            const { body: { products } } = res
            expect(products).toBeSorted({ key: 'created' })
        })
    })

    describe('GET /api/products?sort=created&order=desc', () => {

        it('returns 200 with products sorted by descending date', async () => {

            const res = await request(app)
            .get('/api/products?sort=created&order=desc')
            .expect(200)

            const { body: { products } } = res
            expect(products).toBeSorted({ key: 'created', descending: true })
        })
    })

    describe('GET /api/products/:id', () => {

        it('returns 200 with requested product', async () => {

            const { id } = PRODUCT_DATA[0]
            const res = await request(app)
            .get(`/api/products/${id}`)
            .expect(200)

            const { body: { product } } = res
            expect(product).toBeInstanceOf(Object)
            expect(product).toEqual(PRODUCT_DATA[0])
        })

        it('returns 404 for non-existent product', async () => {

            const res = await request(app)
            .get(`/api/products/${MOCK_ID}`)
            .expect(404)

            const { body: { message } } = res
            expect(message).toBe('Product not found')
        })
    })

    describe('POST /api/products', () => {

        it('returns 201 with posted product', async () => {

            const res = await request(app)
            .post('/api/products')
            .send(MOCK_PRODUCT)
            .expect(201)

            const { body: { product } } = res
            expect(product).toBeInstanceOf(Object)
            expect(product).toMatchObject(MOCK_PRODUCT)
        })

        it('returns 400 for bad request', async () => {

            const res = await request(app)
            .post('/api/products')
            .send({ name: null })
            .expect(400)

            const { body: { message } } = res
            expect(message).toBe('Validation error')
        })

        it('returns 409 for duplicate product', async () => {

            const _id = PRODUCT_DATA[0].id
            const res = await request(app)
            .post('/api/products')
            .send({ _id, ...MOCK_PRODUCT })
            .expect(409)

            const { body: { message } } = res
            expect(message).toBe('Duplicate key')
        })
    })

    describe('PUT /api/products/:id', () => {

        it('returns 200 with updated product', async () => {

            const { id } = PRODUCT_DATA[0]
            const res = await request(app)
            .put(`/api/products/${id}`)
            .send(MOCK_PRODUCT)
            .expect(200)

            const { body: { product } } = res
            expect(product).toBeInstanceOf(Object)
            expect(product).toMatchObject(MOCK_PRODUCT)
        })

        it('returns 400 for bad request', async () => {

            const { id } = PRODUCT_DATA[0]
            const res = await request(app)
            .put(`/api/products/${id}`)
            .send({ name: null })
            .expect(400)

            const { body: { message } } = res
            expect(message).toBe('Validation error')
        })

        it('returns 404 for non-existent product', async () => {

            const res = await request(app)
            .put(`/api/products/${MOCK_ID}`)
            .send(MOCK_PRODUCT)
            .expect(404)

            const { body: { message } } = res
            expect(message).toBe('Product not found')
        })
    })

    describe('DELETE /api/products/:id', () => {

        it('returns 204 for deleted product', async () => {

            const { id } = PRODUCT_DATA[0]
            const res = await request(app)
            .delete(`/api/products/${id}`)
            .expect(204)
        })

        it('returns 404 for non-existent product', async () => {
            
            const res = await request(app)
            .delete(`/api/products/${MOCK_ID}`)
            .expect(404)

            const { body: { message } } = res
            expect(message).toBe('Product not found')
        })
    })
})