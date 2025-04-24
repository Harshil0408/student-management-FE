import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../configs/Api";

export const loginUserThunk = createAsyncThunk(
    'auth/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance({
                method: 'POST',
                url: '/api/auth/login',
                data: data
            })
            return response
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const registerUserThunk = createAsyncThunk(
    'auth/registerUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance({
                method: 'POST',
                url: '/api/auth/register',
                data: data
            })
            return response
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
