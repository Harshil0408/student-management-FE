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

export const addStudentDemographicsThunk = createAsyncThunk(
    'student/addStudentDemographics',
    async ({ studentId, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/api/students/${studentId}/demographics`, data);
            return response.data.demographicsDetails;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateStudentDemographicsThunk = createAsyncThunk(
    'student/updateStudentDemographics',
    async ({ studentId, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/api/students/${studentId}/demographics`, data);
            return response.data.demographicsDetails;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteSingleGuardianThunk = createAsyncThunk(
    'student/deleteSingleGuardian',
    async ({ studentId, guardianId }, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/api/students/${studentId}/guardians/${guardianId}`)
            return { guardianId };
        } catch (error) {
            return rejectWithValue(error?.response?.data || error.message)
        }
    }
)

export const deleteMentorThunk = createAsyncThunk(
    'student/deleteSingleMentor',
    async ({ studentId, mentorId }, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/api/students/${studentId}/mentors/${mentorId}`)
            return { mentorId };
        } catch (error) {
            return rejectWithValue(error?.response?.data || error.message)
        }
    }
)

export const getApplicationStatusThunk = createAsyncThunk(
    'student/getApplicationStatus',
    async ({ studentId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/students/${studentId}/application-status`)
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || error?.message)
        }
    }
)

export const addApplicationStatusThunk = createAsyncThunk(
    'student/addApplicationStatus',
    async ({ studentId, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/api/students/${studentId}/application-status`, data)
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || error?.message)
        }
    }
)

export const updateApplicationStatus = createAsyncThunk(
    'student/updateApplicationStatus',
    async ({ studentId, applicationStatusId, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/api/student/${studentId}/application-status/${applicationStatusId}`, data)
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || error?.message)
        }
    }
)

export const deleteApplicationStatus = createAsyncThunk(
    'student/deleteApplicationStatus',
    async ({ applicationStatusId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/api/student/${applicationStatusId}/application-status`)
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || error?.message)
        }
    }
)