import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/identity.api.js'

export const fetchUser = createAsyncThunk(
    'users/fetch',
    async () => {
        const response = await api.getUser()
        return response.data
    }
)

export const registerUser = createAsyncThunk(
    'users/register',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await api.registerUser(email, password)
            return response.data
        }
        catch (err) { return rejectWithValue(err.response.data)}
    }
)

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await api.loginUser(email, password)
            return response.data
        }
        catch (err) { return rejectWithValue(err.response.data)}
    }
)

export const logoutUser = createAsyncThunk(
    'users/logout',
    async () => {
        await api.logoutUser()
        document.cookie = 'token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState: { userId: null, profile: null, status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.userId = action.payload.userId
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.userId = action.payload.userId
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.message
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.userId = action.payload.userId
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.message
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'succeeded'
                state.userId = null
            })
    }
})

export default userSlice.reducer