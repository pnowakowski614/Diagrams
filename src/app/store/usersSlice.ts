import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../API/fetchMethods";

const initialState = {
    username: "",
    token: "",
    isUserLoggedIn: false,
}

export const addUser = createAsyncThunk(
    `users/addUser`,
    async (userData: { username: string, password: string, email: string }) => {
        const {username, password, email} = userData;
        return await registerUser(username, password, email);
    })

export const loginUserThunk = createAsyncThunk(
    `users/loginUser`,
    async (loginData: { username: string, password: string }) => {
        const {username, password} = loginData;
        return await loginUser(username, password);
    })

export const usersSlice = createSlice({
    name: 'addDiagram',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loginUserThunk.fulfilled, (state, {payload}) => {
            state.username = payload.username
            state.isUserLoggedIn = true
            state.token = payload.user
        })
    }
})

export const usersReducer = usersSlice.reducer
