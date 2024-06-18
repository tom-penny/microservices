export const updateBasket = {
    type: 'object',
    properties: {
        basket: {
            type: 'object',
            additionalProperties: {
                type: 'object',
                properties: {
                    displayName: { type: 'string'},
                    displayImage: { type: 'string' },
                    unitPrice: { type: 'number' },
                    quantity: { type: 'integer' }
                },
                required: ['displayName', 'displayImage', 'unitPrice', 'quantity']
            }
        }
    },
    required: ['basket']
}

export const checkoutBasket = {
    type: 'object',
    properties: {
        basket: {
            type: 'object',
            additionalProperties: {
                type: 'object',
                properties: {
                    displayName: { type: 'string'},
                    displayImage: { type: 'string' },
                    unitPrice: { type: 'number' },
                    quantity: { type: 'integer' }
                },
                required: ['displayName', 'displayImage', 'unitPrice', 'quantity']
            }
        },
        addressId: { type: 'string' }
    },
    required: ['basket', 'addressId']
}