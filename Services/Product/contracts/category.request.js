export const createCategory = {
    type: 'object',
    properties: {
        name: { type: 'string' }
    },
    required: ['name']
}

export const updateCategory = {
    type: 'object',
    properties: {
        name: { type: 'string' }
    },
    required: ['name']
}