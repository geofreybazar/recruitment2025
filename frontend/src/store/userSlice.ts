import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../utilities/types";

interface UserState {
  user: User | null;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  } as UserState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
