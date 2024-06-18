export const getBatchProducts = {
    type: 'object',
    properties: {
        ids: {
            type: 'array',
            items: { type: 'string' }
        }
    },
    required: ['ids']
}

export const createProduct = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        stock: { type: 'number' },
        categories: {
            type: 'array',
            items: { type: 'string' }
        },
        images: {
            type: 'array',
            items: { type: 'string' }
        }
    },
    required: ['name', 'price', 'stock', 'categories', 'images']
}

export const updateProduct = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        stock: { type: 'number' },
        categories: {
            type: 'array',
            items: { type: 'string' }
        },
        images: {
            type: 'array',
            items: { type: 'string' }
        }
    },
    required: ['name', 'price', 'stock', 'categories', 'images']
}