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

export const getSingleGuardiansThunk = createAsyncThunk(
    'student/getSingleGuardian',
    async ({ studentId, guardianId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/students/${studentId}/guardians/${guardianId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateGuardianThunk = createAsyncThunk(
    'student/updateGuardian',
    async ({ data, studentId, guardianId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/api/students/${studentId}/guardians/${guardianId}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getSingleMentorsThunk = createAsyncThunk(
    'student/getSingleMentor',
    async ({ studentId, mentorId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/students/${studentId}/mentors/${mentorId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateMentorThunk = createAsyncThunk(
    'student/updateMentor',
    async ({ data, studentId, mentorId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/api/students/${studentId}/mentors/${mentorId}`, data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const upsertStudentDemographicsThunk = createAsyncThunk(
    'student/upsertStudentDemographics',
    async ({ studentId, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/api/students/${studentId}/demographics`, data);
            return response.data.demographicsDetails;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);