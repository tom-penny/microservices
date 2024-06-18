import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/order.api.js'

export const createReturn = createAsyncThunk(
    'returns/createReturn',
    async ({ customerId, orderItemId, quantity, reason }) => {
        const response = await api.createReturn(customerId, orderItemId, quantity, reason)
        return response.data
    }
)

const returnSlice = createSlice({
    name: 'returns',
    initialState: { status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReturn.fulfilled, (state) => {
                state.status = 'succeeded'
            })
    }
})

export default returnSlice.reducer