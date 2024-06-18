import { registerUser, loginUser, logoutUser, getCurrentUserId } from '../services/auth.service.js'

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const token = await registerUser(email, password)
        const userId = await getCurrentUserId()
        res.cookie('token', token, { httpOnly: true })
        res.status(201).send({ userId })
    }
    catch (err) { next(err) }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const token = await loginUser(email, password)
        const userId = await getCurrentUserId()
        res.cookie('token', token, { httpOnly: true })
        res.status(200).send({ userId })
    }
    catch (err) { next(err) }
}

export const logout = async (req, res, next) => {
    try {
        await logoutUser()
        res.clearCookie('token')
        res.status(200).send()
    }
    catch (err) { next(err) }
}