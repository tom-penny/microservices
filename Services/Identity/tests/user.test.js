import app from '../src/app.js'
import request from 'supertest'
import { MOCK_ID, MOCK_PROFILE, MOCK_ADDRESS, USER_DATA } from './data/fixtures.js'

describe('<<<<< USER >>>>>', () => {

    describe('GET /api/users/:id', () => {

        it('returns 200 with requested profile', async () => {

            const { id } = USER_DATA[0]
            const res = await request(app)
            .get(`/api/users/${id}`)
            .expect(200)

            const { body: { profile } } = res
            expect(profile).toBeInstanceOf(Object)
            expect(profile).toEqual(USER_DATA[0].profile)
        })

        it('returns 404 for non-existent profile', async () => {

            const res = await request(app)
            .get(`/api/users/${MOCK_ID}`)
            .expect(404)

            const { body: { message } } = res
            expect(message).toBe('Profile not found')
        })
    })

    describe('PUT /api/users/:id', () => {

        it('returns 200 for updated profile', async () => {

            const { id } = USER_DATA[0]
            const res = await request(app)
            .put(`/api/users/${id}`)
            .send({ profile: MOCK_PROFILE })
            .expect(200)
        })

        it('returns 400 for bad request', async () => {

            const { id } = USER_DATA[0]
            const res = await request(app)
            .put(`/api/users/${id}`)
            .send({ profile: null })
            .expect(400)

            const { body: { message } } = res
            expect(message).toBe('Invalid request body')
        })
    })

    describe('GET /api/users/:id/addresses', () => {

        it('returns 200 with array of addresses', async () => {

            const { id } = USER_DATA[0]
            const res = await request(app)
            .get(`/api/users/${id}/addresses`)
            .expect(200)

            const { body: { addresses } } = res
            expect(addresses).toBeArrayOfSize(USER_DATA[0].addresses.length)
            expect(addresses).toIncludeSameMembers(USER_DATA[0].addresses)
        })

        it('returns 404 for non-existent user', async () => {
            
            const res = await request(app)
            .get(`/api/users/${MOCK_ID}/addresses`)
            .expect(404)

            const { body: { message } } = res
            expect(message).toBe('User not found')
        })
    })

    describe('POST /api/users/:id/addresses', () => {

        it('returns 201 with posted address', async () => {

            const { id } = USER_DATA[0]
            const res = await request(app)
            .post(`/api/users/${id}/addresses`)
            .send({ address: MOCK_ADDRESS })
            .expect(201)

            const { body: { address } } = res
            MOCK_ADDRESS.id = address.id
            expect(address).toBeInstanceOf(Object)
            expect(address).toEqual(MOCK_ADDRESS)
        })

        it('returns 404 for non-existent user', async () => {
            
            const res = await request(app)
            .post(`/api/users/${MOCK_ID}/addresses`)
            .send({ address: MOCK_ADDRESS })
            .expect(404)

            const { body: { message } } = res
            expect(message).toBe('Not found')
        })
    })

    describe('DELETE /api/users/:id/addresses', () => {

        it('returns 204 for deleted address', async () => {

            const { id, addresses } = USER_DATA[0]
            const addressId = addresses[0].id
            const res = await request(app)
            .delete(`/api/users/${id}/addresses/${addressId}`)
            .expect(204)
        })

        it('returns 404 for non-existent user', async () => {
            
            const { addresses } = USER_DATA[0]
            const addressId = addresses[0].id
            const res = await request(app)
            .delete(`/api/users/${MOCK_ID}/addresses/${addressId}`)
            .expect(404)

            const { body: { message } } = res
            expect(message).toBe('Not found')
        })
    })
})