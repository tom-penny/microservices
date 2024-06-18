export const category = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' }
    },
    required: ['id', 'name']
}

export const categories = {
    type: 'object',
    properties: {
        categories: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' }
                },
                required: ['id', 'name']
            }
        }
    },
    required: ['categories']
}