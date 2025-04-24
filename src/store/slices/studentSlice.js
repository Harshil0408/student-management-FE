import { createSlice } from "@reduxjs/toolkit";
import {
    addGuardianThunk,
    addStudentThunk,
    getStudentDetailThunk,
    getStudentListThunk,
    updateUserProfileTab,
} from "../thunks/studentThunk";

const initialState = {
    isLoading: false,
    errors: null,
    currentPage: 1,
    totalPages: 0,
    studentList: null,
    changes: 0,
    studentInfo: {
        changes: 0,
        isStudentInfoLoading: false,
        demographicsTab: {
            userInformation: null,
            userMentors: [],
            userGuardian: [],
            selectedMentor: null,
            selectedGuardian: null,
            userProfileData: null,
            demographicsData: null,
        },
        enrollmentTab: null,
        residentialTab: null,
        counselingTab: null,
        incidentsTab: null,
        medicalTab: null,
        postResidentialTab: null,
    },
};

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setChanges: (state, action) => {
            state.changes = action.payload;
        },
        updateDemographicsTab: (state, action) => {
            state.studentInfo.demographicsTab = {
                ...state.studentInfo.demographicsTab,
                ...action.payload,
            };
            state.studentInfo.changes += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudentListThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStudentListThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errors = null;
                state.studentList = action.payload.results;
                state.currentPage = action.payload.current_page;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(getStudentListThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })

            .addCase(addStudentThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addStudentThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.errors = null;
            })
            .addCase(addStudentThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })

            .addCase(getStudentDetailThunk.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(getStudentDetailThunk.fulfilled, (state, action) => {
                state.isLoading = false;

                const data = action.payload;

                state.studentInfo.demographicsTab.userProfileData = data;

                state.studentInfo.demographicsTab.userMentors = data.mentors || [];
                state.studentInfo.demographicsTab.userGuardian = data.guardians || [];
            })
            .addCase(getStudentDetailThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })

            .addCase(updateUserProfileTab.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(updateUserProfileTab.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateUserProfileTab.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })
            .addCase(addGuardianThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addGuardianThunk.fulfilled, (state) => {
                state.isLoading = false,
                    state.errors = null
            })
            .addCase(addGuardianThunk.rejected, (state, action) => {
                state.isLoading = false,
                    state.errors = action.payload
            })
    },
});

export const { setChanges, updateDemographicsTab } = studentSlice.actions;
export default studentSlice.reducer;
