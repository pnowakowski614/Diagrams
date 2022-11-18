import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../API/fetchMethods";

const initialState = {
    username: "",
    email: "",
    password: "",
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
        builder.addCase(addUser.fulfilled, (state, {payload}) => {
            state.username = payload.username
            state.password = payload.password
            state.email = payload.email
        })
        builder.addCase(loginUserThunk.fulfilled, (state, {payload}) => {
            state.username = payload.username
            state.password = payload.password
        })
    }
})

export const usersReducer = usersSlice.reducer