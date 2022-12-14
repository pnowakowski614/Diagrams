import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../API/fetchMethods";

interface UsersSliceType {
    token: string | null;
    isUserLoggedIn: boolean;
    isBeingLoggedIn: boolean;
    isBeingSignedUp: boolean;
    gotLoggedOut: boolean;
    loginRejected: boolean;
}

const initialState = {
    token: localStorage.getItem("token") ?? null,
    isUserLoggedIn: !!localStorage.getItem("token"),
    isBeingLoggedIn: false,
    gotLoggedOut: false,
    isBeingSignedUp: false,
    loginRejected: false,
} as UsersSliceType;

export const loginUserThunk = createAsyncThunk(
    `users/loginUser`,
    async (loginData: { username: string; password: string }) => {
        const {username, password} = loginData;
        return loginUser(username, password);
    }
);

export const createUser = createAsyncThunk(
    `users/createUser`,
    async (signUpData: { username: string; password: string; email: string }) => {
        const {username, password, email} = signUpData;
        return registerUser(username, password, email);
    }
);

export const usersSlice = createSlice({
    name: "addUser",
    initialState,
    reducers: {
        clearUserInfo: (state) => {
            state.token = null;
            state.isUserLoggedIn = false;
            state.gotLoggedOut = true;
            localStorage.clear();
        },
        clearRejectedLogin: (state) => {
            state.loginRejected = false;
        },
        clearLoggedOut: (state) => {
            state.gotLoggedOut = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUserThunk.pending, (state) => {
            state.isBeingLoggedIn = true;
            state.loginRejected = false;
        });
        builder.addCase(loginUserThunk.rejected, (state) => {
            state.isBeingLoggedIn = false;
            state.loginRejected = true;
        });
        builder.addCase(loginUserThunk.fulfilled, (state, {payload}) => {
            state.isUserLoggedIn = true;
            state.token = payload.user;
            state.isBeingLoggedIn = false;
            state.gotLoggedOut = false;
        });
        builder.addCase(createUser.fulfilled, (state, {payload}) => {
            state.isUserLoggedIn = true;
            state.token = payload.user;
            state.isBeingSignedUp = false;
        });
        builder.addCase(createUser.pending, (state, {payload}) => {
            state.isBeingSignedUp = true;
        });
        builder.addCase(createUser.rejected, (state, {payload}) => {
            state.isBeingSignedUp = false;
        });
    },
});

export const {clearRejectedLogin, clearUserInfo, clearLoggedOut} =
    usersSlice.actions;
export const usersReducer = usersSlice.reducer;
