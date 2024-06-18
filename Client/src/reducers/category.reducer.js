import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/product.api.js'

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await api.getAllCategories()
        return response.data
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState: { categories: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.categories = action.payload.categories
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default categorySlice.reducer