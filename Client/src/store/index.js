import { configureStore } from '@reduxjs/toolkit'
import basketReducer from '../reducers/basket.reducer.js'
import productReducer from '../reducers/product.reducer.js'
import categoryReducer from '../reducers/category.reducer.js'
import userReducer from '../reducers/user.reducer.js'
import orderReducer from '../reducers/order.reducer.js'
import addressReducer from '../reducers/address.reducer.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        category: categoryReducer,
        basket: basketReducer,
        order: orderReducer,
        address: addressReducer
    }
})

export default store