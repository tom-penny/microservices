import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/order.api.js'

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async ({ userId }) => {
        const response = await api.getAllOrders(userId)
        return response.data
    }
)

const orderSlice = createSlice({
    name: 'orders',
    initialState: { orders: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.orders = action.payload.orders
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default orderSlice.reducer