export const product = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        price: { type: 'number' },
        stock: { type: 'number' },
        categories: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' }
                }
            }
        },
        images: {
            type: 'array',
            items: { type: 'string' }
        },
        created: { type: 'string' }
    },
    required: ['id', 'name', 'price', 'stock', 'categories', 'images', 'created']
}

export const products = {
    type: 'object',
    properties: {
        products: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    stock: { type: 'number' },
                    categories: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                name: { type: 'string' }
                            }
                        }
                    },
                    images: {
                        type: 'array',
                        items: { type: 'string' }
                    },
                    created: { type: 'string' }
                },
                required: ['_id', 'name', 'price', 'stock', 'categories', 'images', 'created']
            }
        }
    },
    required: ['products']
}