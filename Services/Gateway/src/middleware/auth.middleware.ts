import { Request, Response, NextFunction } from 'express'
import admin from '../config/firebase'

// Authenticate and parse JWT from Firebase.

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies['token']

    if (!token) return res.status(401).send({ message: 'Unauthorized' })
    
    try {
        const userToken = await admin.auth().verifyIdToken(token)
        
        req.headers['x-user-roles'] = userToken.roles || ['customer']
        req.user = userToken.uid

        next()
    }
    catch (err) { return res.status(401).send({ message: 'Invalid token' }) }
}

// Compare user ID from JWT with user ID from route params.

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    
    const { id } = req.params

    if (!req.user || req.user !== id) {
        return res.status(403).send({ message: 'Forbidden' })
    }

    next()
}