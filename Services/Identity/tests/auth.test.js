import app from '../src/app.js'
import request from 'supertest'
import { MOCK_USER, USER_DATA } from './data/fixtures.js'

describe('<<<<< AUTH >>>>>', () => {

    describe('POST /api/auth/register', () => {

        it('returns 201 with user ID', async () => {

            const res = await request(app)
            .post('/api/auth/register')
            .send(MOCK_USER)
            .expect(201)            
        })

        it('returns 400 for invalid email', async () => {

            const { password } = MOCK_USER
            const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'test.com', password })
            .expect(400)

            const { body: { message } } = res
            expect(message).toBe('Invalid email')
        })

        it('returns 400 for bad request', async () => {

            const { password } = MOCK_USER
            const res = await request(app)
            .post('/api/auth/register')
            .send({ email: null, password })
            .expect(400)

            const { body: { message } } = res
            expect(message).toBe('Invalid request body')
        })

        it('returns 409 for duplicate email', async () => {

            const { email, password } = USER_DATA[0]
            const res = await request(app)
            .post('/api/auth/register')
            .send({ email, password })
            .expect(409)

            const { body: { message } } = res
            expect(message).toBe('Email already in use')
        })
    })

    describe('POST /api/auth/login', () => {

        it('returns 200 with user ID', async () => {
            
            const { id, email, password } = USER_DATA[0]
            const res = await request(app)
            .post('/api/auth/login')
            .send({ email, password })
            .expect(200)

            const { body: { userId } } = res
            expect(userId).toBe(id)
        })
        
        it('returns 400 for bad request', async () => {
            
            const { password } = USER_DATA[0]
            const res = await request(app)
            .post('/api/auth/login')
            .send({ email: null, password })
            .expect(400)
            
            const { body: { message } } = res
            expect(message).toBe('Invalid request body')
        })
        
        it('returns 401 for wrong password', async () => {
            
            const { email } = USER_DATA[0]
            const res = await request(app)
            .post('/api/auth/login')
            .send({ email, password: 'password' })
            .expect(401)
            
            const { body: { message } } = res
            expect(message).toBe('Wrong password')
        })

        it('returns 404 for non-existent user', async () => {

            const { password } = MOCK_USER
            const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'user4@test.com', password })
            .expect(404)

            const { body: { message } } = res
            expect(message).toBe('User not found')
        })
    })
})