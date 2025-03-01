import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import * as API from '../../api/apiHandler';
import * as Common from '../../common/common';

export const registrationUser = createAsyncThunk(
    "registrationUser",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));
            const response = await API.userSignUp({ ...data });
            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Common.ErrorAlert(error);
            console.error(error, "error");
            throw error; // Explicitly reject the promise
        }
    }
);

export const userLogin = createAsyncThunk(
    "userLogin",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));

            const response = await API.userLogin({ ...data });

            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Common.ErrorAlert(error);
            console.error(error, "error");
            throw error; // Explicitly reject the promise
        }
    }
);

export const userEmailVerify = createAsyncThunk(
    "userEmailVerify",
    async (data, { dispatch }) => {
        try {
            dispatch(setLoader(true));

            const response = await API.userEmailVerify({ ...data });

            dispatch(setLoader(false));

            return response;
        } catch (error) {
            dispatch(setLoader(false));
            Common.ErrorAlert(error);
            console.error(error, "error");
            throw error; // Explicitly reject the promise
        }
    }
);


const initialState = {
    registrationUser: {
        data: null,
        error: null
    },

    userLogin: {
        data: null,
        error: null
    },

    userEmailVerify: {
        data: null,
        error: null
    },

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationUser.fulfilled, (state, action) => {
                state.registrationUser.data = action.payload;
                state.registrationUser.error = null;
            })
            .addCase(registrationUser.rejected, (state, action) => {
                state.registrationUser.data = null;
                state.registrationUser.error = action.error.message;
            })

            .addCase(userLogin.fulfilled, (state, action) => {
                state.userLogin.data = action.payload;
                state.userLogin.error = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.userLogin.data = null;
                state.userLogin.error = action.error.message;
            })

            .addCase(userEmailVerify.fulfilled, (state, action) => {
                state.userEmailVerify.data = action.payload;
                state.userEmailVerify.error = null;
            })
            .addCase(userEmailVerify.rejected, (state, action) => {
                state.userEmailVerify.data = null;
                state.userEmailVerify.error = action.error.message;
            })

    }
});

export const { setLoader } = authSlice.actions;
export default authSlice.reducer;