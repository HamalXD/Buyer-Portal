import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  user: { name: string; email: string } | null;
};

const tokenJson = localStorage.getItem("token");
const userJson = localStorage.getItem("user");

const initialState: AuthState = {
  token: tokenJson ? tokenJson : null,
  user: userJson ? JSON.parse(userJson) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        user: { name: string; email: string };
      }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
