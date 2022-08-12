import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLogin = createAsyncThunk('auth/fetchUser', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data
})

export const fetchRegistration = createAsyncThunk('auth/fetchRegistration', async (params) => {
    const { data } = await axios.post('/auth/registration', params)
    return data
})

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async () => {
    const { data } = await axios.get('/auth/profile')
    return data
})


const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        //login
        [fetchLogin.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.status = action.payload
            state.data = 'loaded'
        },
        [fetchLogin.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },

        //check authorization
        [fetchProfile.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchProfile.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchProfile.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },

        //registration
        [fetchRegistration.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchRegistration.fulfilled]: (state, action) => {
            state.status = action.payload
            state.data = 'loaded'
        },
        [fetchRegistration.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        }
    },
})
export const selectIsAuth = (state) => Boolean(state.auth.data)
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;