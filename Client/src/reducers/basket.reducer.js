import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/basket.api.js'

export const fetchBasket = createAsyncThunk(
    'basket/fetchBasket',
    async ({ userId }) => {
        const response = await api.getBasket(userId)
        return response.data
    }
)

export const updateBasket = createAsyncThunk(
    'basket/updateBasket',
    async ({ userId, basket }) => {
        const response = await api.updateBasket(userId, basket)
        return response.data
    }
)

export const checkoutBasket = createAsyncThunk(
    'basket/checkoutBasket',
    async ({ userId, addressId, basket }) => {
        const response = await api.checkoutBasket(userId, addressId, basket)
        return response.data
    }
)

const basketSlice = createSlice({
    name: 'basket',
    initialState: { basket: {}, checkoutId: null, checkoutTotal: 0, status: 'idle', error: null },
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        resetCheckout: (state) => {
            state.checkoutId = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBasket.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchBasket.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.basket = action.payload.basket
            })
            .addCase(fetchBasket.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(updateBasket.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateBasket.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.basket = action.payload.basket
            })
            .addCase(updateBasket.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(checkoutBasket.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(checkoutBasket.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.checkoutId = action.payload.checkoutId
                state.checkoutTotal = action.payload.basketValue
            })
            .addCase(checkoutBasket.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { setBasket, resetCheckout } = basketSlice.actions

export default basketSlice.reducer