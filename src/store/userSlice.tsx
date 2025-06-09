import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    tokenExpiry: localStorage.getItem("tokenExpiry") || null,
    tokenType: localStorage.getItem("tokenType") || null,
   
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
    setTokenExpiry: (state, action) => {
      state.tokenExpiry = action.payload;
      localStorage.setItem("tokenExpiry", action.payload);
    },
    setTokenType: (state, action) => {
      state.tokenType = action.payload;
      localStorage.setItem("tokenType", action.payload);
    },

    setAuthData: (state, action) => {
      const { access_token, refresh_token, token_type, expires_at } = action.payload;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.tokenType = token_type;
      state.tokenExpiry = expires_at;
      
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("tokenExpiry", expires_at);
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenExpiry = null;
      state.tokenType = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenType");
      localStorage.removeItem("tokenExpiry");
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  setTokenExpiry,
  setTokenType,
  setAuthData,
  logout
} = userSlice.actions;

export default userSlice.reducer;