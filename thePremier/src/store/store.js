import { configureStore } from "@reduxjs/toolkit";
import { teamApi } from "../TeamApi";
import premierReducer from "./premierSlice";

export const store = configureStore({
  reducer: {
    [teamApi.reducerPath]: teamApi.reducer,
    auth: premierReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(teamApi.middleware),
});
