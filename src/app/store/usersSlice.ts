import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../API/fetchMethods";

interface UsersSliceType {
  token: string | null;
  isUserLoggedIn: boolean;
  isBeingLoggedIn: boolean;
  gotLoggedOut: boolean;
  loginRejected: boolean;
}

const initialState = {
  token: localStorage.getItem("token") ?? null,
  isUserLoggedIn: !!localStorage.getItem("token"),
  isBeingLoggedIn: false,
  gotLoggedOut: false,
  loginRejected: false,
} as UsersSliceType;

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
    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      state.isUserLoggedIn = true;
      state.token = payload.user;
      state.isBeingLoggedIn = false;
      state.gotLoggedOut = false;
    });
  },
});

export const { clearRejectedLogin, clearUserInfo, clearLoggedOut } =
  usersSlice.actions;
export const usersReducer = usersSlice.reducer;
