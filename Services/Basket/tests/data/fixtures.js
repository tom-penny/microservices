import { BASKETS } from './testData.js'

export const MOCK_BASKET = {
    product5: { displayName: 'product5', displayImage: 'test.jpg', unitPrice: 1.50, quantity: 4 },
    product6: { displayName: 'product6', displayImage: 'test.jpg', unitPrice: 1.00, quantity: 8 }
}

export const MOCK_CHECKOUT = {
    basket: MOCK_BASKET,
    addressId: "address",
}

export const BASKET_DATA = BASKETS

export const MOCK_ID = 0