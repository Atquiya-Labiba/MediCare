import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem('user')
   ? JSON.parse(localStorage.getItem('user'))
   : null

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: userInfoFromStorage
  },
  reducers: {
    setUser: (state , action) => {
      state.user = action.payload;
    }
  },
});

export const { setUser , reloadUserData } = userSlice.actions;