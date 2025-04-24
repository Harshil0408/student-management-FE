import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../configs/Api";

export const getStudentListThunk = createAsyncThunk(
    'student/getStudentList',
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/api/students', {
                params: { page, limit }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch students');
        }
    }
);


export const addStudentThunk = createAsyncThunk(
    'student/addStudent',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance({
                method: "POST",
                url: '/api/students',
                data: data
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }
)

export const getStudentDetailThunk = createAsyncThunk(
    'student/getStudentDetail',
    async (studentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance({
                method: 'GET',
                url: `/api/students/${studentId}`
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateUserProfileTab = createAsyncThunk(
    'student/updateUserProfileTab',
    async ({ data, studentId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/api/students/${studentId}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addGuardianThunk = createAsyncThunk(
    'student/addGuardian',
    async ({ data, studentId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/api/students/${studentId}/guardians`, data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const addMentorsThunk = createAsyncThunk(
    'student/addMentors',
    async ({ data, studentId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/api/students/${studentId}/mentors`, data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)