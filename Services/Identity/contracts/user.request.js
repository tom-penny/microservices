export const updateProfile = {
    type: 'object',
    properties: {
        profile: {
            type: 'object'
        }
    },
    required: ['profile']
}

export const createAddress = {
    type: 'object',
    properties: {
        address: {
            type: 'object',
            properties: {
                street: { type: 'string' },
                city: { type: 'string' },
                region: { type: 'string' },
                country: { type: 'string' },
                zip: { type: 'string' }
            },
            required: ['street', 'city', 'region', 'country', 'zip']
        }
    },
    required: ['address']
}