import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../API/fetchMethods";

const initialState = {
  token: localStorage.getItem("token") ?? null,
  isUserLoggedIn: !!localStorage.getItem("token"),
  isBeingLoggedIn: false,
};

export const addUser = createAsyncThunk(
  `users/addUser`,
  async (userData: { username: string; password: string; email: string }) => {
    const { username, password, email } = userData;
    return await registerUser(username, password, email);
  }
);

export const loginUserThunk = createAsyncThunk(
  `users/loginUser`,
  async (loginData: { username: string; password: string }) => {
    const { username, password } = loginData;
    return await loginUser(username, password);
  }
);

export const usersSlice = createSlice({
  name: "addDiagram",
  initialState,
  reducers: {
    clearUserInfo: (state) => {
      state.token = null;
      state.isUserLoggedIn = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isBeingLoggedIn = true;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.isBeingLoggedIn = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      state.isUserLoggedIn = true;
      state.token = payload.user;
      state.isBeingLoggedIn = false;
    });
  },
});

export const { clearUserInfo } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
