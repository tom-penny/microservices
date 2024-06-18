// Authenticate API key from request header.

export const authenticateKey = (req, res, next) => {

    const apiKey = req.get('x-api-key')

    const secretKey = process.env.API_KEY || 'key'
    
    if (!apiKey || apiKey != secretKey) {
        return res.status(401).send({ message: 'Unauthorized' })
    }

    next()
}

// Verify role claims match endpoint permissions.

export const authorizeRoles = (...roles) => {
    
    return (req, res, next) => {
        
        const rolesHeader = req.get('x-user-roles')

        if (!rolesHeader || !roles.some(role => rolesHeader.split(',').includes(role))) {
            return res.status(403).send({ message: 'Forbidden' })
        }

        next()
    }
}