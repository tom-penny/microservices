export const register = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
        },
        password: {
            type: 'string',
            pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$'
        }
    },
    required: ['email', 'password']
}

export const login = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' }
    },
    required: ['email', 'password']
}