import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  email: null,
  username: null,
  isSelected: null,
};

const premierSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      return {
        ...state,
        isLoggedin: true,
        email: action.payload,
      };
    },
    logoutUser(state) {
      state.isLoggedin = false;
      state.email = null;
      state.username = null;
    },
    editUsernameDetails(state, action) {
      state.username = action.payload.username;
    },
    editEmailDetails(state, action) {
      state.email = action.payload.email;
    },
    selectMessage(state) {
      state.isSelected = true;
    },
  },
});

export const { loginUser, logoutUser, editUsernameDetails, editEmailDetails } =
  premierSlice.actions;

export default premierSlice.reducer;
