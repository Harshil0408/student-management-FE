import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, registerUserThunk } from "../thunks/authThunk";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    loggedinUser: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (state, action) => {
            const tokens = {
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            };
            localStorage.setItem('token', JSON.stringify(tokens));
            state.token = tokens;
        },
        clearTokens: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.loggedinUser = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUserThunk.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        })
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                loggedinUser: action.payload.data.user,
            }
        })
        builder.addCase(loginUserThunk.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        })
        builder.addCase(registerUserThunk.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        })
        builder.addCase(registerUserThunk.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                user: action.payload.data.user,
            }
        })
        builder.addCase(registerUserThunk.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        })
    }
})

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;